export const OPENING_SESSION_KEY = "portfolio-opening-v1";
export const OPENING_REPLAY_EVENT = "portfolio:replay-opening";
// A deliberate 1.8-second presentation followed by the 540 ms reveal.
// Keep the deadline equal to the presentation so loading cannot extend it.
export const ASSEMBLY_MS = 1800;
export const MAX_PREPARE_MS = ASSEMBLY_MS;
export const REVEAL_MS = 540;

export type OpeningPhase = "assembling" | "revealing" | "complete";
type SessionStore = Pick<Storage, "getItem" | "setItem">;

export function shouldShowOpening(
  reducedMotion: boolean,
  navigationType?: string,
  storage?: SessionStore,
) {
  if (reducedMotion || navigationType === "back_forward" || !storage) return false;
  try {
    return storage?.getItem(OPENING_SESSION_KEY) !== "seen";
  } catch {
    // A storage restriction must never prevent entering the portfolio.
    return false;
  }
}

export function rememberOpening(storage?: SessionStore) {
  try {
    storage?.setItem(OPENING_SESSION_KEY, "seen");
  } catch {
    // Storage is optional; the opening remains dismissible.
  }
}

/** A bounded, cancellable entrance. Asset failures count as settled, not blocked. */
export function startOpening({
  ready,
  assemblyReady = Promise.resolve(),
  onPhase,
  schedule = (callback, delay) => window.setTimeout(callback, delay),
  cancel = (timer) => window.clearTimeout(timer),
}: {
  ready: Promise<unknown>;
  assemblyReady?: Promise<unknown>;
  onPhase: (phase: OpeningPhase) => void;
  schedule?: (callback: () => void, delay: number) => number;
  cancel?: (timer: number) => void;
}) {
  let active = true;
  let assembled = false;
  let assetsSettled = false;
  let revealing = false;
  const timers = new Set<number>();
  const later = (callback: () => void, delay: number) => {
    const timer = schedule(() => {
      timers.delete(timer);
      if (active) callback();
    }, delay);
    timers.add(timer);
  };
  const clear = () => {
    timers.forEach(cancel);
    timers.clear();
  };
  const finish = () => {
    if (!active) return;
    active = false;
    clear();
    onPhase("complete");
  };
  const reveal = () => {
    if (!active || revealing) return;
    revealing = true;
    clear();
    onPhase("revealing");
    later(finish, REVEAL_MS);
  };
  const startAssembly = () => {
    if (!active || revealing) return;
    later(() => {
      assembled = true;
      if (assetsSettled) reveal();
    }, ASSEMBLY_MS);
  };
  void assemblyReady.then(startAssembly, startAssembly);
  later(reveal, MAX_PREPARE_MS);
  const settled = () => {
    assetsSettled = true;
    if (assembled) reveal();
  };
  void ready.then(settled, settled);
  return {
    skip: finish,
    dispose() {
      active = false;
      clear();
    },
  };
}

export function requestOpeningReplay() {
  window.dispatchEvent(new Event(OPENING_REPLAY_EVENT));
}
