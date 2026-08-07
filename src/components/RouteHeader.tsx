interface RouteHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function RouteHeader({ eyebrow, title, description }: RouteHeaderProps) {
  return (
    <section className="border-b border-black bg-gray-50">
      <div className="p-6 sm:p-8 lg:p-10">
        <a
          href="/"
          className="inline-flex font-mono text-[10px] uppercase tracking-widest text-orange-600 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-600 mb-6"
        >
          ← Return to homepage
        </a>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">
          {eyebrow}
        </p>
        <h1 className="font-mono text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          {title}
        </h1>
        <p className="font-sans text-sm text-gray-700 leading-relaxed max-w-3xl">
          {description}
        </p>
      </div>
    </section>
  );
}
