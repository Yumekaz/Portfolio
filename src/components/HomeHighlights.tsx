import projects from '../data/projects';

const featuredProjects = projects.slice(0, 3);

export default function HomeHighlights() {
  return (
    <section className="border-t border-black" data-reveal>
      <div className="grid grid-cols-1 lg:grid-cols-4 border-b border-black">
        <div className="p-6 sm:p-8 lg:p-10 lg:border-r border-black bg-gray-50">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-orange-600 mb-3">
            START HERE / 03 SYSTEMS
          </p>
          <h2 className="font-mono text-2xl font-bold tracking-tight mb-4">
            The work behind the claim.
          </h2>
          <p className="font-sans text-sm text-gray-600 leading-relaxed">
            Three projects establish the lane quickly: coordination, storage
            consistency, and deterministic failure testing.
          </p>
          <a
            href="/projects/"
            className="inline-block mt-6 font-mono text-xs text-orange-600 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-600"
          >
            View all project dossiers →
          </a>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <a
              key={project.id}
              href={`/projects/#${project.id}`}
              className={`group p-6 lg:p-8 border-b md:border-b-0 border-black hover:bg-orange-50 transition-colors focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-orange-600 ${index < 2 ? 'md:border-r' : ''}`}
            >
              <div className="flex items-center justify-between gap-3 mb-5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-orange-600">
                  {project.focus}
                </span>
                <span className="font-mono text-[10px] text-gray-400">
                  0{index + 1}
                </span>
              </div>
              <h3 className="font-mono text-lg font-bold leading-snug mb-4 group-hover:text-orange-700">
                {project.name}
              </h3>
              <p className="font-sans text-sm text-gray-700 leading-relaxed mb-4">
                {project.problem}
              </p>
              <p className="font-mono text-[10px] text-gray-500 leading-relaxed">
                Decision: {project.decision}
              </p>
              <span className="inline-block mt-6 font-mono text-[10px] text-orange-600">
                Open dossier →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
