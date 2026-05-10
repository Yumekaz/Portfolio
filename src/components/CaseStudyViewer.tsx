import projects from '../data/projects';
import type { FailureNote } from '../data/projects';

interface CaseStudyViewerProps {
  activeSection: string;
}

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
 * including description, technical highlights, and integrated
 * failure/insight notes where they exist.
 */
export default function CaseStudyViewer({ activeSection }: CaseStudyViewerProps) {
  const project = projects.find((p) => p.id === activeSection);
  if (!project) return null;

  return (
    <article className="lg:col-span-9 p-8 lg:p-12">
      <div className="max-w-3xl space-y-6">
        <h2 className="text-3xl font-bold font-mono mb-2 tracking-tight">
          {project.title}
        </h2>

        <p className="font-mono text-sm text-gray-700 leading-relaxed">
          {project.description}
        </p>

        <ul className="list-disc list-inside font-mono text-sm space-y-2 marker:text-orange-600">
          {project.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>

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
