import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const source = await readFile(new URL("../src/lib/opening.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
});
const { shouldShowOpening, rememberOpening, startOpening, ASSEMBLY_MS, MAX_PREPARE_MS, REVEAL_MS } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
);

function clock() {
  let now = 0, id = 0;
  const timers = new Map();
  return {
    schedule(callback, delay) { timers.set(++id, { callback, at: now + delay }); return id; },
    cancel(timer) { timers.delete(timer); },
    advance(ms) {
      const end = now + ms;
      while (true) {
        const next = [...timers].filter(([, timer]) => timer.at <= end).sort((a, b) => a[1].at - b[1].at)[0];
        if (!next) break;
        timers.delete(next[0]); now = next[1].at; next[1].callback();
      }
      now = end;
    },
    get pending() { return timers.size; },
  };
}
const flush = () => Promise.resolve();

test("opens once per session, and skips reduced motion and history restoration", () => {
  const data = new Map();
  const storage = { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) };
  assert.equal(shouldShowOpening(false, "navigate", storage), true);
  assert.equal(shouldShowOpening(true, "navigate", storage), false);
  assert.equal(shouldShowOpening(false, "back_forward", storage), false);
  rememberOpening(storage);
  assert.equal(shouldShowOpening(false, "navigate", storage), false);
  assert.equal(shouldShowOpening(false, "reload", storage), false);
});

test("restricted storage never blocks entry or throws", () => {
  const storage = { getItem() { throw Error("denied"); }, setItem() { throw Error("denied"); } };
  assert.equal(shouldShowOpening(false, "navigate", storage), false);
  assert.doesNotThrow(() => rememberOpening(storage));
});

test("ready content stays for the requested 2.34 seconds and completes exactly once", async () => {
  const time = clock(), phases = [];
  const opening = startOpening({ ready: Promise.resolve(), onPhase: p => phases.push(p), ...time });
  await flush();
  time.advance(1799);
  assert.deepEqual(phases, []);
  time.advance(1);
  assert.deepEqual(phases, ["revealing"]);
  time.advance(539);
  assert.deepEqual(phases, ["revealing"]);
  time.advance(1);
  assert.deepEqual(phases, ["revealing", "complete"]);
  opening.skip();
  time.advance(10000);
  assert.deepEqual(phases, ["revealing", "complete"]);
  assert.equal(time.pending, 0);
});

test("a stalled asset cannot trap the visitor behind the opening", () => {
  const time = clock(), phases = [];
  startOpening({ ready: new Promise(() => {}), onPhase: p => phases.push(p), ...time });
  time.advance(MAX_PREPARE_MS + REVEAL_MS);
  assert.deepEqual(phases, ["revealing", "complete"]);
  assert.equal(time.pending, 0);
});

test("asset rejection still reveals the portfolio", async () => {
  const time = clock(), phases = [];
  startOpening({ ready: Promise.reject(Error("offline")), onPhase: p => phases.push(p), ...time });
  await flush();
  time.advance(ASSEMBLY_MS + REVEAL_MS);
  assert.deepEqual(phases, ["revealing", "complete"]);
});

test("late artwork keeps the same 2.34-second overall duration", async () => {
  const time = clock(), phases = [];
  let finishArt;
  const art = new Promise(resolve => { finishArt = resolve; });
  startOpening({ ready: art, assemblyReady: art, onPhase: p => phases.push(p), ...time });
  time.advance(300);
  finishArt(); await flush();
  time.advance(1499);
  assert.deepEqual(phases, []);
  time.advance(1);
  assert.deepEqual(phases, ["revealing"]);
  time.advance(540);
  assert.deepEqual(phases, ["revealing", "complete"]);
});

test("even an artwork that never arrives cannot defer the hard deadline", () => {
  const time = clock(), phases = [];
  const blocked = new Promise(() => {});
  startOpening({ ready: blocked, assemblyReady: blocked, onPhase: p => phases.push(p), ...time });
  time.advance(MAX_PREPARE_MS + REVEAL_MS);
  assert.deepEqual(phases, ["revealing", "complete"]);
});

test("Enter, Escape, reduced motion, or a hidden tab can dismiss immediately", async () => {
  const time = clock(), phases = [];
  let ready;
  const opening = startOpening({ ready: new Promise(resolve => { ready = resolve; }), onPhase: p => phases.push(p), ...time });
  opening.skip(); opening.skip();
  ready(); await flush(); time.advance(10000);
  assert.deepEqual(phases, ["complete"]);
  assert.equal(time.pending, 0);
});

test("unmount cancels work; a late asset cannot resurrect the overlay", async () => {
  const time = clock(), phases = [];
  let ready;
  const opening = startOpening({ ready: new Promise(resolve => { ready = resolve; }), onPhase: p => phases.push(p), ...time });
  opening.dispose(); ready(); await flush(); time.advance(10000);
  assert.deepEqual(phases, []);
  assert.equal(time.pending, 0);
});

test("a second mount after Strict Mode cleanup has its own working timeline", async () => {
  const time = clock(), phases = [];
  const first = startOpening({ ready: Promise.resolve(), onPhase: p => phases.push(`old:${p}`), ...time });
  first.dispose();
  startOpening({ ready: Promise.resolve(), onPhase: p => phases.push(p), ...time });
  await flush(); time.advance(ASSEMBLY_MS + REVEAL_MS);
  assert.deepEqual(phases, ["revealing", "complete"]);
});
