import { ArrowUpRight } from "lucide-react";
import projects from "../data/projects";
import { siteUrl } from "../lib/paths";

export default function Sidebar({
  activeSection,
  onSelect,
}: {
  activeSection: string;
  onSelect: (id: string) => void;
}) {
  return (
    <aside className="collection-sidebar">
      <div className="collection-sidebar-inner">
        <p className="eyebrow">
          THE COLLECTION <span>08</span>
        </p>
        <nav className="dossier-index" aria-label="Select a case study">
          {projects.map((project, index) => (
            <a
              key={project.id}
              href={siteUrl(`projects/#${project.id}`)}
              onClick={(event) => {
                event.preventDefault();
                onSelect(project.id);
              }}
              aria-current={activeSection === project.id ? "true" : undefined}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>
                {project.name}
                <small>{project.focus}</small>
              </span>
              <ArrowUpRight size={14} />
            </a>
          ))}
        </nav>
        <label className="mobile-case-picker">
          Choose a case study
          <select
            value={activeSection}
            onChange={(event) => onSelect(event.target.value)}
          >
            {projects.map((project, i) => (
              <option key={project.id} value={project.id}>
                {String(i + 1).padStart(2, "0")} / {project.name}
              </option>
            ))}
          </select>
        </label>
        <div className="index-footnote">
          <span className="index-rule" />
          Claims have boundaries.
          <br />
          Every dossier keeps them visible.
        </div>
        <a href={siteUrl("notes/")} className="index-journal-link">
          Read the field journal <ArrowUpRight size={15} />
        </a>
      </div>
    </aside>
  );
}
