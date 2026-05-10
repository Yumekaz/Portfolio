/**
 * KernelLog — "Today I Learned" micro‑section that lives in the sidebar.
 * Update entries whenever you pick up a notable insight.
 */
export default function KernelLog() {
  const entries = [
    { date: '04/05', text: 'Ergonomics of Linux namespaces' },
    { date: '03/22', text: 'Deterministic replay drift detection' },
    { date: '02/14', text: 'Fuzzing bytecode verifiers' },
  ];

  return (
    <div className="p-4 mt-8">
      <div className="font-mono text-xs font-bold mb-2">KERNEL LOG (Today I Learned)</div>
      <ul className="font-mono text-[10px] space-y-2 text-gray-600">
        {entries.map((entry, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-gray-400">{entry.date}</span>
            <span>{entry.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
