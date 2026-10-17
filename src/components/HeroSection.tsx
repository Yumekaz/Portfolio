import { ArrowDown, ArrowUpRight } from "lucide-react";
import FailureLab from "./FailureLab";
import { siteUrl } from "../lib/paths";

export default function HeroSection() {
  return (
    <section className="signature-hero">
      <div className="hero-kicker">
        <span className="eyebrow">MIHIR SWARNKAR / DISTRIBUTED SYSTEMS</span>
        <span className="eyebrow">BASED IN INDIA · BUILDING WITH INTENT</span>
      </div>
      <div className="signature-heading">
        <h1>
          <span>Built for the</span>
          <span className="breaking-line">
            breaking point<span className="hero-stop">.</span>
          </span>
        </h1>
        <div className="signature-intro">
          <p>
            I build backend systems.
            <br />
            Then I find their limits.
          </p>
          <span>
            Replication. Consistency. Recovery.
            <br />
            The interesting work starts when
            <br className="desktop-break" /> things stop going to plan.
          </span>
          <a className="text-link" href={siteUrl("projects/")}>
            Explore my work <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
      <FailureLab />
      <div className="signature-caption">
        <a href="#selected-work">
          <ArrowDown size={14} /> FROM THE EXPERIMENT TO THE EVIDENCE
        </a>
        <span>SCROLL TO INSPECT THE WORK</span>
      </div>
    </section>
  );
}
