export type OutputLine =
  | { kind: 'echo'; text: string }
  | { kind: 'action'; text: string }
  | { kind: 'result'; text: string }
  | { kind: 'detail'; text: string }
  | { kind: 'kv'; key: string; value: string }
  | { kind: 'link'; label: string; href: string; external?: boolean }
  | { kind: 'meta'; text: string }
  | { kind: 'error'; text: string }
  | { kind: 'separator' };

export type RunContext = {
  navigate: (path: string) => void;
  open: (url: string) => void;
  clear: () => void;
};

export type CommandCategory = 'content' | 'navigate' | 'meta' | 'system';

export type CommandDef = {
  name: string;
  description: string;
  category: CommandCategory;
  run: (ctx: RunContext) => OutputLine[];
};

export const COMMANDS: CommandDef[] = [
  {
    name: 'about',
    description: 'Who is jessebubble?',
    category: 'content',
    run: () => [
      { kind: 'action', text: 'whoami' },
      { kind: 'kv', key: 'name', value: 'Jesse Hernandez' },
      { kind: 'kv', key: 'role', value: 'Software Developer & Ecosystem Architect' },
      { kind: 'kv', key: 'craft', value: 'Full-stack web developer' },
      { kind: 'kv', key: 'based', value: 'San Antonio, TX' },
      { kind: 'separator' },
      { kind: 'detail', text: 'I build custom browser experiences backed by real APIs.' },
      { kind: 'detail', text: 'Bridging creative strategy and high-stakes deployment.' },
      { kind: 'detail', text: 'Founder of DEVSA, lead developer at 434 MEDIA.' },
      { kind: 'detail', text: 'Currently building with Claude Code, MCP, and small composable agent tools.' },
    ],
  },
  {
    name: 'now',
    description: 'Current focus',
    category: 'content',
    run: () => [
      { kind: 'action', text: 'Current focus' },
      { kind: 'result', text: 'Design — visual systems and interfaces that feel inevitable.' },
      { kind: 'result', text: 'Workflows — internal tooling that turns ops chaos into shipped outcomes.' },
      { kind: 'result', text: 'Agents — practical loops with Claude & MCP that do real work.' },
    ],
  },
  {
    name: 'work',
    description: 'Selected projects',
    category: 'content',
    run: () => [
      { kind: 'action', text: 'Listing projects' },
      { kind: 'result', text: '4 projects found' },
      { kind: 'separator' },
      { kind: 'kv', key: 'DEVSA', value: 'Community platform · Next.js + Firebase' },
      { kind: 'link', label: 'devsa.community', href: 'https://devsa.community', external: true },
      { kind: 'separator' },
      { kind: 'kv', key: '434 MEDIA', value: 'Agency digital platform · editorial + CMS' },
      { kind: 'link', label: '434media.com', href: 'https://434media.com', external: true },
      { kind: 'separator' },
      { kind: 'kv', key: 'SA Tech Day', value: '$100K pitch competition · custom admin + live voting' },
      { kind: 'link', label: 'sanantoniotechday.com', href: 'https://www.sanantoniotechday.com', external: true },
      { kind: 'separator' },
      { kind: 'kv', key: 'TXMX Boxing', value: 'Live event games · leaderboards · props + polls' },
      { kind: 'link', label: 'txmxboxing.com', href: 'https://www.txmxboxing.com', external: true },
    ],
  },
  {
    name: 'contact',
    description: 'Get in touch',
    category: 'content',
    run: () => [
      { kind: 'action', text: 'Contact' },
      { kind: 'kv', key: 'email', value: 'jesseovr@gmail.com' },
      { kind: 'kv', key: 'phone', value: '210.816.1144' },
      { kind: 'kv', key: 'calendar', value: 'book a 30-min call' },
      { kind: 'link', label: 'calendar.app.google/GGGGQiP9rCG4wtk79', href: 'https://calendar.app.google/GGGGQiP9rCG4wtk79', external: true },
      { kind: 'separator' },
      { kind: 'kv', key: 'github', value: '@jessebubble' },
      { kind: 'kv', key: 'linkedin', value: '/in/jessebubble' },
      { kind: 'kv', key: 'x', value: '@jessebubble' },
    ],
  },
  {
    name: 'resume',
    description: 'Open the resume page',
    category: 'navigate',
    run: (ctx) => {
      setTimeout(() => ctx.navigate('/resume'), 600);
      return [
        { kind: 'action', text: 'Opening /resume' },
        { kind: 'meta', text: 'navigating in a moment...' },
      ];
    },
  },
  {
    name: 'lab',
    description: 'Open the lab (verlet physics bio)',
    category: 'navigate',
    run: (ctx) => {
      setTimeout(() => ctx.navigate('/lab'), 600);
      return [
        { kind: 'action', text: 'Opening /lab' },
        { kind: 'meta', text: 'experiment 001: verlet integration on a constrained string' },
      ];
    },
  },
  {
    name: 'agents',
    description: 'About this terminal',
    category: 'meta',
    run: () => [
      { kind: 'action', text: 'Designed in collaboration with Claude Code' },
      { kind: 'separator' },
      { kind: 'detail', text: 'Architecture: React 19 islands · slash-command dispatcher · streaming output.' },
      { kind: 'detail', text: 'Lines stream at ~80 chars/sec. Type / to discover commands.' },
      { kind: 'meta', text: 'jessebubble.dev is a working example of agent-paired development.' },
    ],
  },
  {
    name: 'help',
    description: 'Show all commands',
    category: 'system',
    run: () => [
      { kind: 'action', text: 'Available commands' },
      ...COMMANDS.map((c) => ({
        kind: 'kv' as const,
        key: `/${c.name}`,
        value: c.description,
      })),
    ],
  },
  {
    name: 'clear',
    description: 'Clear the terminal',
    category: 'system',
    run: (ctx) => {
      ctx.clear();
      return [];
    },
  },
];

export const COMMAND_MAP: Record<string, CommandDef> = Object.fromEntries(
  COMMANDS.map((c) => [c.name, c])
);

export function parseCommand(input: string): string {
  return input.trim().replace(/^\//, '').toLowerCase();
}

export function filterCommands(query: string): CommandDef[] {
  const q = query.toLowerCase();
  if (!q) return COMMANDS;
  // Prefix matches first, then substring matches in description
  const prefix = COMMANDS.filter((c) => c.name.toLowerCase().startsWith(q));
  const inDesc = COMMANDS.filter(
    (c) =>
      !c.name.toLowerCase().startsWith(q) &&
      c.description.toLowerCase().includes(q)
  );
  return [...prefix, ...inDesc];
}
