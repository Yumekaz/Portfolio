import { ArrowDown, ArrowUpLeft, ArrowUpRight } from "lucide-react";
import Sidebar from "./Sidebar";
import CaseStudyViewer from "./CaseStudyViewer";
import Artwork from "./Artwork";
import Footer from "./Footer";
import { siteUrl } from "../lib/paths";

export default function ProjectsPage({
  activeSection,
  onSelect,
  reducedMotion,
}: {
  activeSection: string;
  onSelect: (id: string) => void;
  reducedMotion: boolean;
}) {
  return (
    <>
      <section className="collection-intro" aria-labelledby="collection-title">
        <div className="edition-rail">
          <a href={siteUrl()}>
            <ArrowUpLeft size={14} /> Back to home
          </a>
          <span>THE WORK / VOL. 03</span>
          <span>01 — 08</span>
        </div>
        <div className="collection-intro-body">
          <div>
            <p className="eyebrow">A COLLECTION OF SYSTEMS & THEIR LIMITS</p>
            <h1 id="collection-title">
              Built to be
              <br />
              <em>questioned.</em>
            </h1>
            <p>
              Eight systems. Different constraints.
              <br />
              The decisions, failures, and evidence behind the work.
            </p>
            <a href="#project-directory" className="edition-link">
              Open the collection <ArrowDown size={18} />
            </a>
          </div>
          <div className="collection-fan" aria-hidden="true">
            <div className="fan-card fan-one">
              <Artwork name="storage" eager />
              <span>02 / CONSISTENCY</span>
            </div>
            <div className="fan-card fan-two">
              <Artwork name="failforge" eager />
              <span>03 / FAILURE</span>
            </div>
            <div className="fan-card fan-three">
              <Artwork name="coordination" eager />
              <span>01 / COORDINATION</span>
            </div>
          </div>
        </div>
        <div className="collection-foot">
          <span>DISTRIBUTED SYSTEMS → RUNTIMES → REPRODUCIBILITY</span>
          <span>
            Build. Break. Understand. <ArrowUpRight size={14} />
          </span>
        </div>
      </section>
      <section
        id="project-directory"
        className="dossier-layout"
        aria-label="Project collection"
      >
        <Sidebar activeSection={activeSection} onSelect={onSelect} />
        <CaseStudyViewer
          key={activeSection}
          activeSection={activeSection}
          onSelect={onSelect}
          reducedMotion={reducedMotion}
        />
      </section>
      <Footer />
    </>
  );
}
