import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";
const source = await readFile(
  new URL("../src/lib/failureLab.ts", import.meta.url),
  "utf8",
);
const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2020,
  },
});
const { initialLab, labReducer } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
);

test("all eight connectivity combinations enforce a fixed two-of-three quorum", () => {
  for (let mask = 0; mask < 8; mask++) {
    let state = initialLab();
    for (let i = 0; i < 3; i++)
      if (!(mask & (1 << i)))
        state = labReducer(state, { type: "toggle", id: ["A", "B", "C"][i] });
    const online = state.replicas.filter((r) => r.online).length;
    const next = labReducer(state, { type: "write" });
    assert.equal(next.history[0].accepted, online >= 2);
    assert.equal(next.version, online >= 2 ? 1 : 0);
    assert.ok(
      next.replicas.every(
        (r) => r.version === (r.online && online >= 2 ? 1 : 0),
      ),
    );
    assert.equal(
      state.version,
      0,
      "the reducer must not mutate the prior state",
    );
  }
});

test("guided sequence degrades, rejects without changing committed state, and recovers", () => {
  let state = labReducer(initialLab(), { type: "scenario" });
  assert.deepEqual(
    state.replicas.map((r) => [r.online, r.version]),
    [
      [true, 1],
      [true, 1],
      [false, 0],
    ],
  );
  state = labReducer(state, { type: "scenario" });
  assert.equal(state.version, 1);
  assert.equal(state.history[0].accepted, false);
  state = labReducer(state, { type: "scenario" });
  assert.equal(state.version, 2);
  assert.ok(state.replicas.every((r) => r.online && r.version === 2));
  assert.deepEqual(
    state.history.map((e) => e.accepted),
    [true, false, true],
  );
});

test("offline replicas stay stale until explicit reconnection", () => {
  let state = labReducer(initialLab(), { type: "toggle", id: "B" });
  state = labReducer(state, { type: "write" });
  state = labReducer(state, { type: "write" });
  assert.equal(state.replicas[1].version, 0);
  state = labReducer(state, { type: "toggle", id: "B" });
  assert.equal(state.replicas[1].version, 2);
  assert.equal(state.attempts, 2, "reconnection does not imply another write");
});

test("repeated rejected writes preserve every replica version and committed history", () => {
  let state = labReducer(initialLab(), { type: "write" });
  for (const id of ["A", "B", "C"])
    state = labReducer(state, { type: "toggle", id });
  const before = state.replicas;
  for (let i = 0; i < 5; i++) state = labReducer(state, { type: "write" });
  assert.deepEqual(state.replicas, before);
  assert.equal(state.version, 1);
  assert.equal(state.attempts, 6);
  assert.equal(state.history.length, 3);
  assert.ok(state.history.every((event) => !event.accepted));
});

test("reset returns the entire experiment to its initial state", () => {
  const state = labReducer(labReducer(initialLab(), { type: "scenario" }), {
    type: "reset",
  });
  assert.deepEqual(state, initialLab());
});
