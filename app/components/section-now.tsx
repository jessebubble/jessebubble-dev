const FOCUS = [
  {
    label: 'Design',
    body: 'Visual systems and interfaces that feel inevitable. Editorial typography, considered motion, and brand-first product UI that respects the work it carries.',
  },
  {
    label: 'Workflows',
    body: 'Internal tooling and admin dashboards that turn operational chaos into shipped outcomes — partner pipelines, content systems, event ops, custom auth.',
  },
  {
    label: 'Agents',
    body: 'Practical agent workflows that compress weeks of execution into hours. Building with Claude, MCP, and small composable tools that do real work.',
  },
];

export default function SectionNow() {
  return (
    <section
      id="now"
      className="w-full px-6 sm:px-12 py-24 sm:py-32 bg-surface border-t border-border"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-baseline gap-3 mb-10">
          <span className="font-mono text-[10px] tracking-widest uppercase text-rose/70">
            ▸ now
          </span>
          <span className="font-mono text-[10px] text-foreground/30">
            // current focus
          </span>
        </div>

        <h2 className="font-pixel text-3xl sm:text-4xl xl:text-5xl text-foreground tracking-tight leading-tight mb-16 sm:mb-20 max-w-3xl">
          Actively building and learning across:
        </h2>

        <div className="grid gap-10 sm:gap-12 sm:grid-cols-3">
          {FOCUS.map((f, i) => (
            <div key={f.label} className="border-t border-rose/30 pt-6">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-mono text-xs text-rose/60">
                  0{i + 1}
                </span>
                <h3 className="font-pixel text-xl sm:text-2xl text-foreground tracking-tight">
                  {f.label}
                </h3>
              </div>
              <p className="text-sm sm:text-[15px] text-foreground/60 leading-relaxed">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
