// A small quorum illustration, not a consensus implementation.
// Leadership, latency, partial commits, and durable storage are not simulated.
export type ReplicaId = "A" | "B" | "C";
export interface Replica {
  id: ReplicaId;
  online: boolean;
  version: number;
}
export interface LabEvent {
  sequence: number;
  accepted: boolean;
  version: number;
  acknowledgements: number;
}
export interface LabState {
  replicas: Replica[];
  version: number;
  attempts: number;
  hasFault: boolean;
  history: LabEvent[];
}
export type LabAction =
  | { type: "toggle"; id: ReplicaId }
  | { type: "write" }
  | { type: "scenario" }
  | { type: "reset" };

export function initialLab(): LabState {
  return {
    replicas: (["A", "B", "C"] as ReplicaId[]).map((id) => ({
      id,
      online: true,
      version: 0,
    })),
    version: 0,
    attempts: 0,
    hasFault: false,
    history: [],
  };
}
export function commitWrite(state: LabState): LabState {
  const acknowledgements = state.replicas.filter(
    (replica) => replica.online,
  ).length;
  const accepted = acknowledgements >= 2;
  const version = accepted ? state.version + 1 : state.version;
  const event = {
    sequence: state.attempts + 1,
    accepted,
    version,
    acknowledgements,
  };
  return {
    ...state,
    version,
    attempts: event.sequence,
    replicas: state.replicas.map((replica) =>
      replica.online && accepted ? { ...replica, version } : replica,
    ),
    history: [event, ...state.history].slice(0, 3),
  };
}
export function labReducer(state: LabState, action: LabAction): LabState {
  if (action.type === "reset") return initialLab();
  if (action.type === "write") return commitWrite(state);
  if (action.type === "toggle")
    return {
      ...state,
      hasFault: true,
      replicas: state.replicas.map((replica) =>
        replica.id === action.id
          ? {
              ...replica,
              online: !replica.online,
              version: replica.online ? replica.version : state.version,
            }
          : replica,
      ),
    };
  const online = state.replicas.filter((replica) => replica.online);
  if (online.length >= 2) {
    const target = online[online.length - 1].id;
    return commitWrite({
      ...state,
      hasFault: true,
      replicas: state.replicas.map((replica) =>
        replica.id === target ? { ...replica, online: false } : replica,
      ),
    });
  }
  return commitWrite({
    ...state,
    replicas: state.replicas.map((replica) => ({
      ...replica,
      online: true,
      version: state.version,
    })),
  });
}
