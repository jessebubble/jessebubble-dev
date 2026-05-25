import Link from 'next/link';

const SOCIALS = [
  {
    label: 'GitHub',
    handle: '@jessebubble',
    url: 'https://github.com/jessebubble',
  },
  {
    label: 'LinkedIn',
    handle: '/in/jessebubble',
    url: 'https://www.linkedin.com/in/jessebubble',
  },
  { label: 'X', handle: '@jessebubble', url: 'https://twitter.com/jessebubble' },
  {
    label: 'Instagram',
    handle: '@jessebubble',
    url: 'https://instagram.com/jessebubble',
  },
];

export default function SectionContact() {
  return (
    <section
      id="contact"
      className="w-full px-6 sm:px-12 py-24 sm:py-32 bg-foreground text-background border-t border-border"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-baseline gap-3 mb-10">
          <span className="font-mono text-[10px] tracking-widest uppercase text-rose">
            ▸ contact
          </span>
          <span className="font-mono text-[10px] text-background/30">
            // get in touch
          </span>
        </div>

        <h2 className="font-pixel text-4xl sm:text-5xl xl:text-6xl tracking-tight leading-[0.95] mb-8">
          Find your people.<br />
          <span className="text-rose">Build your future.</span>
        </h2>

        <p className="text-base sm:text-lg text-background/60 max-w-2xl mb-12 leading-relaxed">
          Open to design partnerships, agent and workflow consulting, and
          custom build engagements with operators shipping real things.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 mb-12">
          <div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-background/40 block mb-2">
              email
            </span>
            <a
              href="mailto:jesse@devsa.community"
              className="font-pixel text-base sm:text-lg text-background hover:text-rose transition-colors break-all"
            >
              jesse@devsa.community
            </a>
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-background/40 block mb-2">
              based
            </span>
            <span className="font-pixel text-base sm:text-lg text-background">
              San Antonio, TX
            </span>
          </div>
        </div>

        <div className="border-t border-background/15 pt-8">
          <span className="font-mono text-[10px] tracking-widest uppercase text-background/40 block mb-4">
            elsewhere
          </span>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline gap-2 font-mono text-sm text-background/70 hover:text-rose transition-colors"
              >
                <span className="text-background/40 group-hover:text-rose">
                  ▸
                </span>
                <span>{s.label}</span>
                <span className="text-background/30 text-xs">{s.handle}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-background/10 flex items-center justify-between flex-wrap gap-4">
          <span className="font-mono text-[10px] tracking-widest uppercase text-background/30">
            jessebubble · v1.0.0 · 2026
          </span>
          <span className="font-mono text-[10px] tracking-widest uppercase text-background/30">
            press <kbd className="text-background/60">`</kbd> for terminal ·{' '}
            <Link href="/lab" className="hover:text-rose transition-colors">
              /lab
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
}
