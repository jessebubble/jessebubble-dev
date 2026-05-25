export default function SectionAbout() {
  return (
    <section
      id="about"
      className="w-full px-6 sm:px-12 py-24 sm:py-32 bg-background border-t border-border"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-baseline gap-3 mb-10">
          <span className="font-mono text-[10px] tracking-widest uppercase text-rose/70">
            ▸ about
          </span>
          <span className="font-mono text-[10px] text-foreground/30">
            // who is jessebubble
          </span>
        </div>

        <h2 className="font-pixel text-3xl sm:text-4xl xl:text-5xl text-foreground tracking-tight leading-tight mb-8">
          Software Developer &<br />
          <span className="text-rose">Ecosystem Architect.</span>
        </h2>

        <div className="space-y-5 text-base sm:text-lg text-foreground/70 leading-relaxed">
          <p>
            San Antonio native and full-stack web developer. I design
            custom browser experiences backed by real APIs, bridging
            creative strategy and high-stakes deployment — deepening local
            connection through <span className="text-foreground font-medium">DEVSA</span>{' '}
            while engineering the custom workflows and striking interfaces
            that power brand storytelling at <span className="text-foreground font-medium">434 MEDIA</span>.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-6">
          {(
            [
              { label: 'based', value: 'San Antonio, TX' },
              { label: 'role', value: 'Founder & Dev' },
              { label: 'stack', value: 'Claude · Next · Firebase' },
              {
                label: 'status',
                value: 'Open to work',
                href: 'https://calendar.app.google/GGGGQiP9rCG4wtk79',
                hint: 'book a 30-min call',
              },
            ] as { label: string; value: string; href?: string; hint?: string }[]
          ).map((f) => (
            <div key={f.label}>
              <span className="font-mono text-[10px] tracking-widest uppercase text-foreground/40 block mb-1.5">
                {f.label}
              </span>
              {f.href ? (
                <a
                  href={f.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group font-mono text-xs sm:text-sm text-foreground hover:text-rose transition-colors inline-flex flex-col gap-0.5"
                  aria-label={f.hint ? `${f.value} — ${f.hint}` : f.value}
                >
                  <span className="inline-flex items-baseline gap-1">
                    {f.value}
                    <span className="text-rose/70 group-hover:text-rose text-[10px]">
                      ↗
                    </span>
                  </span>
                  {f.hint && (
                    <span className="text-[9px] tracking-widest uppercase text-foreground/40 group-hover:text-rose/70 transition-colors">
                      {f.hint}
                    </span>
                  )}
                </a>
              ) : (
                <span className="font-mono text-xs sm:text-sm text-foreground">
                  {f.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
