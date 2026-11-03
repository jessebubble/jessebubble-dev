import type { Metadata } from 'next';
import {
  ResumeDocument,
  type Experience,
  type Skill,
} from '../resume-document';

// Tailored for CodePath's Mentor, Claude Corps role. Unlinked and kept out of
// search results; open it directly to print the PDF.
export const metadata: Metadata = {
  title: 'Resume — Jesse Hernandez (CodePath)',
  robots: { index: false, follow: false },
};

const EXPERIENCE: Experience[] = [
  {
    title: 'DEVSA',
    role: 'Founder & Executive Director',
    dates: 'Mar 2024 – Present',
    location: 'San Antonio, TX',
    bullets: [
      'Founded and lead a 501(c)(3) that serves as community infrastructure for San Antonio tech: one calendar and public directory for 25 tech groups, 16 partners including Geekdom, Tech Bloc, UTSA, and the PyTexas Foundation, and four DEVSA-led conferences.',
      'Brought 25 independent groups onto one shared calendar and organizer portal, so each group publishes its own events and manages RSVPs in one place.',
      'Co-hosted Zero to Agent with Vercel, a pop-up on building AI agents. For SA Startup + Tech Week 2026, activated 13 events, ran the Give-a-LOT computer donation drive with learnOPENtech, and put 7 local speakers on the main stage at Texas Public Radio.',
    ],
    links: ['devsa.community', 'github.com/devsanantonio/next-devsa'],
  },
  {
    title: 'Freelance',
    role: 'Full-Stack Software Engineer (1099)',
    dates: '2026 – Present',
    location: 'San Antonio, TX',
    bullets: [
      'Partnered with Geekdom’s team to design and ship the San Antonio Startup + Tech Week 2026 platform: public site, staff admin, transactional check-in, and custom branded screens for the in-room TVs.',
    ],
    links: ['sasw.co'],
  },
  {
    title: '434 MEDIA',
    role: 'Software Engineer (Contract)',
    dates: 'Jan 2025 – 2026',
    location: 'San Antonio, TX',
    bullets: [
      'Led 9 interns from the City of San Antonio’s ambassador program across three teams for 8 weeks: built a sandbox for the computer science team, had the security team audit it for vulnerabilities, and guided a research team whose sales funnel, ICP, and Apollo work fed the agency’s CRM.',
      'Built the internal systems the agency team runs on: a CRM and pipeline, outreach sequences, and nine scheduled jobs syncing GA4, Instagram, and Mailchimp.',
      'Brought AI into the sales workflow: an AI tool call turns plain-English requests into Apollo searches, with per-user credit budgets checked before every paid API call.',
      'Built the member portal for Alamo Ventures, an angel network of 140+ accredited investors, with Stripe dues and an AI pipeline where Claude curates portfolio news for members.',
    ],
    links: ['434media.com'],
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

const SKILLS: Skill[] = [
  {
    area: 'AI',
    items: 'Claude, Claude Code, Claude API, AI SDK (structured outputs, tool calling), MCP, LLM-powered workflows',
  },
  {
    area: 'Teaching',
    items: 'exercise design, 1:1 guidance, workshops and events, technical feedback',
  },
  {
    area: 'Engineering',
    items: 'TypeScript, JavaScript, React, Next.js, Node.js, Firebase, Stripe, Vercel, Git',
  },
  {
    area: 'Community',
    items: 'nonprofit leadership, partnerships, event production, tool adoption across independent groups',
  },
];

const SUMMARY =
  'Software engineer and educator who helps people and organizations put AI to work. Taught web development to career changers, founded DEVSA, a 501(c)(3) that serves as community infrastructure for San Antonio tech, and builds production apps and AI workflows with Claude. Works AI-natively and develops with Claude Code.';

export default function CodePathResumePage() {
  return (
    <ResumeDocument
      headline="Software Engineer & Educator"
      summary={SUMMARY}
      experience={EXPERIENCE}
      skills={SKILLS}
    />
  );
}
