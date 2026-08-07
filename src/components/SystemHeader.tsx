/**
 * SystemHeader — sticky top bar with system‑status aesthetic.
 * Purely decorative — the mem/load values are design elements,
 * not performance claims.
 */
export default function SystemHeader() {
  return (
    <header className="border-b border-black flex justify-between items-center px-4 py-2 font-mono text-xs uppercase tracking-widest sticky top-0 bg-white z-50">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-orange-600 rounded-full" />
          Distributed Systems / Engineering Notes
        </span>
        <span className="hidden md:inline text-gray-500">Region: Asia/Kolkata</span>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-orange-600 font-bold">Role: Distributed Backend Engineer</span>
      </div>
    </header>
  );
}
