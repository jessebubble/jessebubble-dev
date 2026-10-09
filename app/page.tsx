import Image from 'next/image';
import Link from 'next/link';
import { PROJECTS, getProject, logoCursor } from '@/lib/projects';

const BOOKING_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ25O6CZahJZp7SHsfNznoZZFlf6VW6VfzFL3__oN0rrmAP3bLo660A4dZV9zuJXx-qR-1_Vwu-q?gv=true';
const EMAIL = 'jesseovr@gmail.com';

const SOCIALS = [
  { label: 'GitHub', url: 'https://github.com/jessebubble' },
  { label: 'X', url: 'https://twitter.com/jessebubble' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/jessebubble' },
  { label: 'Instagram', url: 'https://instagram.com/jessebubble' },
];

function ProjectLink({ slug, children }: { slug: string; children?: string }) {
  const project = getProject(slug);
  if (!project) return null;
  return (
    <Link
      href={`/work/${slug}`}
      className={`text-link ${logoCursor(slug)}`}
    >
      {children ?? project.title}
    </Link>
  );
}

function External({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-link"
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <div className="font-sans bg-background text-foreground min-h-dvh px-5 sm:px-10 lg:px-12 py-10 lg:py-12">
      <div className="max-w-352 mx-auto grid gap-12 lg:gap-16 lg:grid-cols-[minmax(0,1.6fr)_minmax(380px,1fr)] items-start">
        <main className="w-full max-w-150 text-[15px] sm:text-base leading-relaxed">
          <h1 className="font-pixel text-4xl sm:text-5xl tracking-tight leading-none">
            @jessebubble
          </h1>
          <nav
            aria-label="Elsewhere"
            className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm text-nav mt-3 mb-10"
          >
            {SOCIALS.map((s) => (
              <span key={s.label} className="flex items-baseline gap-x-2">
                <External href={s.url}>{s.label}</External>
                <span aria-hidden="true">·</span>
              </span>
            ))}
            <Link href="/resume" className="text-link">
              Resume
            </Link>
          </nav>

          <section aria-label="Biography" className="flex flex-col gap-5">
            <p className="text-pretty">
              San Antonio native, full-stack web developer, and ecosystem
              architect. I design and build production Next.js platforms end
              to end: public sites, admin tools, APIs, payments, email, and
              scheduled jobs. I work freelance and develop with Claude Code.
            </p>
            <p className="text-pretty">
              I founded <ProjectLink slug="devsa" />, the bridge for San
              Antonio&apos;s developer community. As a freelancer I&apos;ve
              built <ProjectLink slug="next-sasw" /> for Geekdom and the
              member portal for <ProjectLink slug="next-angels" />. Before
              that, under contract, I built the pitch platform for{' '}
              <ProjectLink slug="techday" />.
            </p>
          </section>

          <section aria-labelledby="projects-heading" className="mt-12">
            <h2
              id="projects-heading"
              className="font-pixel text-xl tracking-tight mb-3"
            >
              Projects
            </h2>
            <div className="dim-rows border-t border-border">
              {PROJECTS.map((p) => (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  className={`grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-5 py-3 border-b border-border ${logoCursor(p.slug)}`}
                >
                  <span>{p.title}</span>
                  <span className="text-[13px] text-nav whitespace-nowrap">
                    {p.tag}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section aria-labelledby="contact-heading" className="mt-12">
            <h2
              id="contact-heading"
              className="font-pixel text-xl tracking-tight mb-3"
            >
              Contact
            </h2>
            <p className="text-pretty">
              Email <a href={`mailto:${EMAIL}`} className="text-link">{EMAIL}</a>{' '}
              or <External href={BOOKING_URL}>book a 30-minute call</External>.
            </p>
          </section>

          <footer className="mt-16 text-[13px] text-nav">
            San Antonio, Texas
          </footer>
        </main>

        <aside className="hidden lg:block sticky top-12 h-[calc(100svh-6rem)] min-h-[min(72svh,760px)] rounded-[10px] border border-border bg-surface overflow-hidden">
          <Image
            src="/jesse-speaking.jpg"
            alt="Jesse speaking to a DEVSA gathering in San Antonio"
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 0px"
            className="object-cover"
            style={{ objectPosition: '80% 45%' }}
          />
        </aside>
      </div>
    </div>
  );
}
