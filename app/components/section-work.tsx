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
    role: 'Founder & Community Architect',
    tag: 'Community',
    description:
      'Unifying the San Antonio tech ecosystem. Strategic partnerships with Geekdom, Tech Bloc, UTSA UC, PyTexas Foundation, and the Latina Leadership Institute — mobilizing resources for local builders.',
    stack: ['Bounties', 'Partnerships', 'Events'],
    live: 'https://devsa.community',
    repo: 'https://github.com/devsanantonio/next-devsa',
    slug: 'devsa',
  },
  {
    title: '434 MEDIA',
    role: 'Lead Developer & Technical Architect',
    tag: 'Agency Platform',
    description:
      'Digital platform for the agency — editorial storytelling, design system, and custom CMS powering work for venture-backed startups and ecosystem leaders.',
    stack: ['Next.js', 'Claude Code', 'TailwindCSS', 'Firebase'],
    live: 'https://434media.com',
    repo: 'https://github.com/434media/next-434media',
    slug: 'next-434media',
  },
  {
    title: 'San Antonio Tech Day 2026',
    role: 'Full-stack Engineer',
    tag: 'Event Platform',
    description:
      "Engineered the digital presence for SA's largest non-dilutive $100K pitch competition and multi-track community summit. Custom auth, admin dashboards, attendee flows.",
    stack: ['Next.js', 'Firebase', 'Admin UI', 'Adobe Illustrator'],
    live: 'https://www.sanantoniotechday.com',
    repo: 'https://github.com/434media/techday',
    slug: 'techday',
  },
  {
    title: 'TXMX Boxing',
    role: 'Lead Developer',
    tag: 'Custom Platform',
    description:
      'Custom platform with creative UI, role-based auth, and admin dashboards — built to manage operations and partner workflows end-to-end.',
    stack: ['Next.js', 'Auth', 'Admin UI'],
    live: 'https://www.txmxboxing.com/',
    repo: 'https://github.com/434media/next-txmx',
    slug: 'next-txmx',
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col border border-border bg-background hover:border-rose/40 transition-colors">
      <div className="relative aspect-16/10 bg-surface overflow-hidden border-b border-border">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-center px-6">
          <span className="font-mono text-[10px] tracking-widest uppercase text-foreground/30">
            ▸ {project.slug}.png
          </span>
          <span className="font-mono text-[9px] tracking-widest uppercase text-foreground/20">
            asset coming soon
          </span>
        </div>
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)',
            backgroundSize: '14px 14px',
          }}
        />
        <div className="absolute top-3 left-3 font-mono text-[9px] tracking-widest uppercase text-foreground/30">
          <span className="text-rose/50">▸</span> img
        </div>
        <div className="absolute bottom-3 right-3 font-mono text-[9px] tracking-widest uppercase text-foreground/30">
          16:10
        </div>
      </div>

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
