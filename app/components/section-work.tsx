type Project = {
  title: string;
  role: string;
  tag: string;
  description: string;
  stack: string[];
  live: string | null;
  repo: string | null;
  slug: string;
};

const PROJECTS: Project[] = [
  {
    title: 'DEVSA',
    role: 'Founder & Lead Organizer',
    tag: 'Community Platform',
    description:
      'Architected the platform end-to-end — Next.js + Firebase, role-based admin with custom rich-text editor, RSVP capture, community calendar, and bounty system. Unified 20+ tech groups through partnerships with Geekdom, Tech Bloc, UTSA, and the PyTexas Foundation.',
    stack: ['Next.js', 'Firebase', 'Stripe', 'Resend'],
    live: 'https://devsa.community',
    repo: 'https://github.com/devsanantonio/next-devsa',
    slug: 'devsa',
  },
  {
    title: '434 MEDIA',
    role: 'Lead Developer & Technical Architect',
    tag: 'Agency Platform',
    description:
      'Digital platform for the agency plus the internal operating system: editorial CMS, custom CRM with Apollo lead generation, event management, and project/task management powering day-to-day operations.',
    stack: ['Next.js', 'TailwindCSS', 'Firebase', 'Apollo'],
    live: 'https://434media.com',
    repo: 'https://github.com/434media/next-434media',
    slug: 'next-434media',
  },
  {
    title: 'San Antonio Tech Day 2026',
    role: 'Full-stack Engineer',
    tag: 'Event Platform',
    description:
      "Engineered the digital infrastructure for SA's largest non-dilutive $100K pitch competition. Custom admin portal with role-based auth, content management, and live voting for the Tech Fuel competition.",
    stack: ['Next.js', 'Firebase', 'Admin UI', 'Adobe Illustrator'],
    live: 'https://www.sanantoniotechday.com',
    repo: 'https://github.com/434media/techday',
    slug: 'techday',
  },
  {
    title: 'TXMX Boxing',
    role: 'Lead Developer',
    tag: 'Live Event Platform',
    description:
      'Live event platform for boxing — leaderboards, fight pictures, and real-time props + polls during live boxing events. Custom admin and operations workflows.',
    stack: ['Next.js', 'Realtime', 'Admin UI'],
    live: 'https://www.txmxboxing.com/',
    repo: 'https://github.com/434media/next-txmx',
    slug: 'next-txmx',
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col border border-border bg-background hover:border-rose/40 transition-colors">
      <div className="flex flex-col gap-3 p-6 sm:p-8 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-pixel text-xl sm:text-2xl text-foreground tracking-tight leading-tight">
            {project.title}
          </h3>
          <span className="font-mono text-[9px] tracking-widest uppercase text-foreground/40 border border-border px-2 py-1 shrink-0 leading-none">
            {project.tag}
          </span>
        </div>

        <span className="font-mono text-[11px] text-rose/70">
          {project.role}
        </span>

        <p className="text-sm text-foreground/60 leading-relaxed flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.stack.map((s) => (
            <span
              key={s}
              className="font-mono text-[10px] text-foreground/50 bg-surface border border-border px-2 py-0.5 leading-none"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-5 pt-4 mt-2 border-t border-border/60">
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-foreground/70 hover:text-rose transition-colors flex items-center gap-1.5"
            >
              <span className="text-rose/60">▸</span>
              live ↗
            </a>
          ) : (
            <span className="font-mono text-xs text-foreground/30 flex items-center gap-1.5">
              <span className="text-foreground/20">▸</span>
              live — private
            </span>
          )}
          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-foreground/70 hover:text-rose transition-colors flex items-center gap-1.5"
            >
              <span className="text-rose/60">▸</span>
              repo ↗
            </a>
          ) : (
            <span className="font-mono text-xs text-foreground/30 flex items-center gap-1.5">
              <span className="text-foreground/20">▸</span>
              repo — n/a
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function SectionWork() {
  return (
    <section
      id="work"
      className="w-full px-6 sm:px-12 py-24 sm:py-32 bg-background border-t border-border"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline gap-3 mb-10">
          <span className="font-mono text-[10px] tracking-widest uppercase text-rose/70">
            ▸ work
          </span>
          <span className="font-mono text-[10px] text-foreground/30">
            // selected projects
          </span>
        </div>

        <h2 className="font-pixel text-3xl sm:text-4xl xl:text-5xl text-foreground tracking-tight leading-tight mb-12 sm:mb-16">
          What I&apos;ve been<br />
          <span className="text-rose">shipping.</span>
        </h2>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>

        <p className="font-mono text-[11px] text-foreground/40 mt-12 max-w-2xl leading-relaxed">
          &quot;Tools are just tools. They don&apos;t really matter — especially
          to the people trying to use the websites you build.&quot; — Andy Bell
        </p>
      </div>
    </section>
  );
}
