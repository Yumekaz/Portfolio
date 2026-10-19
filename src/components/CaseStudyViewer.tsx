import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Plus, Minus } from "lucide-react";
import projects from "../data/projects";
import engineeringNotes from "../data/engineeringNotes";
import { projectPresentation } from "../data/projectPresentation";
import { siteUrl } from "../lib/paths";
import Artwork from "./Artwork";
import SystemStory from "./SystemStory";
import { systemStories } from "../data/systemStories";
import KernelLog from "./KernelLog";
import CaseCover from "./CaseCover";
import Sidebar from "./Sidebar";

interface Props {
  activeSection: string;
  onSelect: (id: string) => void;
  reducedMotion: boolean;
}
export default function CaseStudyViewer({
  activeSection,
  onSelect,
  reducedMotion,
}: Props) {
  const [activityOpen, setActivityOpen] = useState(false);
  const index = projects.findIndex((p) => p.id === activeSection);
  const project = projects[index];
  if (!project) return null;
  const visual = projectPresentation[project.id];
  const story = systemStories[project.id];
  const next = projects[(index + 1) % projects.length];
  const related = engineeringNotes.filter((note) =>
    visual.notes.includes(note.id),
  );
  const jump = (part: string) =>
    document.getElementById(`${project.id}-${part}`)?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  return (
    <article
      id={project.id}
      className={`dossier theme-${visual.theme}`}
      aria-labelledby="dossier-title"
    >
      <CaseCover
        project={project}
        index={index}
        onEnter={() => jump("overview")}
      />
      <div className="case-reading-layout">
        <Sidebar activeSection={activeSection} onSelect={onSelect} />
        <div className="case-reading-content">
          <nav className="dossier-chapters" aria-label="Case study chapters">
            <button onClick={() => jump("overview")}>
              01 <span>Overview</span>
            </button>
            <button onClick={() => jump("architecture")}>
              02 <span>How it works</span>
            </button>
            <button onClick={() => jump("decisions")}>
              03 <span>Design</span>
            </button>
            <button onClick={() => jump("evidence")}>
              04 <span>Evidence</span>
            </button>
            <ArrowDown size={16} />
          </nav>
          <div className="dossier-body">
            <section
              id={`${project.id}-overview`}
              className="dossier-overview"
              data-reveal
            >
              <p className="eyebrow">01 / THE QUESTION</p>
              <h3>{project.title}</h3>
              <p className="dossier-description">{project.description}</p>
              <div className="decision-pair">
                <div>
                  <span>THE TENSION</span>
                  <p>{project.problem}</p>
                </div>
                <div>
                  <span>THE CHOICE</span>
                  <p>{project.decision}</p>
                </div>
              </div>
            </section>
            <section
              id={`${project.id}-architecture`}
              className="dossier-architecture"
              data-reveal
            >
              <SystemStory project={project.id} reducedMotion={reducedMotion} />
            </section>
            <section
              id={`${project.id}-decisions`}
              className="dossier-design"
              data-reveal
            >
              <p className="eyebrow">03 / DESIGN SURFACE</p>
              <h3>{story.decisionsTitle}</h3>
              <ol>
                {project.highlights.map((highlight, i) => (
                  <li key={highlight}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <p>{highlight}</p>
                    <ArrowUpRight size={18} />
                  </li>
                ))}
              </ol>
            </section>
            {project.failureNotes?.length ? (
              <section className="dossier-lessons" data-reveal>
                <p className="eyebrow">FROM THE FAILURE RECORD</p>
                {project.failureNotes.map((note, i) => (
                  <div className="lesson-spread" key={note.title}>
                    <div className="lesson-heading">
                      <span>F{String(i + 1).padStart(2, "0")}</span>
                      <h3>{note.title}</h3>
                    </div>
                    <div className="lesson-columns">
                      <div>
                        <h4>What failed</h4>
                        <p>{note.failure}</p>
                      </div>
                      <div>
                        <h4>{note.insightLabel ?? "Insight"}</h4>
                        <p>{note.insight}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            ) : null}
            <section
              id={`${project.id}-evidence`}
              className="dossier-evidence"
              data-reveal
            >
              <div className="evidence-mark" aria-hidden="true">
                ↳
              </div>
              <div>
                <p className="eyebrow">04 / WHAT THE EVIDENCE SUPPORTS</p>
                <h3>{story.evidenceTitle}</h3>
                <div className="evidence-facts">
                  {story.facts.map((fact) => (
                    <div key={fact.value}>
                      <strong>{fact.value}</strong>
                      <span>{fact.label}</span>
                    </div>
                  ))}
                </div>
                <p className="evidence-proof">{project.proof}</p>
                <p className="source-map">
                  <span>REPOSITORY SOURCE MAP</span>
                  {project.sourcePath}
                </p>
                <a
                  href={story.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="edition-link"
                >
                  {story.sourceLabel} <ArrowUpRight size={18} />
                </a>
              </div>
            </section>
            {related.length > 0 && (
              <section className="dossier-related" data-reveal>
                <p className="eyebrow">KEEP READING / FIELD JOURNAL</p>
                {related.map((note) => (
                  <a href={siteUrl(`notes/#${note.id}`)} key={note.id}>
                    <span>{note.category}</span>
                    <h3>{note.title}</h3>
                    <ArrowUpRight size={25} />
                  </a>
                ))}
              </section>
            )}
            <section className="dossier-activity">
              <button
                aria-expanded={activityOpen}
                aria-controls="repository-activity"
                onClick={() => setActivityOpen((value) => !value)}
              >
                <span>
                  From the repository
                  <small>Recent commit activity · GitHub</small>
                </span>
                {activityOpen ? <Minus size={20} /> : <Plus size={20} />}
              </button>
              <div id="repository-activity" hidden={!activityOpen}>
                {activityOpen && <KernelLog activeSection={project.id} />}
              </div>
            </section>
          </div>
          <button className="next-dossier" onClick={() => onSelect(next.id)}>
            <div>
              <span className="eyebrow">
                NEXT IN THE COLLECTION /{" "}
                {String(((index + 1) % projects.length) + 1).padStart(2, "0")}
              </span>
              <strong>{next.name}</strong>
              <span>{next.focus}</span>
            </div>
            <Artwork name={projectPresentation[next.id].art} sizes="220px" />
            <ArrowRight size={38} strokeWidth={1.2} />
          </button>
        </div>
      </div>
    </article>
  );
}
