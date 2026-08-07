/**
 * ProjectDiagram — renders a unique animated SVG for each project.
 * Swaps with a fade transition when activeSection changes.
 */
import { useEffect, useState } from 'react';

interface Props { activeSection: string; }

/* ── Shared arrow marker ── */
const Defs = () => (
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3z" fill="#000" />
    </marker>
    <marker id="arrO" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3z" fill="#ea580c" />
    </marker>
  </defs>
);

/* ── Diagram metadata ── */
const LABELS: Record<string, string> = {
  coordination: 'FIG 1.0: CONTROL-PLANE REPLICATION',
  miniRedis:    'FIG 2.0: CONSISTENCY PATH',
  failforge:    'FIG 3.0: FAULT → INVARIANT',
  cairn:        'FIG 4.0: DURABLE DEPLOYMENT',
  drt:          'FIG 5.0: RECORD / REPLAY',
  qydrel:       'FIG 6.0: EQUIVALENCE TESTING',
  miniDocker:   'FIG 7.0: CONTAINER ISOLATION',
  tinyTantrum:  'FIG 8.0: REPRODUCIBLE TRAINING',
};

/* ────────────────────────────────────────────────
   Individual diagram components (one per project)
   ──────────────────────────────────────────────── */

function MiniDockerDiagram() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full max-h-[320px]">
      <Defs />
      {/* Host box */}
      <rect x="30" y="20" width="340" height="260" rx="4" fill="none" stroke="#d4d4d4" strokeWidth="1.5" strokeDasharray="6 3" />
      <text x="50" y="40" fontFamily="monospace" fontSize="9" fill="#999">HOST KERNEL</text>

      {/* Namespace boxes */}
      {[
        { x: 60, label: 'PID NS', color: '#000' },
        { x: 160, label: 'NET NS', color: '#000' },
        { x: 260, label: 'MNT NS', color: '#000' },
      ].map((ns, i) => (
        <g key={ns.label}>
          <rect x={ns.x} y="60" width="80" height="35" rx="2" fill="#f5f5f5" stroke={ns.color} strokeWidth="1.5">
            <animate attributeName="opacity" values="0;1" dur="0.4s" begin={`${i * 0.15}s`} fill="freeze" />
          </rect>
          <text x={ns.x + 40} y="82" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#333">
            {ns.label}
          </text>
        </g>
      ))}

      {/* Container process */}
      <rect x="120" y="120" width="160" height="50" rx="3" fill="#1a1a1a" stroke="#ea580c" strokeWidth="2">
        <animate attributeName="opacity" values="0;1" dur="0.5s" begin="0.5s" fill="freeze" />
      </rect>
      <text x="200" y="142" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#fff">CONTAINER</text>
      <text x="200" y="158" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#ea580c">PID 1 · isolated</text>

      {/* cgroups */}
      <rect x="80" y="195" width="100" height="35" rx="2" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="4 2">
        <animate attributeName="stroke-dashoffset" values="0;-24" dur="3s" repeatCount="indefinite" />
      </rect>
      <text x="130" y="216" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#ea580c">cgroups v2</text>

      {/* seccomp */}
      <rect x="220" y="195" width="100" height="35" rx="2" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="4 2">
        <animate attributeName="stroke-dashoffset" values="0;-24" dur="3s" begin="0.5s" repeatCount="indefinite" />
      </rect>
      <text x="270" y="216" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#ea580c">seccomp-BPF</text>

      {/* OverlayFS */}
      <rect x="120" y="250" width="160" height="25" rx="2" fill="#f9fafb" stroke="#d4d4d4" strokeWidth="1">
        <animate attributeName="opacity" values="0;1" dur="0.4s" begin="0.8s" fill="freeze" />
      </rect>
      <text x="200" y="267" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#666">OverlayFS · copy-on-write</text>

      {/* Arrows */}
      <line x1="200" y1="170" x2="130" y2="195" stroke="#333" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#arr)" />
      <line x1="200" y1="170" x2="270" y2="195" stroke="#333" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#arr)" />
    </svg>
  );
}

function MiniRedisDiagram() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full max-h-[320px]">
      <Defs />
      <circle cx="200" cy="145" r="100" fill="none" stroke="#d4d4d4" strokeWidth="2" strokeDasharray="6 4">
        <animateTransform attributeName="transform" type="rotate" from="0 200 145" to="360 200 145" dur="60s" repeatCount="indefinite" />
      </circle>
      {/* Nodes */}
      <circle cx="200" cy="45" r="18" fill="#000" stroke="#000" strokeWidth="2" />
      <text x="200" y="49" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#fff">N1</text>
      <text x="200" y="28" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#666">Leader</text>
      <circle cx="287" cy="195" r="18" fill="none" stroke="#000" strokeWidth="2" />
      <text x="287" y="199" textAnchor="middle" fontFamily="monospace" fontSize="9">N2</text>
      <circle cx="113" cy="195" r="18" fill="none" stroke="#000" strokeWidth="2" />
      <text x="113" y="199" textAnchor="middle" fontFamily="monospace" fontSize="9">N3</text>
      {/* Virtual nodes */}
      {[[270,80,'vn1'],[130,80,'vn2'],[245,240,'vn3'],[155,240,'vn4']].map(([x,y,l]) => (
        <g key={l as string}>
          <circle cx={x as number} cy={y as number} r="6" fill="#ea580c">
            <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x={(x as number)+15} y={(y as number)+3} fontFamily="monospace" fontSize="7" fill="#ea580c">{l as string}</text>
        </g>
      ))}
      {/* Replication arrows */}
      <line x1="216" y1="55" x2="272" y2="182" stroke="#000" strokeWidth="1" strokeDasharray="4 2" markerEnd="url(#arr)" />
      <line x1="184" y1="55" x2="128" y2="182" stroke="#000" strokeWidth="1" strokeDasharray="4 2" markerEnd="url(#arr)" />
      {/* Client */}
      <rect x="310" y="40" width="70" height="30" fill="none" stroke="#ea580c" strokeWidth="2" />
      <text x="345" y="59" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#ea580c">Client</text>
      <line x1="310" y1="55" x2="220" y2="47" stroke="#ea580c" strokeWidth="1" markerEnd="url(#arr)" />
      <text x="200" y="280" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#999">gossip protocol ↔ heartbeat</text>
    </svg>
  );
}

function CoordinationDiagram() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full max-h-[320px]">
      <Defs />
      {/* Leader */}
      <circle cx="200" cy="60" r="22" fill="#1a1a1a" stroke="#ea580c" strokeWidth="2" />
      <text x="200" y="64" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#fff">LEADER</text>
      {/* Followers */}
      {[[80,180],[200,200],[320,180]].map(([x,y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="18" fill="none" stroke="#333" strokeWidth="1.5" />
          <text x={x} y={y as number + 4} textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#333">F{i+1}</text>
          <line x1="200" y1="82" x2={x} y2={(y as number)-18} stroke="#333" strokeWidth="1" strokeDasharray="4 2" markerEnd="url(#arr)">
            <animate attributeName="stroke-dashoffset" values="0;-12" dur="1.5s" begin={`${i*0.3}s`} repeatCount="indefinite" />
          </line>
        </g>
      ))}
      {/* Quorum box */}
      <rect x="60" y="230" width="280" height="30" rx="3" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="5 3">
        <animate attributeName="stroke-dashoffset" values="0;-16" dur="2s" repeatCount="indefinite" />
      </rect>
      <text x="200" y="250" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#ea580c">QUORUM GATE — 2/3 required</text>
      {/* Write path */}
      <rect x="310" y="40" width="70" height="28" fill="none" stroke="#ea580c" strokeWidth="1.5" />
      <text x="345" y="58" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#ea580c">WRITE</text>
      <line x1="310" y1="54" x2="224" y2="54" stroke="#ea580c" strokeWidth="1" markerEnd="url(#arrO)" />
      <text x="200" y="290" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#999">crash-aware · causal history</text>
    </svg>
  );
}

function DrtDiagram() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full max-h-[320px]">
      <Defs />
      {/* Timeline */}
      <line x1="40" y1="80" x2="360" y2="80" stroke="#d4d4d4" strokeWidth="1.5" />
      <text x="30" y="75" fontFamily="monospace" fontSize="8" fill="#999">T</text>
      {/* Thread lines */}
      {[120, 170, 220].map((y, i) => (
        <g key={i}>
          <line x1="60" y1={y} x2="350" y2={y} stroke="#e5e5e5" strokeWidth="1" />
          <text x="40" y={y+4} fontFamily="monospace" fontSize="7" fill="#999">T{i}</text>
          {/* Moving event dot */}
          <circle cx="60" cy={y} r="4" fill="#ea580c">
            <animate attributeName="cx" values="80;320" dur={`${2+i*0.5}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.3;1" dur={`${2+i*0.5}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      {/* Record phase */}
      <rect x="60" y="40" width="130" height="25" rx="2" fill="#1a1a1a">
        <animate attributeName="opacity" values="0;1" dur="0.5s" fill="freeze" />
      </rect>
      <text x="125" y="57" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#fff">RECORD</text>
      {/* Replay phase */}
      <rect x="220" y="40" width="130" height="25" rx="2" fill="none" stroke="#ea580c" strokeWidth="1.5">
        <animate attributeName="opacity" values="0;1" dur="0.5s" begin="0.3s" fill="freeze" />
      </rect>
      <text x="285" y="57" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#ea580c">REPLAY</text>
      {/* Context switch markers */}
      {[140, 200, 260].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="90" x2={x} y2="230" stroke="#ea580c" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
          <text x={x} y="245" textAnchor="middle" fontFamily="monospace" fontSize="6" fill="#ea580c">CS{i+1}</text>
        </g>
      ))}
      <text x="200" y="280" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#999">deterministic scheduling · drift detect</text>
    </svg>
  );
}

function QydrelDiagram() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full max-h-[320px]">
      <Defs />
      {/* Source */}
      <rect x="150" y="15" width="100" height="30" rx="3" fill="#1a1a1a" />
      <text x="200" y="35" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#fff">SOURCE</text>
      {/* Three execution paths */}
      {[
        { x: 60, label: 'VM', sub: 'bytecode' },
        { x: 180, label: 'GC VM', sub: 'managed' },
        { x: 300, label: 'JIT', sub: 'compiled' },
      ].map((path, i) => (
        <g key={path.label}>
          <line x1="200" y1="45" x2={path.x + 20} y2="80" stroke="#333" strokeWidth="1" markerEnd="url(#arr)" />
          <rect x={path.x} y="80" width="60" height="35" rx="2" fill="none" stroke="#333" strokeWidth="1.5">
            <animate attributeName="stroke" values="#333;#ea580c;#333" dur="3s" begin={`${i*0.5}s`} repeatCount="indefinite" />
          </rect>
          <text x={path.x+30} y="100" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#333">{path.label}</text>
          <text x={path.x+30} y="110" textAnchor="middle" fontFamily="monospace" fontSize="6" fill="#999">{path.sub}</text>
          <line x1={path.x+30} y1="115" x2={path.x+30} y2="150" stroke="#333" strokeWidth="1" markerEnd="url(#arr)" />
        </g>
      ))}
      {/* Equivalence checker */}
      <rect x="40" y="155" width="320" height="35" rx="3" fill="none" stroke="#ea580c" strokeWidth="2">
        <animate attributeName="stroke-dasharray" values="0 400;400 0" dur="2s" fill="freeze" />
      </rect>
      <text x="200" y="177" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#ea580c">≡ EQUIVALENCE CHECK</text>
      {/* Fuzz/shrink */}
      <rect x="120" y="215" width="160" height="30" rx="2" fill="#f5f5f5" stroke="#d4d4d4" strokeWidth="1" />
      <text x="200" y="234" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#666">fuzz → shrink → corpus</text>
      <line x1="200" y1="190" x2="200" y2="215" stroke="#333" strokeWidth="1" markerEnd="url(#arr)" />
      <text x="200" y="280" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#999">semantic mismatch detection</text>
    </svg>
  );
}

function OrbitsDiagram() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full max-h-[320px]">
      <Defs />
      {/* Central node */}
      <circle cx="200" cy="140" r="25" fill="#1a1a1a" />
      <text x="200" y="144" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#fff">entry</text>
      {/* Dependency nodes */}
      {[
        [100, 60], [300, 60], [80, 200], [320, 200], [140, 260], [260, 260],
      ].map(([x, y], i) => (
        <g key={i}>
          <line x1="200" y1="140" x2={x} y2={y} stroke="#d4d4d4" strokeWidth="1">
            <animate attributeName="stroke" values="#d4d4d4;#ea580c;#d4d4d4" dur="3s" begin={`${i*0.4}s`} repeatCount="indefinite" />
          </line>
          <circle cx={x} cy={y} r="12" fill="none" stroke="#333" strokeWidth="1.5">
            <animate attributeName="r" values="11;14;11" dur="3s" begin={`${i*0.4}s`} repeatCount="indefinite" />
          </circle>
          <text x={x} y={y as number + 4} textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#333">m{i}</text>
        </g>
      ))}
      {/* Scan pulse */}
      <circle cx="200" cy="140" r="25" fill="none" stroke="#ea580c" strokeWidth="1" opacity="0">
        <animate attributeName="r" values="25;120" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x="200" y="290" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#999">static analysis · impact paths</text>
    </svg>
  );
}

function WasmForgeDiagram() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full max-h-[320px]">
      <Defs />
      {/* Browser frame */}
      <rect x="50" y="25" width="300" height="240" rx="5" fill="none" stroke="#d4d4d4" strokeWidth="1.5" />
      <rect x="50" y="25" width="300" height="20" rx="5" fill="#f5f5f5" stroke="#d4d4d4" strokeWidth="1" />
      <circle cx="65" cy="35" r="3" fill="#ef4444" />
      <circle cx="78" cy="35" r="3" fill="#eab308" />
      <circle cx="91" cy="35" r="3" fill="#22c55e" />
      {/* WASM module */}
      <rect x="80" y="65" width="110" height="40" rx="3" fill="#1a1a1a">
        <animate attributeName="opacity" values="0;1" dur="0.4s" fill="freeze" />
      </rect>
      <text x="135" y="88" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#fff">WASM</text>
      <text x="135" y="100" textAnchor="middle" fontFamily="monospace" fontSize="6" fill="#ea580c">Pyodide</text>
      {/* Worker */}
      <rect x="220" y="65" width="100" height="40" rx="3" fill="none" stroke="#ea580c" strokeWidth="1.5">
        <animate attributeName="stroke-dasharray" values="0 300;300 0" dur="1.5s" fill="freeze" />
      </rect>
      <text x="270" y="88" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#ea580c">Worker</text>
      {/* Data flow */}
      <line x1="190" y1="85" x2="218" y2="85" stroke="#333" strokeWidth="1" markerEnd="url(#arr)">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
      </line>
      {/* SQLite */}
      <rect x="100" y="130" width="80" height="30" rx="2" fill="#f5f5f5" stroke="#333" strokeWidth="1" />
      <text x="140" y="149" textAnchor="middle" fontFamily="monospace" fontSize="8">SQLite</text>
      {/* Storage */}
      <rect x="220" y="130" width="80" height="30" rx="2" fill="#f5f5f5" stroke="#333" strokeWidth="1" />
      <text x="260" y="149" textAnchor="middle" fontFamily="monospace" fontSize="8">IndexedDB</text>
      {/* Notebook */}
      <rect x="130" y="190" width="140" height="35" rx="3" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="4 2">
        <animate attributeName="stroke-dashoffset" values="0;-12" dur="2s" repeatCount="indefinite" />
      </rect>
      <text x="200" y="212" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#ea580c">Notebook UI</text>
      <text x="200" y="285" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#999">local-first · offline · browser-native</text>
    </svg>
  );
}

function AutoforgeDiagram() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full max-h-[320px]">
      <Defs />
      {/* Pipeline stages */}
      {[
        { y: 30, label: 'YAML SPEC', fill: '#f5f5f5', stroke: '#333' },
        { y: 90, label: 'GENERATE', fill: '#1a1a1a', stroke: '#1a1a1a', textFill: '#fff' },
        { y: 150, label: 'REVIEW', fill: 'none', stroke: '#ea580c' },
        { y: 210, label: 'AUDIT', fill: 'none', stroke: '#ea580c' },
      ].map((stage, i) => (
        <g key={stage.label}>
          <rect x="130" y={stage.y} width="140" height="35" rx="3" fill={stage.fill} stroke={stage.stroke} strokeWidth="1.5">
            <animate attributeName="opacity" values="0;1" dur="0.4s" begin={`${i*0.2}s`} fill="freeze" />
          </rect>
          <text x="200" y={stage.y + 22} textAnchor="middle" fontFamily="monospace" fontSize="9" fill={stage.textFill || '#333'}>{stage.label}</text>
          {i < 3 && (
            <line x1="200" y1={stage.y + 35} x2="200" y2={stage.y + 55} stroke="#333" strokeWidth="1" markerEnd="url(#arr)">
              <animate attributeName="stroke-dashoffset" values="0;-8" dur="1s" begin={`${i*0.3}s`} repeatCount="indefinite" />
            </line>
          )}
        </g>
      ))}
      {/* Validation gates */}
      {[115, 175].map((y, i) => (
        <g key={i}>
          <line x1="275" y1={y} x2="340" y2={y} stroke="#ea580c" strokeWidth="1" strokeDasharray="3 2" />
          <rect x="340" y={y - 10} width="50" height="20" rx="2" fill="none" stroke="#ea580c" strokeWidth="1">
            <animate attributeName="stroke" values="#ea580c;#22c55e;#ea580c" dur="2s" begin={`${i*0.5}s`} repeatCount="indefinite" />
          </rect>
          <text x="365" y={y + 4} textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#ea580c">GATE</text>
        </g>
      ))}
      <text x="200" y="280" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#999">governed · traceable · deterministic</text>
    </svg>
  );
}

function FailForgeDiagram() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full max-h-[320px]">
      <Defs />
      <rect x="30" y="30" width="105" height="42" rx="3" fill="#1a1a1a" />
      <text x="82" y="55" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#fff">SEED 42</text>
      <rect x="145" y="30" width="105" height="42" rx="3" fill="none" stroke="#ea580c" strokeWidth="1.5" />
      <text x="197" y="55" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#ea580c">FAULT PLAN</text>
      <rect x="265" y="30" width="105" height="42" rx="3" fill="none" stroke="#333" strokeWidth="1.5" />
      <text x="317" y="55" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#333">CHECKER</text>
      <line x1="135" y1="51" x2="145" y2="51" stroke="#333" markerEnd="url(#arr)" />
      <line x1="250" y1="51" x2="265" y2="51" stroke="#333" markerEnd="url(#arr)" />
      {[90, 200, 310].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="160" r="27" fill={i === 0 ? '#1a1a1a' : 'none'} stroke={i === 0 ? '#ea580c' : '#333'} strokeWidth="1.5" />
          <text x={x} y="164" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={i === 0 ? '#fff' : '#333'}>NODE {i + 1}</text>
          <line x1="197" y1="74" x2={x} y2="132" stroke="#ea580c" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#arrO)" />
        </g>
      ))}
      <rect x="75" y="225" width="250" height="32" rx="3" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x="200" y="245" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#ea580c">REPORT → MINIMIZE → REPLAY</text>
    </svg>
  );
}

function CairnDiagram() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full max-h-[320px]">
      <Defs />
      <rect x="35" y="35" width="95" height="38" rx="3" fill="none" stroke="#333" strokeWidth="1.5" />
      <text x="82" y="58" textAnchor="middle" fontFamily="monospace" fontSize="9">CLI</text>
      <rect x="153" y="35" width="95" height="38" rx="3" fill="#1a1a1a" stroke="#ea580c" strokeWidth="1.5" />
      <text x="200" y="58" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#fff">CAIRND</text>
      <rect x="270" y="35" width="95" height="38" rx="3" fill="none" stroke="#333" strokeWidth="1.5" />
      <text x="317" y="58" textAnchor="middle" fontFamily="monospace" fontSize="9">SQLITE</text>
      <line x1="130" y1="54" x2="153" y2="54" stroke="#333" markerEnd="url(#arr)" />
      <line x1="248" y1="54" x2="270" y2="54" stroke="#333" markerEnd="url(#arr)" />
      <rect x="85" y="125" width="230" height="45" rx="3" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x="200" y="145" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#ea580c">DURAFLOW STEPS</text>
      <text x="200" y="159" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#999">health gate · lease reclaim · resume</text>
      <line x1="200" y1="73" x2="200" y2="125" stroke="#333" markerEnd="url(#arr)" />
      <rect x="125" y="215" width="150" height="35" rx="3" fill="#f5f5f5" stroke="#333" strokeWidth="1.5" />
      <text x="200" y="237" textAnchor="middle" fontFamily="monospace" fontSize="8">MINI-DOCKER</text>
      <line x1="200" y1="170" x2="200" y2="215" stroke="#ea580c" strokeDasharray="4 3" markerEnd="url(#arrO)" />
    </svg>
  );
}

function TinyTantrumDiagram() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full max-h-[320px]">
      <Defs />
      <rect x="35" y="105" width="90" height="45" rx="3" fill="none" stroke="#333" strokeWidth="1.5" />
      <text x="80" y="132" textAnchor="middle" fontFamily="monospace" fontSize="8">DATASET</text>
      <rect x="155" y="85" width="90" height="85" rx="3" fill="#1a1a1a" stroke="#ea580c" strokeWidth="1.5" />
      <text x="200" y="115" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#fff">TRAIN</text>
      <text x="200" y="133" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#ea580c">CHECKPOINT</text>
      <text x="200" y="151" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#fff">RNG + CONFIG</text>
      <rect x="275" y="105" width="90" height="45" rx="3" fill="none" stroke="#333" strokeWidth="1.5" />
      <text x="320" y="132" textAnchor="middle" fontFamily="monospace" fontSize="8">EVALUATE</text>
      <line x1="125" y1="127" x2="155" y2="127" stroke="#333" markerEnd="url(#arr)" />
      <line x1="245" y1="127" x2="275" y2="127" stroke="#333" markerEnd="url(#arr)" />
      <rect x="95" y="215" width="210" height="35" rx="3" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x="200" y="237" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#ea580c">SEED · ABLATE · REPORT</text>
    </svg>
  );
}

/* ── Diagram map ── */
const DIAGRAMS: Record<string, () => JSX.Element> = {
  coordination: CoordinationDiagram,
  miniRedis:    MiniRedisDiagram,
  failforge:    FailForgeDiagram,
  cairn:        CairnDiagram,
  drt:          DrtDiagram,
  qydrel:       QydrelDiagram,
  miniDocker:   MiniDockerDiagram,
  tinyTantrum:  TinyTantrumDiagram,
  // Retained for compatibility with older deep links to the broader project shelf.
  orbits:       OrbitsDiagram,
  wasmForge:    WasmForgeDiagram,
  autoforge:    AutoforgeDiagram,
};

export default function ProjectDiagram({ activeSection }: Props) {
  const [current, setCurrent] = useState(activeSection);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (activeSection === current) return;
    setFading(true);
    const t = setTimeout(() => {
      setCurrent(activeSection);
      setFading(false);
    }, 200);
    return () => clearTimeout(t);
  }, [activeSection, current]);

  const Diagram = DIAGRAMS[current] || MiniRedisDiagram;
  const label = LABELS[current] || '';

  return (
    <div className="project-diagram hidden sm:flex bg-gray-50 p-4 sm:p-8 items-center justify-center relative overflow-hidden min-h-[240px] sm:min-h-[460px]">
      <div className="absolute top-3 right-4 font-mono text-[10px] text-gray-400 tracking-wider">
        {label}
      </div>
      <div
        className="w-full transition-opacity duration-200"
        style={{ opacity: fading ? 0 : 1 }}
      >
        <Diagram />
      </div>
    </div>
  );
}
