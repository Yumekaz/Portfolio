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
            DEPTH.<br />CORRECTNESS.<br />OBSERVABILITY.
          </h1>
          <p className="font-mono text-xs text-gray-500 mb-6 max-w-md">
            Mihir Swarnkar · BTech CSE · India
          </p>
          <p className="font-mono text-sm text-gray-600 mb-8 max-w-md">
            {'>'} I break systems on purpose to understand how they fail — then
            build them back with evidence. Container runtimes, distributed storage,
            coordination services, deterministic debuggers, compiler correctness labs.
          </p>
        </div>

        {/* Tech domains — each tied to a real project */}
        <div className="grid grid-cols-2 gap-px bg-black font-mono text-[11px]">
          <div className="bg-white p-3">
            <div className="font-bold mb-1">Linux Internals</div>
            <div className="text-gray-500">namespaces · cgroups · seccomp</div>
          </div>
          <div className="bg-white p-3">
            <div className="font-bold mb-1">Distributed Systems</div>
            <div className="text-gray-500">raft · gossip · quorum writes</div>
          </div>
          <div className="bg-white p-3">
            <div className="font-bold mb-1">Compiler Correctness</div>
            <div className="text-gray-500">bytecode · fuzzing · JIT equiv</div>
          </div>
          <div className="bg-white p-3">
            <div className="font-bold mb-1">Deterministic Debugging</div>
            <div className="text-gray-500">record/replay · drift detection</div>
          </div>
          <div className="bg-white p-3">
            <div className="font-bold mb-1">Languages</div>
            <div className="text-orange-600 font-bold">Python · Rust · TypeScript</div>
          </div>
          <div className="bg-white p-3">
            <div className="font-bold mb-1">Infra</div>
            <div className="text-orange-600 font-bold">WebAssembly · gRPC · OverlayFS</div>
          </div>
        </div>
      </div>

      {/* Right column — per-project animated architecture diagram */}
      <ProjectDiagram activeSection={activeSection} />
    </section>
  );
}
