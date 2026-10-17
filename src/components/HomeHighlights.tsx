import { ArrowUpRight, Network, Database, Workflow } from "lucide-react";
import projects from "../data/projects";
import engineeringNotes from "../data/engineeringNotes";
import { siteUrl } from "../lib/paths";
const icons = [Network, Database, Workflow];

export default function HomeHighlights({
  onFocusProject,
}: {
  onFocusProject: (id: string) => void;
}) {
  return (
    <>
      <section id="selected-work" className="selected-work section-space">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">01 / SELECTED WORK</p>
            <h2>Systems with a story.</h2>
          </div>
          <p>
            Built to ask difficult questions.
            <br />
            Documented so you can inspect the answers.
          </p>
        </div>
        <div className="project-cards">
          {projects.slice(0, 3).map((project, index) => {
            const Icon = icons[index];
            return (
              <a
                key={project.id}
                className="project-card"
                data-reveal
                href={siteUrl(`projects/#${project.id}`)}
                onMouseEnter={() => onFocusProject(project.id)}
                onFocus={() => onFocusProject(project.id)}
              >
                <div className="project-card-top">
                  <span className="project-number">0{index + 1}</span>
                  <Icon size={30} strokeWidth={1.2} />
                  <ArrowUpRight className="card-arrow" size={21} />
                </div>
                <div className="project-card-body">
                  <p className="eyebrow">{project.focus}</p>
                  <h3>{project.name}</h3>
                  <p className="project-problem">{project.problem}</p>
                </div>
                <div className="project-card-footer">
                  <span>
                    {project.language} / {project.status}
                  </span>
                  <span>
                    Case study <ArrowUpRight size={14} />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
        <div className="section-end" data-reveal>
          <span>
            From coordination to correctness. Every claim has a source.
          </span>
          <a className="text-link" href={siteUrl("projects/")}>
            All {projects.length} case studies <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
      <section className="home-notes section-space">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">02 / FIELD NOTES</p>
            <h2>
              The interesting part?
              <br />
              <span className="muted-heading">What went wrong.</span>
            </h2>
          </div>
          <p>
            Failure, a design decision, and what remains unproven. Notes from
            the engineering process.
          </p>
        </div>
        <div className="note-teasers">
          {engineeringNotes.slice(0, 3).map((note, index) => (
            <a
              key={note.id}
              href={siteUrl(`notes/#${note.id}`)}
              className="note-teaser"
              data-reveal
            >
              <span className="note-index">0{index + 1}</span>
              <div>
                <p className="eyebrow">{note.category}</p>
                <h3>{note.title}</h3>
                <p className="note-project">{note.project}</p>
              </div>
              <ArrowUpRight size={22} />
            </a>
          ))}
        </div>
        <a href={siteUrl("notes/")} className="text-link notes-all" data-reveal>
          Open the notebook <ArrowUpRight size={17} />
        </a>
      </section>
    </>
  );
}
