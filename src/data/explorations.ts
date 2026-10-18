export type ExplorationCategory =
  "Systems" | "Developer tools" | "Communication" | "Experiments";
export interface Exploration {
  name: string;
  description: string;
  url: string;
  category: ExplorationCategory;
  material: string;
}
export const explorations: Exploration[] = [
  {
    name: "DuraFlow",
    description:
      "Durable workflow engine with checkpointed steps and recovery semantics.",
    url: "https://github.com/Yumekaz/DURAFLOW",
    category: "Systems",
    material: "CHECKPOINT / CONTINUITY",
  },
  {
    name: "Orbits",
    description:
      "Static and runtime codebase mapping for evidence-backed refactoring.",
    url: "https://github.com/Yumekaz/Orbits",
    category: "Developer tools",
    material: "CONNECTION / STRUCTURE",
  },
  {
    name: "WasmForge",
    description:
      "Local-first browser IDE with WebAssembly workers and offline storage.",
    url: "https://github.com/Yumekaz/WasmForge",
    category: "Developer tools",
    material: "WORKSPACE / EXECUTION",
  },
  {
    name: "MAJA",
    description:
      "Same-network messenger with authenticated rooms and client-side encryption.",
    url: "https://github.com/Yumekaz/E2E-Messenger-n",
    category: "Communication",
    material: "PROXIMITY / TRUST",
  },
  {
    name: "SILSILA",
    description:
      "Airline disruption simulation and recovery decision-support platform.",
    url: "https://github.com/Yumekaz/SILSILA",
    category: "Experiments",
    material: "DISRUPTION / REROUTING",
  },
  {
    name: "Skein",
    description:
      "Offline-first Bluetooth mesh messaging, extended from an open-source base.",
    url: "https://github.com/Yumekaz/Skein",
    category: "Communication",
    material: "MESH / CONNECTION",
  },
  {
    name: "AeroVoxel",
    description:
      "Educational 2D LBM wind tunnel with an ML force-proxy experiment.",
    url: "https://github.com/Yumekaz/AeroVoxel",
    category: "Experiments",
    material: "FLOW / RESISTANCE",
  },
  {
    name: "BitNet Triton",
    description:
      "Packed ternary GEMM prototype with documented negative benchmark results.",
    url: "https://github.com/Yumekaz/bitnet-1.58b-gemm-triton",
    category: "Experiments",
    material: "COMPRESSION / COMPUTATION",
  },
  {
    name: "AUTOFORGE",
    description:
      "Governed automotive code-generation pipeline with validation artifacts.",
    url: "https://github.com/Yumekaz/AUTOFORGE",
    category: "Developer tools",
    material: "GENERATION / VALIDATION",
  },
];
