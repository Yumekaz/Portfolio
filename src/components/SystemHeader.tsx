import { ArrowUpRight, Menu, X, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { siteUrl } from "../lib/paths";

const navItems = [
  ["projects/", "Work", "projects"],
  ["notes/", "Field notes", "notes"],
  ["other-work/", "Explorations", "other-work"],
] as const;

interface Props {
  activeRoute: string;
  reducedMotion: boolean;
  systemReduced: boolean;
  onToggleMotion: () => void;
}

export default function SystemHeader({
  activeRoute,
  reducedMotion,
  systemReduced,
  onToggleMotion,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    if (menuOpen) window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a
          href={siteUrl()}
          className="identity"
          aria-label="Mihir Swarnkar, homepage"
        >
          <span className="monogram">
            ms<span>.</span>
          </span>
          <span className="identity-copy">
            Mihir Swarnkar<span>Distributed systems engineer</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([href, label, route]) => (
            <a
              key={route}
              href={siteUrl(href)}
              aria-current={activeRoute === route ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            type="button"
            className="motion-toggle"
            onClick={onToggleMotion}
            disabled={systemReduced}
            aria-label={
              systemReduced
                ? "Reduced motion enabled by your device"
                : reducedMotion
                  ? "Enable animations"
                  : "Pause animations"
            }
            title={
              systemReduced
                ? "Reduced motion follows your device setting"
                : reducedMotion
                  ? "Enable animations"
                  : "Pause animations"
            }
          >
            {reducedMotion ? <Play size={15} /> : <Pause size={15} />}
          </button>
          <a className="header-contact" href={siteUrl("#contact")}>
            Let’s talk <ArrowUpRight size={16} />
          </a>
          <button
            id="menu-toggle"
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        hidden={!menuOpen}
        aria-label="Mobile navigation"
      >
        {navItems.map(([href, label, route], index) => (
          <a
            key={route}
            href={siteUrl(href)}
            aria-current={activeRoute === route ? "page" : undefined}
          >
            <span>0{index + 1}</span>
            {label}
            <ArrowUpRight size={18} />
          </a>
        ))}
        <a href={siteUrl("#contact")} onClick={() => setMenuOpen(false)}>
          <span>04</span>Contact
          <ArrowUpRight size={18} />
        </a>
      </nav>
    </header>
  );
}
