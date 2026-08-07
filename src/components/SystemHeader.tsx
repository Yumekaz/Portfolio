/**
 * SystemHeader — sticky navigation for the public portfolio routes.
 */
const navItems = [
  ['/projects/', 'Projects', 'projects'],
  ['/notes/', 'Notes', 'notes'],
  ['/other-work/', 'Other work', 'other-work'],
  ['/#contact', 'Contact', 'contact'],
] as const;

interface SystemHeaderProps {
  activeRoute: string;
}

export default function SystemHeader({ activeRoute }: SystemHeaderProps) {
  const linkClass = (route: string) => route === activeRoute
    ? 'text-black font-bold border-b-2 border-orange-600 pb-1'
    : 'text-gray-500 hover:text-orange-600';

  return (
    <header className="border-b border-black flex flex-wrap justify-between items-center gap-x-4 gap-y-2 px-4 py-2 font-mono text-xs uppercase tracking-widest sticky top-0 bg-white z-50">
      <div className="flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 hover:text-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-600">
          <span className="w-2 h-2 bg-orange-600 rounded-full" />
          Distributed Systems / Engineering Notes
        </a>
        <span className="hidden md:inline text-gray-500">Region: Asia/Kolkata</span>
      </div>
      <div className="w-full lg:w-auto min-w-0 flex flex-wrap items-center justify-between lg:justify-end gap-x-6 gap-y-2">
        <span className="text-orange-600 font-bold whitespace-normal">Role: Distributed Backend Engineer</span>
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-4 text-[10px] tracking-normal">
          {navItems.map(([href, label, route]) => (
            <a key={href} href={href} aria-current={activeRoute === route ? 'page' : undefined} className={`${linkClass(route)} focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-600`}>{label}</a>
          ))}
        </nav>
      </div>
      <nav aria-label="Mobile navigation" className="flex lg:hidden w-full items-center gap-5 overflow-x-auto border-t border-gray-200 pt-2 text-[10px] tracking-normal whitespace-nowrap">
        {navItems.map(([href, label, route]) => (
          <a key={href} href={href} aria-current={activeRoute === route ? 'page' : undefined} className={`${linkClass(route)} focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-600`}>{label}</a>
        ))}
      </nav>
    </header>
  );
}
