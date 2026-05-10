/**
 * HeroSection — the "DEPTH / CORRECTNESS / OBSERVABILITY" intro with
 * the input→process→output flow, a short bio, and an architecture
 * SVG based on Mini-Redis-Cassandra's actual sharding topology.
 */
export default function HeroSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-black">
      {/* Left column — mantra, bio & I/O flow */}
      <div className="p-8 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-black">
        <div>
          <h1 className="font-mono text-4xl md:text-5xl font-bold tracking-tighter leading-none mb-4">
            DEPTH.<br />CORRECTNESS.<br />OBSERVABILITY.
          </h1>
          <p className="font-mono text-xs text-gray-500 mb-6 max-w-md">
            Mihir Swarnkar · BTech CSE · India
          </p>
          <p className="font-mono text-sm text-gray-600 mb-8 max-w-md">
            {'>'} I break systems on purpose to understand how they fail — then
            build them back with evidence. Container runtimes, distributed storage,
            coordination services, deterministic debuggers, compiler correctness labs.
          </p>
        </div>

        {/* Tech domains — each tied to a real project */}
        <div className="grid grid-cols-2 gap-px bg-black font-mono text-[11px]">
          <div className="bg-white p-3">
            <div className="font-bold mb-1">Linux Internals</div>
            <div className="text-gray-500">namespaces · cgroups · seccomp</div>
          </div>
          <div className="bg-white p-3">
            <div className="font-bold mb-1">Distributed Systems</div>
            <div className="text-gray-500">raft · gossip · quorum writes</div>
          </div>
          <div className="bg-white p-3">
            <div className="font-bold mb-1">Compiler Correctness</div>
            <div className="text-gray-500">bytecode · fuzzing · JIT equiv</div>
          </div>
          <div className="bg-white p-3">
            <div className="font-bold mb-1">Deterministic Debugging</div>
            <div className="text-gray-500">record/replay · drift detection</div>
          </div>
          <div className="bg-white p-3">
            <div className="font-bold mb-1">Languages</div>
            <div className="text-orange-600 font-bold">Python · Rust · TypeScript</div>
          </div>
          <div className="bg-white p-3">
            <div className="font-bold mb-1">Infra</div>
            <div className="text-orange-600 font-bold">WebAssembly · gRPC · OverlayFS</div>
          </div>
        </div>
      </div>

      {/* Right column — architecture diagram (Mini-Redis-Cassandra topology) */}
      <div className="bg-gray-50 p-8 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-2 right-2 font-mono text-[10px] text-gray-400">
          FIG 1.0: CONSISTENT HASH RING
        </div>
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-[300px] opacity-90">
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#000" />
            </marker>
          </defs>

          {/* Hash ring */}
          <circle cx="200" cy="145" r="100" fill="none" stroke="#d4d4d4" strokeWidth="2" strokeDasharray="6 4" />

          {/* Nodes on ring */}
          <circle cx="200" cy="45" r="18" fill="#000" stroke="#000" strokeWidth="2" />
          <text x="200" y="49" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#fff">N1</text>
          <text x="200" y="28" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#666">Leader</text>

          <circle cx="287" cy="195" r="18" fill="none" stroke="#000" strokeWidth="2" />
          <text x="287" y="199" textAnchor="middle" fontFamily="monospace" fontSize="9">N2</text>

          <circle cx="113" cy="195" r="18" fill="none" stroke="#000" strokeWidth="2" />
          <text x="113" y="199" textAnchor="middle" fontFamily="monospace" fontSize="9">N3</text>

          {/* Virtual nodes (smaller) */}
          <circle cx="270" cy="80" r="6" fill="#ea580c" />
          <text x="285" y="78" fontFamily="monospace" fontSize="7" fill="#ea580c">vn1</text>
          <circle cx="130" cy="80" r="6" fill="#ea580c" />
          <text x="112" y="78" fontFamily="monospace" fontSize="7" fill="#ea580c">vn2</text>
          <circle cx="245" cy="240" r="6" fill="#ea580c" />
          <text x="260" y="243" fontFamily="monospace" fontSize="7" fill="#ea580c">vn3</text>
          <circle cx="155" cy="240" r="6" fill="#ea580c" />
          <text x="136" y="243" fontFamily="monospace" fontSize="7" fill="#ea580c">vn4</text>

          {/* Replication arrows */}
          <line x1="216" y1="55" x2="272" y2="182" stroke="#000" strokeWidth="1" strokeDasharray="4 2" markerEnd="url(#arrow)" />
          <line x1="184" y1="55" x2="128" y2="182" stroke="#000" strokeWidth="1" strokeDasharray="4 2" markerEnd="url(#arrow)" />

          {/* Client */}
          <rect x="310" y="40" width="70" height="30" fill="none" stroke="#ea580c" strokeWidth="2" />
          <text x="345" y="59" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#ea580c">Client</text>
          <line x1="310" y1="55" x2="220" y2="47" stroke="#ea580c" strokeWidth="1" markerEnd="url(#arrow)" />

          {/* Gossip label */}
          <text x="200" y="280" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#999">gossip protocol ↔ heartbeat</text>
        </svg>
      </div>
    </section>
  );
}
