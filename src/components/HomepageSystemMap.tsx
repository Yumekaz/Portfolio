import { useEffect, useState } from 'react';
import projects from '../data/projects';

const flagshipProjects = projects.slice(0, 3);

interface HomepageSystemMapProps {
  activeSection: string;
  onSelect: (id: string) => void;
}

function isFlagshipProject(id: string) {
  return flagshipProjects.some((project) => project.id === id);
}

export default function HomepageSystemMap({ activeSection, onSelect }: HomepageSystemMapProps) {
  const initialProject = isFlagshipProject(activeSection) ? activeSection : flagshipProjects[0].id;
  const [selectedId, setSelectedId] = useState(initialProject);
  const selectedProject = flagshipProjects.find((project) => project.id === selectedId) ?? flagshipProjects[0];

  useEffect(() => {
    if (isFlagshipProject(activeSection)) setSelectedId(activeSection);
  }, [activeSection]);

  const selectProject = (id: string) => {
    setSelectedId(id);
    onSelect(id);
  };

  return (
    <section className="system-map relative flex min-h-[620px] flex-col overflow-hidden bg-[#101010] p-4 text-white sm:p-6 lg:min-h-full lg:p-8" aria-labelledby="system-map-title">
      <div className="system-map-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="system-map-glow pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-600/20 blur-3xl" />

      <div className="relative z-10 flex items-start justify-between gap-4 border-b border-white/20 pb-4 font-mono text-[10px] uppercase tracking-[0.18em]">
        <div>
          <p id="system-map-title" className="text-orange-400">System map / flagship systems</p>
          <p className="mt-2 text-white/50">Failure → trace → proof</p>
        </div>
        <div className="flex items-center gap-2 text-right text-white/50">
          <span className="system-map-status-dot" />
          <span>03 connected</span>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center py-5 sm:py-6">
        <svg className="h-auto w-full max-w-[680px]" viewBox="0 0 640 430" role="img" aria-labelledby="system-map-graphic-title system-map-graphic-desc">
          <title id="system-map-graphic-title">Three flagship systems connected through an evidence loop</title>
          <desc id="system-map-graphic-desc">Coordination, storage, and failure testing converge on a shared loop of failure, trace, proof, and recovery.</desc>
          <defs>
            <pattern id="system-map-grid-pattern" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
            </pattern>
            <radialGradient id="system-map-core-gradient">
              <stop offset="0" stopColor="#fb923c" stopOpacity="0.95" />
              <stop offset="0.55" stopColor="#ea580c" stopOpacity="0.95" />
              <stop offset="1" stopColor="#9a3412" stopOpacity="1" />
            </radialGradient>
            <filter id="system-map-glow-filter" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <marker id="system-map-arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3z" fill="#f97316" />
            </marker>
          </defs>

          <rect width="640" height="430" fill="url(#system-map-grid-pattern)" />
          <ellipse cx="320" cy="220" rx="232" ry="148" className="system-map-orbit" />
          <ellipse cx="320" cy="220" rx="184" ry="112" className="system-map-orbit system-map-orbit-inner" />

          <g className={`system-map-route ${selectedId === 'coordination' ? 'is-active' : ''}`}>
            <path d="M150 112 C212 125 246 167 288 207" markerEnd="url(#system-map-arrow)" />
            <circle cx="220" cy="145" r="3" className="system-map-pulse" />
          </g>
          <g className={`system-map-route ${selectedId === 'miniRedis' ? 'is-active' : ''}`}>
            <path d="M490 112 C428 125 394 167 352 207" markerEnd="url(#system-map-arrow)" />
            <circle cx="420" cy="145" r="3" className="system-map-pulse" />
          </g>
          <g className={`system-map-route ${selectedId === 'failforge' ? 'is-active' : ''}`}>
            <path d="M320 350 C320 320 320 285 320 264" markerEnd="url(#system-map-arrow)" />
            <circle cx="320" cy="310" r="3" className="system-map-pulse" />
          </g>

          <circle cx="320" cy="220" r="70" className="system-map-core-halo" />
          <circle cx="320" cy="220" r="51" fill="url(#system-map-core-gradient)" filter="url(#system-map-glow-filter)" />
          <circle cx="320" cy="220" r="42" className="system-map-core-ring" />
          <text x="320" y="216" textAnchor="middle" className="system-map-core-label">EVIDENCE</text>
          <text x="320" y="232" textAnchor="middle" className="system-map-core-subtitle">LOOP</text>

          <g className={`system-map-node ${selectedId === 'coordination' ? 'is-active' : ''}`}>
            <circle cx="120" cy="100" r="48" className="system-map-node-halo" />
            <circle cx="120" cy="100" r="36" className="system-map-node-circle" />
            <text x="120" y="96" textAnchor="middle" className="system-map-node-index">01</text>
            <text x="120" y="110" textAnchor="middle" className="system-map-node-label">COORDINATE</text>
          </g>
          <g className={`system-map-node ${selectedId === 'miniRedis' ? 'is-active' : ''}`}>
            <circle cx="520" cy="100" r="48" className="system-map-node-halo" />
            <circle cx="520" cy="100" r="36" className="system-map-node-circle" />
            <text x="520" y="96" textAnchor="middle" className="system-map-node-index">02</text>
            <text x="520" y="110" textAnchor="middle" className="system-map-node-label">CONSISTENCY</text>
          </g>
          <g className={`system-map-node ${selectedId === 'failforge' ? 'is-active' : ''}`}>
            <circle cx="320" cy="365" r="48" className="system-map-node-halo" />
            <circle cx="320" cy="365" r="36" className="system-map-node-circle" />
            <text x="320" y="361" textAnchor="middle" className="system-map-node-index">03</text>
            <text x="320" y="375" textAnchor="middle" className="system-map-node-label">VERIFY</text>
          </g>

          <text x="320" y="31" textAnchor="middle" className="system-map-caption">A FAILURE IS ONLY USEFUL WHEN IT BECOMES EVIDENCE</text>
        </svg>
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-px bg-white/20 sm:grid-cols-3" role="tablist" aria-label="Flagship systems">
        {flagshipProjects.map((project, index) => {
          const isSelected = project.id === selectedId;
          return (
            <button
              key={project.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => selectProject(project.id)}
              onFocus={() => selectProject(project.id)}
              className={`group min-h-[72px] bg-[#151515] px-3 py-3 text-left font-mono transition-colors hover:bg-orange-950 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-400 ${isSelected ? 'bg-orange-950' : ''}`}
            >
              <span className={`block text-[10px] tracking-widest ${isSelected ? 'text-orange-400' : 'text-white/40'}`}>0{index + 1} / {project.focus}</span>
              <span className={`mt-2 block text-xs font-bold ${isSelected ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>{project.name}</span>
            </button>
          );
        })}
      </div>

      <div className="relative z-10 mt-4 flex flex-col gap-4 border-t border-white/20 pt-4 sm:flex-row sm:items-end sm:justify-between" aria-live="polite">
        <div className="max-w-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-orange-400">Active thread / {selectedProject.focus}</p>
          <p className="mt-2 font-mono text-sm font-bold text-white">{selectedProject.problem}</p>
        </div>
        <a
          href={`/projects/#${selectedProject.id}`}
          className="shrink-0 font-mono text-xs text-orange-400 underline-offset-4 transition-colors hover:text-orange-200 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-400"
        >
          Open dossier ↗
        </a>
      </div>
    </section>
  );
}
