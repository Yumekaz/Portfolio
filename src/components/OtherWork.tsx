import { ArrowUpRight } from "lucide-react";
import RouteHeader from "./RouteHeader";
const otherWork = [
  [
    "DuraFlow",
    "Durable workflow engine with checkpointed steps and recovery semantics.",
    "https://github.com/Yumekaz/DURAFLOW",
  ],
  [
    "Orbits",
    "Static and runtime codebase mapping for evidence-backed refactoring.",
    "https://github.com/Yumekaz/Orbits",
  ],
  [
    "WasmForge",
    "Local-first browser IDE with WebAssembly workers and offline storage.",
    "https://github.com/Yumekaz/WasmForge",
  ],
  [
    "MAJA",
    "Same-network messenger with authenticated rooms and client-side encryption.",
    "https://github.com/Yumekaz/E2E-Messenger-n",
  ],
  [
    "SILSILA",
    "Airline disruption simulation and recovery decision-support platform.",
    "https://github.com/Yumekaz/SILSILA",
  ],
  [
    "Skein",
    "Offline-first Bluetooth mesh messaging, extended from an open-source base.",
    "https://github.com/Yumekaz/Skein",
  ],
  [
    "AeroVoxel",
    "Educational 2D LBM wind tunnel with an ML force-proxy experiment.",
    "https://github.com/Yumekaz/AeroVoxel",
  ],
  [
    "BitNet Triton",
    "Packed ternary GEMM prototype with documented negative benchmark results.",
    "https://github.com/Yumekaz/bitnet-1.58b-gemm-triton",
  ],
  [
    "AUTOFORGE",
    "Governed automotive code-generation pipeline with validation artifacts.",
    "https://github.com/Yumekaz/AUTOFORGE",
  ],
];

export default function OtherWork() {
  return (
    <section className="other-work-page" id="other-work">
      <RouteHeader
        eyebrow="THE WORKSHOP / SUPPORTING EXPLORATIONS"
        title="Curiosity takes many forms."
        description="Runtime systems, developer tools, and experiments beyond distributed systems. A wider view of the things I like to build and understand."
      />
      <div className="work-shelf">
        {otherWork.map(([name, description, url]) => (
          <a
            key={name}
            data-reveal
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="shelf-item"
          >
            <div className="flex justify-between gap-4 mb-3">
              <span className="font-mono text-sm font-bold transition-colors group-hover:text-orange-700">
                {name}
              </span>
              <ArrowUpRight size={20} />
            </div>
            <p className="font-mono text-xs text-gray-600 leading-relaxed">
              {description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
