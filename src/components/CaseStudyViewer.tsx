import { ExternalLink } from 'lucide-react';
import projects from '../data/projects';
import type { FailureNote, ProjectStatus } from '../data/projects';

interface CaseStudyViewerProps {
  activeSection: string;
}

/** Colour map for status badges */
const statusStyles: Record<ProjectStatus, string> = {
  Active: 'bg-green-100 text-green-800 border-green-300',
  Shipped: 'bg-blue-100 text-blue-800 border-blue-300',
  Hackathon: 'bg-purple-100 text-purple-800 border-purple-300',
};

/** Colour map for language dots */
const langColors: Record<string, string> = {
  Python: 'bg-blue-500',
  Rust: 'bg-orange-700',
  JavaScript: 'bg-yellow-400',
  TypeScript: 'bg-blue-600',
};

/**
 * Renders a single failure/insight note block styled like the original
 * engineering notes — red failure box + blue/gray insight box.
 */
function FailureNoteCard({ note }: { note: FailureNote }) {
  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide border-b border-gray-200">
        {note.title}
      </div>
      {/* Failure callout */}
      <div className="bg-red-50 border-l-4 border-red-600 px-4 py-3 text-sm leading-relaxed font-mono">
        <span className="font-bold text-red-700">What failed: </span>
        {note.failure}
      </div>
      {/* Insight callout */}
      <div className="bg-blue-50 border-l-4 border-blue-600 px-4 py-3 text-sm leading-relaxed font-mono">
        <span className="font-bold text-blue-700">
          {note.insightLabel ?? 'Insight'}:{' '}
        </span>
        {note.insight}
      </div>
    </div>
  );
}

/**
 * CaseStudyViewer — displays the selected project's case study,
 * including description, technical highlights, metadata (language,
 * status, GitHub link), and integrated failure/insight notes.
 */
export default function CaseStudyViewer({ activeSection }: CaseStudyViewerProps) {
  const project = projects.find((p) => p.id === activeSection);
  if (!project) return null;
  const projectNumber = String(projects.findIndex((p) => p.id === project.id) + 1).padStart(2, '0');

  return (
    <article className="lg:col-span-9 scroll-mt-12 p-6 sm:p-8 lg:p-12" aria-labelledby="case-study-title">
      <div className="max-w-3xl space-y-6">
        {/* Title + metadata row */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-orange-600 mb-3">
            CASE STUDY / {projectNumber}
          </p>
          <h2 id="case-study-title" className="text-2xl sm:text-3xl font-bold font-mono mb-3 tracking-tight">
            {project.title}
          </h2>
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            {/* Status badge */}
            <span className={`px-2 py-0.5 border rounded-sm font-bold ${statusStyles[project.status]}`}>
              {project.status}
            </span>
            {/* Language dot + label */}
            <span className="flex items-center gap-1.5 text-gray-600">
              <span className={`w-2.5 h-2.5 rounded-full ${langColors[project.language] ?? 'bg-gray-400'}`} />
              {project.language}
            </span>
            <span className="px-2 py-0.5 border border-gray-300 text-gray-600">
              {project.focus}
            </span>
            {/* GitHub link */}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-orange-600 hover:underline"
            >
              <ExternalLink size={12} />
              Source
            </a>
          </div>
        </div>

        <p className="font-mono text-sm text-gray-700 leading-relaxed">
          {project.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 border border-black bg-gray-50">
          <div className="p-4 sm:p-5 md:border-r border-b md:border-b-0 border-black">
            <p className="font-mono text-[10px] uppercase tracking-widest text-red-700 mb-2">Problem</p>
            <p className="font-sans text-sm leading-relaxed text-gray-800">{project.problem}</p>
          </div>
          <div className="p-4 sm:p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-blue-700 mb-2">Decision</p>
            <p className="font-sans text-sm leading-relaxed text-gray-800">{project.decision}</p>
          </div>
        </div>

        <div className="border-l-4 border-orange-600 bg-orange-50 px-4 py-3 font-mono text-xs leading-relaxed">
          <span className="font-bold text-orange-700">Evidence boundary: </span>
          {project.proof}
          <div className="mt-2 text-[10px] text-gray-500">
            Source map: {project.sourcePath}
          </div>
        </div>

        <div>
          <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">
            Design surface
          </h3>
          <ul className="list-disc list-inside font-mono text-sm space-y-2 marker:text-orange-600">
          {project.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
          </ul>
        </div>

        {/* Failure notes — integrated from the original Engineering Notes */}
        {project.failureNotes && project.failureNotes.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-gray-500">
              Engineering Notes
            </h3>
            {project.failureNotes.map((note, i) => (
              <FailureNoteCard key={i} note={note} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
