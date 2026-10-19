import { ArrowDown, ArrowUpLeft, ArrowUpRight } from "lucide-react";
import CaseStudyViewer from "./CaseStudyViewer";
import ProjectAtlas from "./ProjectAtlas";
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
              Every system.
              <br />
              <em>A breaking point.</em>
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
        </div>
        <ProjectAtlas onSelect={onSelect} />
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
