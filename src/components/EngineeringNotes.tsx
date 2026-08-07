import engineeringNotes from '../data/engineeringNotes';

export default function EngineeringNotes() {
  return (
    <section className="scroll-mt-12 border-t border-black bg-white" id="engineering-notes" data-reveal>
      <div className="grid grid-cols-1 lg:grid-cols-4 border-b border-black">
        <div className="p-8 lg:p-10 lg:border-r border-black bg-gray-50">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-orange-600 mb-3">
            ENGINEERING NOTES / 01
          </p>
          <h2 className="font-mono text-2xl font-bold tracking-tight mb-4">
            What broke, what changed, and what remains true.
          </h2>
          <p className="font-mono text-xs text-gray-600 leading-relaxed">
            These are short arguments extracted from design documents and
            postmortems. Each note names a failure, the decision that followed,
            and the boundary that keeps the claim honest.
          </p>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2">
          {engineeringNotes.map((note, index) => (
            <article
              key={note.id}
              className={`group p-6 lg:p-8 transition-colors hover:bg-orange-50 focus-within:bg-orange-50 ${index % 2 === 0 ? 'md:border-r' : ''} border-b border-black`}
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-orange-600">
                  {note.category}
                </span>
                <span className="font-mono text-[10px] text-gray-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="font-mono text-lg font-bold leading-snug mb-2 transition-colors group-hover:text-orange-700">
                {note.title}
              </h3>
              <p className="font-mono text-[10px] text-gray-500 mb-5">
                {note.project}
              </p>

              <div className="space-y-3 font-sans text-sm leading-relaxed">
                <p className="border-l-2 border-red-600 pl-3">
                  <span className="font-bold text-red-700">Failure: </span>
                  {note.failure}
                </p>
                <p className="border-l-2 border-blue-600 pl-3">
                  <span className="font-bold text-blue-700">Decision: </span>
                  {note.decision}
                </p>
                <p className="border-l-2 border-gray-400 pl-3 text-gray-600">
                  <span className="font-bold text-gray-800">Boundary: </span>
                  {note.boundary}
                </p>
              </div>

              <a
                href={note.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-5 font-mono text-[10px] text-orange-600 hover:underline"
              >
                {note.sourceLabel} →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
