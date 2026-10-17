import { ArrowDown, ArrowUpRight } from "lucide-react";
import HomepageSystemMap from "./HomepageSystemMap";
import { siteUrl } from "../lib/paths";

interface Props {
  activeSection: string;
  onFocusProject: (id: string) => void;
}

export default function HeroSection({ activeSection, onFocusProject }: Props) {
  return (
    <section className="hero">
      <div className="hero-intro">
        <p className="eyebrow hero-eyebrow">
          <span className="signal-dot" /> INDEPENDENT ENGINEERING / INDIA
        </p>
        <h1 className="hero-title">
          <span>Distributed.</span>
          <span>Correct.</span>
          <span className="accent-word">
            Observable<span className="title-period">.</span>
          </span>
        </h1>
        <p className="hero-description">
          I build distributed backend systems — and explore what happens{" "}
          <em>when they break.</em>
        </p>
        <p className="hero-detail">
          Replication, consistency, coordination, and recovery. Built with
          explicit boundaries. Tested against failure.
        </p>
        <div className="hero-actions">
          <a href={siteUrl("projects/")} className="button button-primary">
            Explore the work <ArrowUpRight size={18} />
          </a>
          <a href={siteUrl("notes/")} className="text-link">
            Read the field notes <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="hero-footnote">
          <span>BTech CSE</span>
          <span className="small-rule" />
          <span>Code. Question. Understand.</span>
        </div>
      </div>
      <div className="hero-visual">
        <HomepageSystemMap
          activeSection={activeSection}
          onSelect={onFocusProject}
        />
      </div>
      <div className="hero-bottom">
        <a href="#selected-work">
          <ArrowDown size={15} /> Scroll to explore
        </a>
        <span>REPLICATION / CONSISTENCY / RECOVERY</span>
        <span>PORTFOLIO — 01</span>
      </div>
    </section>
  );
}
