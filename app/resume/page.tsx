import Link from 'next/link';
import PrintButton from './print-button';
import PrintOnlyPhone from './print-only-phone';
import { GeistSansNonVariable } from 'geist/font/sans-non-variable';

const EXPERIENCE = [
  {
    title: 'Freelance',
    role: 'Full-Stack Web Developer (1099)',
    dates: '2026 – Present',
    location: 'San Antonio, TX',
    bullets: [
      'Designed and built the San Antonio Startup + Tech Week 2026 platform for Geekdom: public site, staff admin, transactional check-in, and custom branded screens for the in-room TVs.',
      'Designed the event’s visual identity and front-end design system: five color-coded tracks, color tokens checked against WCAG contrast, and a WebGL hero that falls back to a static mark for reduced motion.',
      'Built the Alamo Ventures member portal and deal room (140+ accredited investors, $7M+ deployed): invite-only auth, Stripe dues with autopay and webhooks, and a Claude news pipeline with structured outputs and hash-based deduplication.',
    ],
    links: ['sasw.co', 'github.com/sasw-geekdom/next-sasw', 'jessebubble.dev/work/next-angels'],
  },
  {
    title: '434 MEDIA',
    role: 'Web Developer (Contract)',
    dates: 'Jan 2025 – 2026',
    location: 'San Antonio, TX',
    bullets: [
      'Engineered San Antonio Tech Day 2026: role-based admin, versioned site content, a multi-round pitch pipeline with email at each stage, and live public voting for the $100K Tech Fuel competition.',
      'Built the agency operating system: CRM and pipeline, outreach sequences, a blog CMS, and nine scheduled jobs syncing GA4, Instagram, and Mailchimp.',
      'Built AI prospecting where an LLM tool call turns plain-English requests into zod-validated Apollo search filters, with per-user credit budgets checked before every paid API call.',
    ],
    links: ['434media.com', 'sanantoniotechday.com'],
  },
  {
    title: 'DEVSA',
    role: 'Founder & Lead Organizer',
    dates: 'Mar 2024 – Present',
    location: 'San Antonio, TX',
    bullets: [
      'Founded and lead a 501(c)(3) that puts 23 community groups and 15 partners, including Geekdom, Tech Bloc, UTSA, and the PyTexas Foundation, on one shared calendar.',
      'Built the platform end to end on Next.js and Firebase: role-based admin, RSVPs with confirmation email, ICS and contract-tested JSON calendar feeds, a weekly Discord digest, and a Stripe + Printify shop reconciled by a daily job.',
      'For SA Startup + Tech Week 2026, activated 13 events, ran the Give-a-LOT computer donation drive with learnOPENtech, and put 7 speakers on the main stage at Texas Public Radio.',
    ],
    links: ['devsa.community', 'github.com/devsanantonio/next-devsa'],
  },
  {
    title: 'Strategic Education, Inc.',
    role: 'Web Development Instructor',
    dates: 'May 2023 – Nov 2023',
    location: 'San Antonio, TX',
    bullets: [
      'Taught HTML, CSS, JavaScript, React, and Node to career-changing students, designing exercises and giving hands-on guidance as they built their first full-stack projects.',
    ],
    links: [],
  },
];

const SKILLS = [
  {
    area: 'Frontend',
    items: 'TypeScript, JavaScript, React, Next.js, HTML, CSS, Tailwind CSS, responsive design, WebGL, Three.js',
  },
  {
    area: 'Backend',
    items: 'Node.js, REST APIs, Firebase Auth, Firestore, Stripe webhooks, Resend, zod',
  },
  {
    area: 'Tools',
    items: 'Git, GitHub, Vercel (cron jobs, Blob, BotID, AI Gateway), Vitest',
  },
  {
    area: 'AI',
    items: 'Claude Code (AI-assisted development), Claude API, Vercel AI SDK (structured outputs, tool calling), MCP',
  },
  {
    area: 'Design',
    items: 'Adobe Illustrator, design systems, accessibility (WCAG contrast, reduced motion)',
  },
];

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

export default function ResumePage() {
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
              Full-Stack Web Developer · San Antonio, TX
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
            Full-stack web developer who designs and builds production Next.js
            platforms end to end: public sites, admin tools, REST APIs,
            payments, email, and scheduled jobs. Shipped platforms for a
            citywide tech conference, an angel investor network, a $100K pitch
            competition, and an agency&apos;s operations. Develops with Claude
            Code. Founder of DEVSA, San Antonio&apos;s developer community
            nonprofit.
          </p>
        </section>

        <section className="mt-5 print:mt-2.5">
          <SectionHeading>Experience</SectionHeading>
          <div className="space-y-4 print:space-y-2">
            {EXPERIENCE.map((e) => (
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
            {SKILLS.map((s) => (
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
