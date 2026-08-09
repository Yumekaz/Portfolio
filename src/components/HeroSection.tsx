/**
 * HeroSection — the "DISTRIBUTED / CORRECT / OBSERVABLE" intro with
 * the bio text on the left and an interactive flagship system map on the
 * right. Detailed per-project architecture diagrams remain on /projects/.
 */
import HomepageSystemMap from './HomepageSystemMap';

interface HeroSectionProps {
  activeSection: string;
  onFocusProject: (id: string) => void;
}

export default function HeroSection({ activeSection, onFocusProject }: HeroSectionProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-black">
      {/* Left column — mantra, bio & I/O flow */}
      <div className="p-8 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-black">
        <div>
          <h1 className="font-mono text-4xl md:text-5xl font-bold tracking-tighter leading-none mb-4">
            DISTRIBUTED.<br />CORRECT.<br />OBSERVABLE.
          </h1>
          <p className="font-mono text-xs text-gray-500 mb-6 max-w-md">
            Mihir Swarnkar · BTech CSE · India
          </p>
          <p className="font-mono text-sm text-gray-600 mb-8 max-w-md">
            {'>'} I build and test distributed backend systems that remain
            understandable when nodes fail — replication, coordination,
            consistency trade-offs, and recovery paths.
          </p>
          <div className="flex flex-wrap gap-3 font-mono text-xs">
            <a
              href="/projects/"
              className="bg-black px-3 py-2 text-white transition-colors hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Explore case studies →
            </a>
            <a
              href="/notes/"
              className="border border-black px-3 py-2 text-black transition-colors hover:bg-orange-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Read the failures
            </a>
          </div>
        </div>

        {/* Tech domains — each tied to a real project */}
        <div className="grid grid-cols-2 gap-px bg-black font-mono text-[11px]">
          <div className="bg-white p-3">
            <div className="font-bold mb-1">Replication</div>
            <div className="text-gray-500">leaders · replicas · commit paths</div>
          </div>
          <div className="bg-white p-3">
            <div className="font-bold mb-1">Consistency</div>
            <div className="text-gray-500">quorums · stale reads · invariants</div>
          </div>
          <div className="bg-white p-3">
            <div className="font-bold mb-1">Failure Testing</div>
            <div className="text-gray-500">fault schedules · checkers · DDMin</div>
          </div>
          <div className="bg-white p-3">
            <div className="font-bold mb-1">Recovery</div>
            <div className="text-gray-500">crash recovery · leases · rollback</div>
          </div>
          <div className="bg-white p-3">
            <div className="font-bold mb-1">Correctness</div>
            <div className="text-orange-600 font-bold">traces · oracles · replay</div>
          </div>
          <div className="bg-white p-3">
            <div className="font-bold mb-1">Adjacent Systems</div>
            <div className="text-orange-600 font-bold">Go · Rust · Linux · ML</div>
          </div>
        </div>
      </div>

      {/* Right column — interactive map of the flagship engineering lane */}
      <HomepageSystemMap activeSection={activeSection} onSelect={onFocusProject} />
    </section>
  );
}
