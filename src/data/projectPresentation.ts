// Editorial presentation only. Technical claims remain in projects.ts.
export interface ProjectPresentation {
  art: string;
  headline: [string, string];
  material: string;
  theme: string;
  notes: string[];
}
export const projectPresentation: Record<string, ProjectPresentation> = {
  coordination: {
    art: "coordination",
    headline: ["Agreement,", "under pressure."],
    material: "INTERDEPENDENCE / CHROME & CERAMIC",
    theme: "stone",
    notes: [],
  },
  miniRedis: {
    art: "storage",
    headline: ["A promise is", "a protocol."],
    material: "CONSISTENCY / AMBER & STEEL",
    theme: "amber",
    notes: ["quorum-is-not-freshness"],
  },
  failforge: {
    art: "failforge",
    headline: ["Give failure", "a return address."],
    material: "CONTROLLED CHAOS / FRACTURED CHROME",
    theme: "carbon",
    notes: ["failure-testing-needs-a-model"],
  },
  cairn: {
    art: "cairn",
    headline: ["Interrupted.", "Not forgotten."],
    material: "RECOVERY / STONE & RESIN",
    theme: "stone",
    notes: ["metadata-commit-boundary", "interrupted-work-is-not-failure"],
  },
  drt: {
    art: "drt",
    headline: ["Same trace.", "Same truth."],
    material: "REPLAY / MATCHED CHROME RIBBONS",
    theme: "sage",
    notes: ["explicit-determinism"],
  },
  qydrel: {
    art: "qydrel",
    headline: ["One program.", "Every perspective."],
    material: "VERIFICATION / GLASS & REFLECTION",
    theme: "amber",
    notes: ["proof-before-optimization"],
  },
  miniDocker: {
    art: "runtime",
    headline: ["Boundaries,", "built from within."],
    material: "ISOLATION / NESTED STEEL",
    theme: "carbon",
    notes: [],
  },
  tinyTantrum: {
    art: "training",
    headline: ["Make the result", "repeatable."],
    material: "REPRODUCIBILITY / GLASS & CHROME",
    theme: "stone",
    notes: ["reproducibility-is-a-feature"],
  },
};
