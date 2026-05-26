const FOCUS = [
  {
    label: 'Design',
    body: 'Making the web feel intentional, not incidental, by using UI and the browser to tell stories — Editorial typography and scroll-based design fundamentals.',
  },
  {
    label: 'Workflows',
    body: 'Streamlined, real-world transactions — partner pipelines, content systems, event ops, and custom auth. Modular systems that compound into shipped outcomes.',
  },
  {
    label: 'Agents',
    body: 'Wrapping workflows in autonomous loops — compressing weeks of execution into hours. Built with Claude, MCP, and small, composable tools that do real work.',
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
          Stories. Transactions. Loops.
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
