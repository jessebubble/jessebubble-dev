import Link from 'next/link';
import PrintButton from './print-button';

const EXPERIENCE = [
  {
    title: '434 MEDIA',
    role: 'Web Developer (Contract)',
    dates: 'Jan 2025 — Present',
    location: 'San Antonio, TX',
    bullets: [
      'Engineered the digital infrastructure for San Antonio Tech Day 2026 — custom admin portal with role-based auth, content management, and live voting for the $100K Tech Fuel pitch competition.',
      'Lead developer for the TXMX Boxing platform — live event games featuring leaderboards, fight pictures, and real-time props and polls during live boxing events.',
      'Built the agency operating system: internal CRM with Apollo lead generation, plus event management and project/task management powering day-to-day operations.',
    ],
    links: [
      '434media.com',
      'sanantoniotechday.com',
      'txmxboxing.com',
    ],
  },
  {
    title: 'DEVSA',
    role: 'Founder & Lead Organizer',
    dates: 'Mar 2024 — Present',
    location: 'San Antonio, TX',
    bullets: [
      'Architected and built the platform end-to-end: Next.js with Firebase (Firestore + Auth), Cron jobs, Resend transactional email, Bot-protection, and Stripe.',
      'Designed a role-based admin dashboard with event creation, a custom rich-text editor, community editing, image uploads, RSVP capture (dedup + confirmation email + newsletter opt-in), and CSV export of attendee data.',
      'Shipped the community calendar, and bounty system that unified 20+ disconnected tech groups into a single discoverable hub at devsa.community — and manage partnerships with Geekdom, Tech Bloc, UTSA, and the PyTexas Foundation.',
    ],
    links: ['devsa.community', 'github.com/devsanantonio/next-devsa'],
  },
  {
    title: 'Strategic Education, Inc.',
    role: 'Web Development Instructor',
    dates: 'May 2023 — Nov 2023',
    location: 'San Antonio, TX',
    bullets: [
      'Cultivated a dynamic learning environment by designing exercises and providing hands-on guidance for students navigating new technical skill sets across HTML, CSS, JavaScript, React, and Node.',
    ],
    links: [],
  },
];

const EDUCATION = [
  {
    school: 'University of Texas at San Antonio',
    program: 'Certificate in Full Stack Web Development',
    dates: 'Oct 2021 — Apr 2022',
    note: 'Intensive 24-week program covering HTML, CSS, JavaScript, Node.js, and React.',
  },
];

export default function ResumePage() {
  return (
    <div className="min-h-dvh bg-surface print:bg-white">
      <div className="print:hidden border-b border-border bg-background sticky top-0 z-10">
        <div className="max-w-215 mx-auto px-6 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="font-pixel text-sm text-foreground hover:text-rose transition-colors"
          >
            ← jesse<span className="text-rose">bubble</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-widest uppercase text-foreground/40 hidden sm:inline">
              ▸ /resume
            </span>
            <PrintButton />
          </div>
        </div>
      </div>

      <main
        className="max-w-215 mx-auto bg-background print:bg-white border border-border print:border-0 my-8 print:my-0 px-8 sm:px-14 py-10 print:px-0 print:py-0 print:max-w-none text-foreground print:text-black"
        id="resume"
      >
        <header className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-4 border-b border-foreground/15">
          <div>
            <h1 className="font-pixel text-3xl sm:text-4xl tracking-tight leading-none">
              Jesse Hernandez
            </h1>
            <p className="font-mono text-xs sm:text-[13px] text-foreground/70 print:text-black/70 mt-2">
              Software Developer & Ecosystem Architect · San Antonio, TX
            </p>
          </div>
          <address className="font-mono text-[11px] text-foreground/70 print:text-black/70 leading-relaxed not-italic text-left sm:text-right">
            <div>210.816.1144</div>
            <div>jesseovr@gmail.com</div>
            <div>jessebubble.dev</div>
            <div>linkedin.com/in/jessebubble</div>
            <div>github.com/jessebubble</div>
          </address>
        </header>

        <section className="mt-4">
          <h2 className="font-pixel text-[11px] tracking-widest uppercase text-rose print:text-black mb-2">
            ▸ Summary
          </h2>
          <p className="text-sm leading-relaxed text-foreground/85 print:text-black">
            San Antonio native and full-stack web developer. I design custom
            browser experiences backed by real APIs, bridging creative
            strategy and high-stakes deployment. Deepening local connection
            through DEVSA while engineering the custom workflows and
            striking interfaces that power brand storytelling at 434 MEDIA —
            turning regional potential into measurable impact. Currently
            focused on design systems, improved workflows, and agent tooling.
          </p>
        </section>

        <section className="mt-4">
          <h2 className="font-pixel text-[11px] tracking-widest uppercase text-rose print:text-black mb-3">
            ▸ Professional Experience
          </h2>
          <div className="space-y-4">
            {EXPERIENCE.map((e) => (
              <article key={e.title} className="break-inside-avoid">
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <h3 className="font-pixel text-base leading-tight">
                    {e.title}
                    <span className="font-mono text-[11px] text-foreground/60 print:text-black/70 font-normal ml-1">
                      — {e.role}
                    </span>
                  </h3>
                  <span className="font-mono text-[10px] tracking-wider uppercase text-foreground/50 print:text-black/60 shrink-0">
                    {e.dates} · {e.location}
                  </span>
                </div>
                <ul className="mt-1.5 space-y-1 text-sm text-foreground/80 print:text-black leading-relaxed">
                  {e.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-rose/60 print:text-black/40 shrink-0 mt-0.5">
                        ▸
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {e.links.length > 0 && (
                  <p className="mt-1.5 font-mono text-[10px] text-foreground/60 print:text-black/60">
                    {e.links.join(' · ')}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-4 break-inside-avoid">
          <h2 className="font-pixel text-[11px] tracking-widest uppercase text-rose print:text-black mb-3">
            ▸ Education
          </h2>
          {EDUCATION.map((ed) => (
            <article key={ed.school}>
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <h3 className="font-pixel text-base leading-tight">
                  {ed.school}
                  <span className="font-mono text-[11px] text-foreground/60 print:text-black/70 font-normal ml-1">
                    — {ed.program}
                  </span>
                </h3>
                <span className="font-mono text-[10px] tracking-wider uppercase text-foreground/50 print:text-black/60 shrink-0">
                  {ed.dates}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-foreground/80 print:text-black leading-relaxed">
                {ed.note}
              </p>
            </article>
          ))}
        </section>

        <footer className="print:hidden mt-4 pt-3 border-t border-foreground/15 font-mono text-[10px] text-foreground/40 text-center">
          jessebubble.dev · Find your people. Build your future.
        </footer>
      </main>

      <div className="print:hidden h-12" />
    </div>
  );
}
