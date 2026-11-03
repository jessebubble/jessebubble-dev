import Link from 'next/link';
import PrintButton from './print-button';
import PrintOnlyPhone from './print-only-phone';
import { GeistSansNonVariable } from 'geist/font/sans-non-variable';

export type Experience = {
  title: string;
  role: string;
  dates: string;
  location: string;
  bullets: string[];
  links: string[];
};

export type Skill = { area: string; items: string };

const EDUCATION = [
  {
    school: 'University of Texas at San Antonio',
    program: 'Full Stack Web Development Certificate',
    dates: 'Oct 2021 – Apr 2022',
  },
];

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="font-pixel text-base tracking-tight mb-2 pb-1 print:mb-1.5 print:pb-0.5 border-b border-border print:border-black/20">
      {children}
    </h2>
  );
}

export function ResumeDocument({
  headline,
  summary,
  experience,
  skills,
}: {
  headline: string;
  summary: string;
  experience: Experience[];
  skills: Skill[];
}) {
  return (
    <div
      className={`${GeistSansNonVariable.className} min-h-dvh bg-surface print:bg-white`}
    >
      <div className="print:hidden border-b border-border bg-background sticky top-0 z-10">
        <div className="max-w-215 mx-auto px-6 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-nav hover:text-foreground transition-colors"
          >
            ← jessebubble
          </Link>
          <PrintButton />
        </div>
      </div>

      <main
        className="max-w-215 mx-auto bg-background print:bg-white border border-border print:border-0 my-8 print:my-0 px-8 sm:px-14 py-10 print:px-0 print:py-0 print:max-w-none text-foreground print:text-black"
        id="resume"
      >
        <header className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-4 print:pb-2.5 border-b border-foreground/20 print:border-black/30">
          <div>
            <h1 className="font-pixel text-3xl sm:text-4xl print:text-3xl tracking-tight leading-none">
              Jesse Hernandez
            </h1>
            <p className="text-sm text-secondary print:text-black/75 mt-2">
              {headline} · San Antonio, TX
            </p>
          </div>
          <address className="text-[13px] text-secondary print:text-black/75 leading-relaxed not-italic text-left sm:text-right">
            <div>
              <PrintOnlyPhone />
              jesseovr@gmail.com · jessebubble.dev
            </div>
            <div>linkedin.com/in/jessebubble · github.com/jessebubble</div>
          </address>
        </header>

        <section className="mt-5 print:mt-2.5">
          <SectionHeading>Summary</SectionHeading>
          <p className="text-sm leading-relaxed text-pretty print:text-[12.5px] print:leading-snug print:text-black">
            {summary}
          </p>
        </section>

        <section className="mt-5 print:mt-2.5">
          <SectionHeading>Experience</SectionHeading>
          <div className="space-y-4 print:space-y-2">
            {experience.map((e) => (
              <article key={e.title} className="break-inside-avoid">
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <h3 className="text-[15px] font-semibold leading-tight">
                    {e.title}
                    <span className="font-normal text-secondary print:text-black/75">
                      {' '}· {e.role}
                    </span>
                  </h3>
                  <span className="text-[13px] text-nav print:text-black/60 shrink-0 tabular-nums">
                    {e.dates} · {e.location}
                  </span>
                </div>
                <ul className="mt-1.5 print:mt-1 space-y-1 print:space-y-0.5 text-sm leading-relaxed print:text-[12.5px] print:leading-snug print:text-black">
                  {e.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-nav print:text-black/40 shrink-0">
                        –
                      </span>
                      <span className="text-pretty">{b}</span>
                    </li>
                  ))}
                </ul>
                {e.links.length > 0 && (
                  <p className="mt-1.5 print:mt-1 text-xs print:text-[11px] text-nav print:text-black/60">
                    {e.links.join(' · ')}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-5 print:mt-2.5 break-inside-avoid">
          <SectionHeading>Skills</SectionHeading>
          <ul className="space-y-1 print:space-y-0.5 text-sm leading-relaxed print:text-[12.5px] print:leading-snug print:text-black">
            {skills.map((s) => (
              <li key={s.area} className="text-pretty">
                <span className="font-semibold">{s.area}:</span> {s.items}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-5 print:mt-2.5 break-inside-avoid">
          <SectionHeading>Education</SectionHeading>
          {EDUCATION.map((ed) => (
            <article key={ed.school}>
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <h3 className="text-[15px] font-semibold leading-tight">
                  {ed.school}
                  <span className="font-normal text-secondary print:text-black/75">
                    {' '}· {ed.program}
                  </span>
                </h3>
                <span className="text-[13px] text-nav print:text-black/60 shrink-0 tabular-nums">
                  {ed.dates}
                </span>
              </div>
            </article>
          ))}
        </section>
      </main>

      <div className="print:hidden h-12" />
    </div>
  );
}
