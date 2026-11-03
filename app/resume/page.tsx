import {
  ResumeDocument,
  type Experience,
  type Skill,
} from './resume-document';

const EXPERIENCE: Experience[] = [
  {
    title: 'Freelance',
    role: 'Full-Stack Software Engineer (1099)',
    dates: '2026 – Present',
    location: 'San Antonio, TX',
    bullets: [
      'Partnered with Geekdom’s team to design and ship the San Antonio Startup + Tech Week 2026 platform on Next.js and Vercel: public site, staff admin, transactional check-in, and custom branded screens for the in-room TVs.',
      'Designed the event’s visual identity and design system (color-coded tracks, WCAG-checked color tokens, a WebGL hero with a reduced-motion fallback) and built in SEO: structured data, OG images, a sitemap, and llms.txt.',
    ],
    links: ['sasw.co', 'github.com/sasw-geekdom/next-sasw'],
  },
  {
    title: '434 MEDIA',
    role: 'Software Engineer (Contract)',
    dates: 'Jan 2025 – 2026',
    location: 'San Antonio, TX',
    bullets: [
      'Built the Alamo Ventures member portal and deal room (140+ accredited investors, $7M+ deployed): invite-only auth, Stripe dues with autopay and webhooks, and an AI SDK pipeline where Claude curates portfolio news into a weekly digest.',
      'Built the agency’s go-to-market systems: a CRM, outreach sequences, and nine scheduled data-sync jobs.',
      'Automated sales prospecting with AI: an AI SDK tool call turns plain-English requests into validated Apollo searches, with per-user credit budgets checked before every paid API call.',
      'Led 9 City of San Antonio ambassador interns across three teams for 8 weeks: a sandbox build, a security audit of it, and sales funnel research that fed the agency’s CRM.',
    ],
    links: ['434media.com', 'jessebubble.dev/work/next-angels'],
  },
  {
    title: 'DEVSA',
    role: 'Founder & Executive Director',
    dates: 'Mar 2024 – Present',
    location: 'San Antonio, TX',
    bullets: [
      'Founded and lead a 501(c)(3) that serves as community infrastructure for San Antonio tech: one calendar and public directory for 25 tech groups, 16 partners including Geekdom, Tech Bloc, UTSA, and the PyTexas Foundation, and four DEVSA-led conferences.',
      'Built and open-sourced the platform on Next.js and Firebase: role-based admin, RSVPs with confirmation email, ICS and contract-tested JSON calendar feeds, a weekly Discord digest, and a Stripe + Printify shop.',
      'Co-hosted Zero to Agent with Vercel, a pop-up on building AI agents. For SA Startup + Tech Week 2026, activated 13 events, ran the Give-a-LOT computer donation drive with learnOPENtech, and put 7 speakers on the main stage at Texas Public Radio.',
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

const SKILLS: Skill[] = [
  {
    area: 'Frontend',
    items: 'TypeScript, JavaScript, React, Next.js (App Router, Server Components), HTML, CSS, Tailwind CSS, WebGL',
  },
  {
    area: 'Backend',
    items: 'Node.js, REST APIs, Firebase Auth, Firestore, Stripe webhooks, Resend, zod',
  },
  {
    area: 'AI',
    items: 'AI SDK (structured outputs, tool calling), AI Gateway, Claude API, Claude Code, MCP',
  },
  {
    area: 'Platform',
    items: 'Vercel (cron jobs, Blob, BotID, Analytics), Git, GitHub, Vitest',
  },
  {
    area: 'Design & web',
    items: 'design systems, accessibility (WCAG), SEO (structured data, OG images), Adobe Illustrator',
  },
];

const SUMMARY =
  'Full-stack software engineer who ships production Next.js apps for real users on Vercel: public sites, internal tools, APIs, payments, and AI workflows built with the AI SDK and Claude. Works side by side with client teams and develops with Claude Code. Founder of DEVSA, San Antonio’s developer community nonprofit, hosting events and putting local developers on stage.';

export default function ResumePage() {
  return (
    <ResumeDocument
      headline="Full-Stack Software Engineer"
      summary={SUMMARY}
      experience={EXPERIENCE}
      skills={SKILLS}
    />
  );
}
