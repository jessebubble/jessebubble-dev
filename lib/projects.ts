export type StackLayer = {
  layer: 'framework' | 'server' | 'api' | 'data' | 'runtime';
  value: string;
};

export type Project = {
  title: string;
  role: string;
  engagement: string;
  client: string;
  timeline: string;
  tag: string;
  context: string[];
  built: string[];
  summary: string;
  surfaces: string[];
  layers: StackLayer[];
  design: string;
  live: string | null;
  repo: string | null;
  slug: string;
};

export const PROJECTS: Project[] = [
  {
    title: 'San Antonio Startup + Tech Week',
    role: 'Lead Developer & Designer',
    engagement: 'Freelance',
    client: 'Geekdom',
    timeline: '2026',
    context: [
      'Startup + Tech Week is Geekdom’s citywide conference, and Geekdom needed one platform for everyone involved: the public registering, speakers and sponsors applying, and the staff running the week. As a freelancer, I designed the event’s visual assets and built the platform, from the public site to the staff admin and the branded screens in each room.',
    ],
    built: [
      'Public site with registration, speaker, sponsor, and host forms, validated and bot-protected, each with a branded confirmation email',
      'Staff admin with Geekdom-only sign-in, a speaker review workflow, and content management for sessions, speakers, sponsors, and partners',
      'One-tap check-in on event days, safe to repeat',
      'Custom branded screens for the in-room TVs',
      'The event’s visual assets and front-end design system',
    ],
    tag: 'Conference Platform',
    summary:
      'The public site and staff portal for the 11th San Antonio Startup + Tech Week, built for Geekdom: five days and five tracks, Sept 28 – Oct 2, 2026.',
    surfaces: [
      'public site',
      'staff admin',
      'branded TV screens',
      '.ics calendar',
      'branded email',
      'OG images',
      'sitemap + llms.txt',
    ],
    layers: [
      { layer: 'framework', value: 'Next.js 16 App Router · React 19 server components' },
      { layer: 'server', value: 'Admin SDK session cookies · Geekdom-only sign-in · proxy guarding /admin' },
      { layer: 'api', value: 'Route handlers for registration and sponsor + host intake · server actions for check-in · zod + BotID on every public form' },
      { layer: 'data', value: 'Firestore · Vercel Blob for images · Firebase Storage for video' },
      { layer: 'runtime', value: 'Vercel · 5-minute revalidation carries admin edits across the site · weekly registration digest cron' },
    ],
    design:
      'I designed the visual assets around one premise: five tracks, one current. Each track is a circuit with its own color, and every circuit runs on the same system of black, white, and one magenta, with a darker magenta ink wherever text has to meet contrast. The bolt in the hero isn’t a picture of electricity. A WebGL shader runs a current through it toward the cursor, and it settles into a still mark for anyone who asks for less motion.',
    live: 'https://www.sasw.co',
    repo: 'https://github.com/sasw-geekdom/next-sasw',
    slug: 'next-sasw',
  },
  {
    title: 'Alamo Ventures',
    role: 'Lead Developer',
    engagement: 'Freelance',
    client: 'Alamo Ventures',
    timeline: '2026',
    context: [
      'Alamo Ventures was formerly Alamo Angels. The member portal began as a front-end prototype running on mock data and grew into a production app with real authentication, a Firestore database, Stripe billing, and an automated news pipeline. It shares its database with a separate deal-flow evaluation app.',
    ],
    built: [
      'Invite-only member portal with admin and member roles',
      'Deal room and portfolio views for members',
      'Stripe dues by membership tier, with autopay, invoices, and renewal reminders',
      'An AI news pipeline: Claude curates coverage of portfolio companies for a weekly member digest',
      'An admin console for membership, deals, companies, news, and events',
    ],
    tag: 'Investor Portal',
    summary:
      "Member portal and deal room for Alamo Ventures, San Antonio's angel investor network: 140+ accredited investors and $7M+ deployed across 50+ startups.",
    surfaces: [
      'member portal',
      'deal room',
      'admin console',
      'dues + billing',
      'AI news feed',
      'weekly digest email',
    ],
    layers: [
      { layer: 'framework', value: 'Next.js 16 App Router · React 19 · server actions for every write' },
      { layer: 'server', value: 'Firebase session cookies · invite-only allowlist · admin and member roles' },
      { layer: 'api', value: 'Stripe routes for subscriptions, autopay, invoices, and webhooks · cron endpoints' },
      { layer: 'data', value: 'Dedicated Firestore database, shared with a deal-flow evaluation app · Vercel Blob' },
      { layer: 'runtime', value: 'Vercel crons: daily news curation with Claude Haiku, weekly member digest, daily renewal reminders' },
    ],
    design:
      'Members come to check on something: a deal, their dues, the week’s news. So the portal is built from a few primitives (deals, portfolio, members, dues, news), and the twelve panels of operations stay behind the admin console until someone has a reason to care. One blue, taken from the star in the logo and tuned to 7:1 contrast, carries the brand. On mobile the header becomes a bottom tab bar, and the active tab slides instead of jumping.',
    live: 'https://member.alamoventures.vc',
    repo: null,
    slug: 'next-angels',
  },
  {
    title: '434 MEDIA',
    role: 'Web Developer',
    engagement: 'Contract',
    client: '434 MEDIA',
    timeline: 'Jan 2025 – 2026',
    context: [
      '434 MEDIA is a San Antonio media agency. Under contract from January 2025, I built the internal operating system the team runs on every day, alongside the agency’s public site.',
      'The same contract covered client work, including the platform for San Antonio Tech Day.',
    ],
    built: [
      'CRM with a pipeline and a Customer 360 view',
      'AI prospecting: plain-English requests become Apollo searches, within per-user credit budgets',
      'Outreach sequences and a blog CMS',
      'Nine scheduled jobs syncing GA4, Instagram, and Mailchimp',
      'A bilingual English/Spanish page for the agency’s SDOH work',
    ],
    tag: 'Agency Platform',
    summary:
      "The agency's public site and the internal operating system the team runs on every day.",
    surfaces: [
      'agency site',
      'CRM + pipeline',
      'Apollo prospecting',
      'outreach sequences',
      'blog CMS',
      'client newsletter signups',
      'bilingual SDOH page',
    ],
    layers: [
      { layer: 'framework', value: 'Next.js 16 App Router · React 19 · a [lang] route serving the SDOH page in English and Spanish' },
      { layer: 'server', value: 'HMAC-signed session cookies · four roles, from super admin to intern' },
      { layer: 'api', value: '23 route groups, including webhooks, Meta Conversions API, Instagram, Mailchimp, search, and OG images' },
      { layer: 'data', value: 'Firestore through the Admin SDK, one module per domain · Vercel Blob' },
      { layer: 'runtime', value: 'Vercel AI Gateway · nine crons: GA4 and Instagram snapshots, Mailchimp sync, outreach every minute, feed publishing every 15 minutes' },
    ],
    design:
      'An agency site has to hold other people’s color, so this one has none of its own. The only tokens are a neutral scale, and the client work supplies everything else. Personality lives in the type instead: two custom display faces and headlines that scramble before they settle. Behind the login, every internal tool is built from the same small kit of drawers, kanban boards, and stat cards, so the team learns the interface once.',
    live: 'https://434media.com',
    repo: 'https://github.com/434media/next-434media',
    slug: 'next-434media',
  },
  {
    title: 'DEVSA',
    role: 'Founder & Lead Organizer',
    engagement: 'Nonprofit',
    client: 'DEVSA (founder)',
    timeline: '2023 – present',
    context: [
      'DEVSA started as a Discord server in September 2023 and became a 501(c)(3) six months later. It doesn’t replace San Antonio’s tech groups; it connects them, with one shared calendar and one public directory.',
      'I founded DEVSA and built the platform that runs it. For SA Startup + Tech Week 2026, DEVSA activated 13 events, ran the Give-a-LOT computer donation drive with learnOPENtech, and put 7 speakers on the main stage at Texas Public Radio.',
    ],
    built: [
      'Community calendar published as ICS and JSON feeds and an embeddable view',
      'Organizer admin with superadmin, admin, and organizer roles',
      'RSVPs with confirmation email and newsletter opt-in',
      'A weekly Discord digest of upcoming events',
      'A merch shop on Stripe and Printify, reconciled by a daily job',
      'A branded sub-site for each DEVSA conference',
    ],
    tag: 'Community Platform',
    summary:
      "The bridge for San Antonio's developer community: 23 community groups on one calendar, backed by 15 partners including Geekdom, Tech Bloc, UTSA, and the PyTexas Foundation.",
    surfaces: [
      'community site',
      'organizer admin',
      '.ics + JSON calendar feeds',
      'embeddable calendar',
      'Discord digest',
      'merch shop',
      'per-page OG images',
    ],
    layers: [
      { layer: 'framework', value: 'Next.js 16 App Router · React 19 · a branded sub-site for each conference' },
      { layer: 'server', value: 'Firebase Auth · superadmin, admin, and organizer roles · proxy redirecting the legacy domain' },
      { layer: 'api', value: 'Calendar feeds with a vitest contract test · RSVP, donation, and shop checkout routes · Stripe webhook' },
      { layer: 'data', value: 'Firestore · Vercel Blob · sanitize-html on admin rich text' },
      { layer: 'runtime', value: 'Vercel crons: Monday Discord digest, daily Stripe-to-Printify reconcile · BotID on public forms' },
    ],
    design:
      'DEVSA is a bridge, so the design is mostly structure. The tokens define a page shell and its gutters rather than a palette, and the community’s own events bring the color. Each conference (PySA, Access Granted, The Model, More Human) gets its own sub-brand on the same frame. Geist and the full Geist Pixel family keep it legible to the people it’s for: builders.',
    live: 'https://devsa.community',
    repo: 'https://github.com/devsanantonio/next-devsa',
    slug: 'devsa',
  },
  {
    title: 'San Antonio Tech Day',
    role: 'Web Developer',
    engagement: 'Contract via 434 MEDIA',
    client: 'San Antonio Tech Day, via 434 MEDIA',
    timeline: '2026',
    context: [
      'Under contract with 434 MEDIA, I built the 2026 platform: the event site, the admin portal the team ran it from, the pitch pipeline from submission through semifinals and finals, and live public voting.',
    ],
    built: [
      'Event site with registration and calls for speakers and pitches',
      'Admin portal with permissions for registrations, speakers, sponsors, and the schedule',
      'Pitch pipeline with semifinal judging and email at each stage',
      'Live public voting for the Tech Fuel finals',
      'Site copy that keeps a version history for every edit',
      'An interactive lanyard badge for the speaker and pitch calls',
    ],
    tag: 'Event Platform',
    summary:
      "Digital infrastructure for San Antonio's largest non-dilutive pitch competition: Tech Fuel, with $100K on the line.",
    surfaces: [
      'event site',
      'admin portal',
      'pitch pipeline',
      'live public voting',
      'stage-by-stage email',
      'versioned site copy',
    ],
    layers: [
      { layer: 'framework', value: 'Next.js 16 App Router · React 19 · Three.js through React Three Fiber' },
      { layer: 'server', value: 'Role-based admin auth · Firebase Admin SDK' },
      { layer: 'api', value: 'Admin content and data routes · a public vote endpoint · notification routes for each pitch stage' },
      { layer: 'data', value: 'Firestore, with a version history entry for every copy edit · Vercel Blob' },
      { layer: 'runtime', value: 'Vercel · BotID on public forms · Resend for transactional email' },
    ],
    design:
      'The design system is called “Invented Here,” and it stays spare so the inventions can show: off-white, near-black, and a single Tech Bloc red, all defined in OKLCH. The calls to action aren’t buttons. They’re a conference lanyard you can grab and spin, with the speaker and pitch calls on either side of the badge.',
    live: 'https://www.sanantoniotechday.com',
    repo: 'https://github.com/434media/techday',
    slug: 'techday',
  },
];

// Hovering a project link swaps the pointer for that project's mark
export function logoCursor(slug: string) {
  return { cursor: `url(/cursors/${slug}.png) 16 16, pointer` };
}

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
