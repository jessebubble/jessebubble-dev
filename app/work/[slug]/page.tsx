import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  PROJECTS,
  getProject,
  logoCursor,
  type StackLayer,
} from '@/lib/projects';

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

const LAYER_LABELS: Record<StackLayer['layer'], string> = {
  framework: 'Framework',
  server: 'Server',
  api: 'API',
  data: 'Data',
  runtime: 'Runtime',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

function listInProse(items: string[]) {
  if (items.length < 2) return items.join('');
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <div className="font-sans bg-background text-foreground min-h-dvh px-5 sm:px-10 py-10 lg:py-12">
      <article className="max-w-150 mx-auto text-[15px] sm:text-base leading-relaxed">
        <Link href="/" className="text-sm text-nav hover:text-foreground transition-colors">
          ← jessebubble
        </Link>

        <h1 className="font-pixel text-3xl sm:text-4xl tracking-tight leading-tight mt-10">
          {project.title}
        </h1>
        <p className="text-sm text-nav mt-2">{project.tag}</p>

        <p className="text-pretty mt-8 text-lg leading-relaxed">
          {project.summary}
        </p>

        <dl className="mt-8 border-t border-border text-sm">
          {[
            { label: 'Client', value: project.client },
            { label: 'Timeline', value: project.timeline },
            { label: 'Role', value: `${project.role} · ${project.engagement}` },
          ].map((fact) => (
            <div
              key={fact.label}
              className="grid grid-cols-[6.5rem_1fr] gap-x-5 py-2.5 border-b border-border"
            >
              <dt className="text-nav">{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
          <div className="grid grid-cols-[6.5rem_1fr] gap-x-5 py-2.5 border-b border-border">
            <dt className="text-nav">Links</dt>
            <dd className="flex flex-wrap gap-x-4">
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-link">
                  Live site
                </a>
              )}
              {project.repo ? (
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-link">
                  Source
                </a>
              ) : (
                <span className="text-nav">Source is private</span>
              )}
            </dd>
          </div>
        </dl>

        <h2 className="font-pixel text-xl tracking-tight mt-12 mb-3">Context</h2>
        <div className="flex flex-col gap-4">
          {project.context.map((paragraph) => (
            <p key={paragraph} className="text-pretty">
              {paragraph}
            </p>
          ))}
        </div>

        <h2 className="font-pixel text-xl tracking-tight mt-12 mb-3">What I built</h2>
        <ul className="flex flex-col gap-2">
          {project.built.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-nav shrink-0">–</span>
              <span className="text-pretty">{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="font-pixel text-xl tracking-tight mt-12 mb-3">One source</h2>
        <p className="text-pretty">
          This codebase runs the {listInProse(project.surfaces)}.
        </p>

        <h2 className="font-pixel text-xl tracking-tight mt-12 mb-3">Stack</h2>
        <dl className="border-t border-border">
          {project.layers.map(({ layer, value }) => (
            <div
              key={layer}
              className="grid grid-cols-1 sm:grid-cols-[6.5rem_1fr] gap-x-5 gap-y-0.5 py-3 border-b border-border"
            >
              <dt className="text-[13px] text-nav sm:pt-0.5">{LAYER_LABELS[layer]}</dt>
              <dd className="text-pretty">{value}</dd>
            </div>
          ))}
        </dl>

        <h2 className="font-pixel text-xl tracking-tight mt-12 mb-3">Design</h2>
        <p className="text-pretty">{project.design}</p>

        <footer className="mt-16 pt-6 border-t border-border flex items-baseline justify-between gap-4 text-sm text-nav">
          <Link href="/" className="hover:text-foreground transition-colors">
            All projects
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className={`text-link text-foreground ${logoCursor(next.slug)}`}
          >
            Next: {next.title}
          </Link>
        </footer>
      </article>
    </div>
  );
}
