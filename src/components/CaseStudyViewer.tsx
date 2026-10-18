import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Plus, Minus } from "lucide-react";
import projects from "../data/projects";
import engineeringNotes from "../data/engineeringNotes";
import { projectPresentation } from "../data/projectPresentation";
import { siteUrl } from "../lib/paths";
import Artwork from "./Artwork";
import ProjectDiagram from "./ProjectDiagram";
import KernelLog from "./KernelLog";

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
  const [diagramLarge, setDiagramLarge] = useState(false);
  const index = projects.findIndex((p) => p.id === activeSection);
  const project = projects[index];
  if (!project) return null;
  const visual = projectPresentation[project.id];
  const number = String(index + 1).padStart(2, "0");
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
      <div className="dossier-cover">
        <div className="dossier-cover-copy">
          <p className="eyebrow">CASE STUDY / {number}</p>
          <p className="dossier-name">{project.name}</p>
          <h2 id="dossier-title">
            {visual.headline[0]}
            <br />
            <em>{visual.headline[1]}</em>
          </h2>
          <div className="dossier-metadata">
            <span>{project.language}</span>
            <span>{project.status}</span>
          </div>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="edition-link"
          >
            View source <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="dossier-cover-art">
          <Artwork name={visual.art} eager />
          <span className="dossier-art-caption">
            SCULPTURAL STUDY / {visual.material}
          </span>
          <span className="dossier-oversize" aria-hidden="true">
            {number}
          </span>
        </div>
      </div>
      <nav className="dossier-chapters" aria-label="Case study chapters">
        <button onClick={() => jump("overview")}>
          01 <span>Overview</span>
        </button>
        <button onClick={() => jump("architecture")}>
          02 <span>Architecture</span>
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
          <div className="section-caption">
            <p className="eyebrow">02 / INSIDE THE SYSTEM</p>
            <span>{project.focus}</span>
          </div>
          <div className="diagram-tools">
            <button
              aria-pressed={diagramLarge}
              onClick={() => setDiagramLarge((value) => !value)}
            >
              {diagramLarge ? "Fit diagram" : "Enlarge diagram"}
              {diagramLarge ? <Minus size={14} /> : <Plus size={14} />}
            </button>
          </div>
          <div
            className={`diagram-viewport ${diagramLarge ? "diagram-large" : ""}`}
            tabIndex={diagramLarge ? 0 : undefined}
            aria-label={
              diagramLarge
                ? "Enlarged architecture diagram, scroll horizontally to explore"
                : undefined
            }
          >
            <ProjectDiagram
              activeSection={project.id}
              reducedMotion={reducedMotion}
            />
          </div>
          <p className="diagram-boundary">
            Conceptual architecture. The source repository defines the
            implementation and its limits.
          </p>
        </section>
        <section
          id={`${project.id}-decisions`}
          className="dossier-design"
          data-reveal
        >
          <p className="eyebrow">03 / DESIGN SURFACE</p>
          <h3>
            The details carry
            <br />
            <em>the guarantee.</em>
          </h3>
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
            <h3>
              A claim needs
              <br />
              <em>a boundary.</em>
            </h3>
            <p className="evidence-proof">{project.proof}</p>
            <p className="source-map">
              <span>REPOSITORY SOURCE MAP</span>
              {project.sourcePath}
            </p>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="edition-link"
            >
              Inspect the repository <ArrowUpRight size={18} />
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
              From the repository<small>Recent commit activity · GitHub</small>
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
    </article>
  );
}
