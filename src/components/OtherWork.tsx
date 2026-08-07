const otherWork = [
  ['DuraFlow', 'Durable workflow engine with checkpointed steps and recovery semantics.', 'https://github.com/Yumekaz/DURAFLOW'],
  ['Orbits', 'Static and runtime codebase mapping for evidence-backed refactoring.', 'https://github.com/Yumekaz/Orbits'],
  ['WasmForge', 'Local-first browser IDE with WebAssembly workers and offline storage.', 'https://github.com/Yumekaz/WasmForge'],
  ['MAJA', 'Same-network messenger with authenticated rooms and client-side encryption.', 'https://github.com/Yumekaz/E2E-Messenger-n'],
  ['SILSILA', 'Airline disruption simulation and recovery decision-support platform.', 'https://github.com/Yumekaz/SILSILA'],
  ['Skein', 'Offline-first Bluetooth mesh messaging, extended from an open-source base.', 'https://github.com/Yumekaz/Skein'],
  ['AeroVoxel', 'Educational 2D LBM wind tunnel with an ML force-proxy experiment.', 'https://github.com/Yumekaz/AeroVoxel'],
  ['BitNet Triton', 'Packed ternary GEMM prototype with documented negative benchmark results.', 'https://github.com/Yumekaz/bitnet-1.58b-gemm-triton'],
  ['AUTOFORGE', 'Governed automotive code-generation pipeline with validation artifacts.', 'https://github.com/Yumekaz/AUTOFORGE'],
];

export default function OtherWork() {
  return (
    <section className="border-t border-black bg-gray-50" id="other-work">
      <div className="p-8 lg:p-10 border-b border-black">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-orange-600 mb-3">
          REPOSITORY SHELF / SUPPORTING WORK
        </p>
        <h2 className="font-mono text-2xl font-bold tracking-tight mb-3">
          Other systems, tools, and experiments
        </h2>
        <p className="font-mono text-xs text-gray-600 max-w-2xl leading-relaxed">
          These projects remain public and linkable. They support the main
          distributed-systems narrative without making the homepage pretend
          every project has the same role or maturity.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {otherWork.map(([name, description, url], index) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-6 border-b border-black hover:bg-orange-50 transition-colors ${index % 3 !== 2 ? 'lg:border-r' : ''} ${index % 2 === 0 ? 'md:border-r lg:border-r' : 'md:border-r-0'}`}
          >
            <div className="flex justify-between gap-4 mb-3">
              <span className="font-mono text-sm font-bold">{name}</span>
              <span className="font-mono text-[10px] text-orange-600">↗</span>
            </div>
            <p className="font-mono text-xs text-gray-600 leading-relaxed">{description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
