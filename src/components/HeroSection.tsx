/**
 * HeroSection — the "DEPTH / CORRECTNESS / OBSERVABILITY" intro with
 * the bio text on the left and a per-project animated architecture
 * diagram on the right that updates when the user selects a project.
 */
import ProjectDiagram from './ProjectDiagram';

interface HeroSectionProps {
  activeSection: string;
}

export default function HeroSection({ activeSection }: HeroSectionProps) {
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

      {/* Right column — per-project animated architecture diagram */}
      <ProjectDiagram activeSection={activeSection} />
    </section>
  );
}
