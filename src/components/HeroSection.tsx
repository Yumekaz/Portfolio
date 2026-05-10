/**
 * HeroSection — the "DEPTH / CORRECTNESS / OBSERVABILITY" intro with
 * the input→process→output flow and an architecture SVG diagram.
 */
export default function HeroSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-black">
      {/* Left column — mantra & I/O flow */}
      <div className="p-8 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-black">
        <div>
          <h1 className="font-mono text-4xl md:text-5xl font-bold tracking-tighter leading-none mb-6">
            DEPTH.<br />CORRECTNESS.<br />OBSERVABILITY.
          </h1>
          <p className="font-mono text-sm text-gray-600 mb-8 max-w-md">
            {'>'} I build systems from first principles: container runtimes, distributed
            storage, coordination services, deterministic debugging tools, compiler
            correctness labs, and codebase intelligence systems.
          </p>
        </div>

        <div className="space-y-4 font-mono text-xs">
          <div className="flex items-center gap-4">
            <span className="w-20 text-gray-500">INPUT</span>
            <span className="border border-black px-2 py-1">Ambiguous Reqs</span>
            <span className="border border-black px-2 py-1">Nondet. Bugs</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 text-gray-500">PROCESS</span>
            <span className="border border-black px-2 py-1 bg-black text-white">Systems Design</span>
            <span className="border border-black px-2 py-1">Python/Rust</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 text-gray-500">OUTPUT</span>
            <span className="border border-orange-600 text-orange-600 px-2 py-1 font-bold">Evidence</span>
          </div>
        </div>
      </div>

      {/* Right column — architecture diagram */}
      <div className="bg-gray-50 p-8 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-2 right-2 font-mono text-[10px] text-gray-400">
          FIG 1.0: IDEMPOTENCY LAYER
        </div>
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-[300px] opacity-90">
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#000" />
            </marker>
          </defs>

          {/* Load Balancer */}
          <rect x="160" y="20" width="80" height="40" fill="none" stroke="#000" strokeWidth="2" />
          <text x="200" y="45" textAnchor="middle" fontFamily="monospace" fontSize="10">L7 LB</text>

          {/* Services */}
          <rect x="50" y="100" width="80" height="60" fill="none" stroke="#000" strokeWidth="2" />
          <text x="90" y="135" textAnchor="middle" fontFamily="monospace" fontSize="10">Worker A</text>

          <rect x="160" y="100" width="80" height="60" fill="#000" stroke="#000" strokeWidth="2" />
          <text x="200" y="135" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#fff">Leader</text>

          <rect x="270" y="100" width="80" height="60" fill="none" stroke="#000" strokeWidth="2" />
          <text x="310" y="135" textAnchor="middle" fontFamily="monospace" fontSize="10">Worker B</text>

          {/* Database */}
          <path d="M160,220 C160,210 240,210 240,220 L240,260 C240,270 160,270 160,260 Z" fill="none" stroke="#ea580c" strokeWidth="2" />
          <path d="M160,220 C160,230 240,230 240,220" fill="none" stroke="#ea580c" strokeWidth="2" />
          <text x="200" y="250" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#ea580c">Sharded DB</text>

          {/* Connections */}
          <line x1="200" y1="60" x2="200" y2="100" stroke="#000" strokeWidth="1" markerEnd="url(#arrow)" />
          <line x1="200" y1="60" x2="90" y2="100" stroke="#000" strokeWidth="1" markerEnd="url(#arrow)" />
          <line x1="200" y1="60" x2="310" y2="100" stroke="#000" strokeWidth="1" markerEnd="url(#arrow)" />
          <line x1="200" y1="160" x2="200" y2="210" stroke="#000" strokeWidth="1" strokeDasharray="4 2" markerEnd="url(#arrow)" />
        </svg>
      </div>
    </section>
  );
}
