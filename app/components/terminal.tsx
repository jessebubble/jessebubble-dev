'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

const SUGGESTIONS = ['about', 'contact', 'work'];

type LineType = 'input' | 'output' | 'accent' | 'bright' | 'dim' | 'link' | 'error' | 'contact-cards' | 'about-card' | 'work-cards';

interface TerminalLine {
  text: string;
  type: LineType;
  url?: string;
}

function getCommandOutput(command: string): TerminalLine[] {
  const cmd = command.trim().toLowerCase();

  switch (cmd) {
    case 'help':
      return [
        { text: '', type: 'output' },
        { text: '  Available Commands:', type: 'accent' },
        { text: '', type: 'output' },
        { text: '  about       → Who is jessebubble?', type: 'bright' },
        { text: '  work        → Portfolio & projects', type: 'bright' },
        { text: '  contact     → Get in touch', type: 'bright' },
        { text: '  clear       → Clear terminal', type: 'bright' },
        { text: '  help        → Show this menu', type: 'bright' },
        { text: '', type: 'output' },
      ];

    case 'about':
      return [
        { text: '', type: 'output' },
        { text: 'about-card', type: 'about-card' },
        { text: '', type: 'output' },
      ];

    case 'work':
      return [
        { text: '', type: 'output' },
        { text: 'work-cards', type: 'work-cards' },
        { text: '', type: 'output' },
        { text: '  "Tools are just tools. They don\'t really', type: 'dim' },
        { text: '   matter\u2014especially to the people trying to', type: 'dim' },
        { text: '   use the websites you build." \u2014 Andy Bell', type: 'dim' },
        { text: '', type: 'output' },
      ];

    case 'contact':
      return [
        { text: '', type: 'output' },
        { text: 'contact-cards', type: 'contact-cards' },
        { text: '', type: 'output' },
        { text: '  Find your people. Build your future.', type: 'accent' },
        { text: '', type: 'output' },
      ];

    case 'clear':
      return [];

    case '':
      return [];

    default:
      return [
        { text: `  command not found: ${command}`, type: 'error' },
        { text: '  Type "help" for available commands', type: 'dim' },
      ];
  }
}

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runCommand = useCallback((command: string) => {
    const trimmed = command.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === 'clear') {
      setLines([]);
      setHistory(prev => [...prev, trimmed]);
      setHistoryIndex(-1);
      return;
    }

    const inputLine: TerminalLine = {
      text: `› ${trimmed}`,
      type: 'input',
    };

    const output = getCommandOutput(trimmed);
    setLines(prev => [...prev, inputLine, ...output]);
    setHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(input);
    setInput('');
  };

  const handleSuggestion = (cmd: string) => {
    runCommand(cmd);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const renderLine = (line: TerminalLine, index: number) => {
    const colorMap: Record<LineType, string> = {
      input: 'text-rose font-medium',
      output: 'text-foreground/70 font-normal',
      accent: 'text-rose font-medium',
      bright: 'text-foreground font-normal',
      dim: 'text-foreground/30 font-light',
      link: 'text-rose-light underline font-normal',
      error: 'text-foreground/60 font-normal',
      'contact-cards': '',
      'about-card': '',
      'work-cards': '',
    };

    if (line.type === 'work-cards') {
      const projects = [
        {
          title: 'DEVSA',
          description: 'Cultivate and manage high-impact relationships with key partners like Geekdom, Tech Bloc, UTSA UC, PyTexas Foundation and the Latina Leadership Institute to mobilize resources for local builders.',
          url: 'https://devsa.community',
          tag: 'Community',
          accent: 'bg-rose',
          icon: '◈',
        },
        {
          title: '434 MEDIA',
          description: 'Lead the technical architecture and visual identity of our digital products, turning bold visions into high-impact reality for venture-backed startups, ecosystems, and industry leaders.',
          url: 'https://434media.com',
          tag: 'Agency',
          accent: 'bg-foreground',
          icon: '▣',
        },
        {
          title: 'San Antonio Tech Day',
          description: 'Ecosystem Infrastructure: Engineered and managed the full-stack digital presence for San Antonio Tech Day 2026 and Tech Fuel, powering the city\'s largest non-dilutive $100K pitch competition and multi-track community summits.',
          url: 'https://www.sanantoniotechday.com/',
          tag: 'Code',
          accent: 'bg-rose-dim',
          icon: '◇',
        },
        {
          title: 'TXMX',
          description: 'Custom platform with creative UI, role-based auth, and admin dashboards — built to manage operations and partner workflows end-to-end.',
          url: 'https://github.com/434media/next-txmx',
          tag: 'Code',
          accent: 'bg-foreground/40',
          icon: '▽',
        },
      ];

      return (
        <div key={index} className="flex flex-col gap-2.5 px-1 py-1 max-w-3xl">
          {projects.map((p) => (
            <a
              key={p.title}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-stretch border border-border rounded-lg overflow-hidden hover:border-rose/40 hover:bg-rose/2 transition-all duration-200"
            >
              {/* Accent bar */}
              <div className={`w-1 shrink-0 ${p.accent}`} />

              {/* Content */}
              <div className="flex-1 px-3.5 py-3 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-rose text-sm">{p.icon}</span>
                  <span className="text-[13px] sm:text-sm font-medium text-foreground group-hover:text-rose transition-colors">
                    {p.title}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-foreground/25 border border-border rounded px-1.5 py-0.5 leading-none">
                    {p.tag}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-foreground/50 leading-relaxed font-normal">
                  {p.description}
                </p>
                <span className="text-[10px] text-rose/40 group-hover:text-rose/70 font-mono mt-1.5 inline-block transition-colors">
                  {p.url.replace('https://', '')} →
                </span>
              </div>
            </a>
          ))}
        </div>
      );
    }

    if (line.type === 'about-card') {
      return (
        <div key={index} className="flex flex-col sm:flex-row gap-4 px-2 py-2">
          {/* Headshot */}
          <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-border">
            <img
              src="/jesse-speaking.jpg"
              alt="jessebubble"
              className="w-full h-full object-cover grayscale"
              style={{ objectPosition: '78% 32%' }}
            />
          </div>
          {/* Bio */}
          <div className="flex flex-col gap-1.5 min-w-0">
            <span className="text-sm sm:text-base font-medium text-foreground leading-snug">
              Software Developer & Community Architect
            </span>
            <p className="max-w-3xl text-xs sm:text-[13px] text-foreground/60 leading-relaxed font-normal">
              San Antonio native building the technical infrastructure that powers regional
              innovation at 434 Media and DEVSA. As a founder and community architect, I bridge
              the gap between creative strategy and high-stakes deployment to turn local potential
              into measurable impact.
            </p>
            <span className="text-[11px] text-rose/60 font-medium tracking-wide mt-0.5">
              Find your people. Build your future.
            </span>
          </div>
        </div>
      );
    }

    if (line.type === 'contact-cards') {
      const contacts = [
        {
          label: 'GitHub',
          url: 'https://github.com/jessebubble',
          handle: '@jessebubble',
          icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          ),
        },
        {
          label: 'LinkedIn',
          url: 'https://www.linkedin.com/in/jessebubble',
          handle: '/in/jessebubble',
          icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          ),
        },
        {
          label: 'X',
          url: 'https://twitter.com/jessebubble',
          handle: '@jessebubble',
          icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          ),
        },
        {
          label: 'Instagram',
          url: 'https://instagram.com/jessebubble',
          handle: '@jessebubble',
          icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          ),
        },
      ];

      return (
        <div key={index} className="flex flex-wrap gap-2 px-2 py-1">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-3 py-2 border border-border rounded-lg text-foreground/60 hover:text-rose hover:border-rose/40 hover:bg-rose/5 transition-all duration-200 group"
            >
              <span className="text-foreground/30 group-hover:text-rose transition-colors">
                {c.icon}
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[11px] font-mono font-medium">{c.label}</span>
                <span className="text-[10px] font-mono text-foreground/30 group-hover:text-rose/60 transition-colors">{c.handle}</span>
              </span>
            </a>
          ))}
        </div>
      );
    }

    if (line.type === 'link' && line.url) {
      return (
        <div key={index}>
          <a
            href={line.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${colorMap[line.type]} hover:text-rose transition-colors`}
          >
            {line.text}
          </a>
        </div>
      );
    }

    return (
      <div key={index} className={colorMap[line.type] || 'text-foreground/70'}>
        {line.text || '\u00A0'}
      </div>
    );
  };

  return (
    <div
      className="w-full flex flex-col flex-1 min-h-0 h-full font-mono"
      onClick={focusInput}
    >
      {/* Branded header — always visible */}
      <div className="px-5 sm:px-6 pt-5 pb-4 shrink-0">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-pixel text-base sm:text-lg text-foreground font-bold tracking-tight">
              jessebubble
            </span>
            <span className="text-foreground/30 text-xs font-mono font-light">v1.0.0</span>
          </div>
          <span className="text-foreground/40 text-[11px] tracking-wide">
            San Antonio, TX
          </span>
          <span className="text-foreground/50 text-[11px]">
            Find your people. Build your future.
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Terminal body */}
      <div
        ref={outputRef}
        className="scanline relative flex-1 bg-surface overflow-y-auto terminal-output px-5 sm:px-6 py-4 font-mono text-[12px] sm:text-sm leading-relaxed sm:leading-[1.8] tracking-wide"
      >
        {/* Clickable topics — always visible */}
        <div className="mb-4">
          <p className="text-foreground/40 text-[13px] sm:text-sm mb-1">
            Welcome — click a topic to explore
          </p>
          <p className="text-foreground/25 text-[11px] mb-3">
            or type a command below
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => handleSuggestion(cmd)}
                className="text-xs font-mono px-3 py-1.5 border border-border rounded-full text-foreground/50 hover:text-rose hover:border-rose/40 transition-all duration-200 cursor-pointer hover:bg-rose/5"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>

        {/* Output lines */}
        {lines.map((line, i) => renderLine(line, i))}

        {/* Input prompt */}
        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <span className="text-rose font-medium mr-1.5">›</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none text-foreground caret-transparent font-mono text-[13px] sm:text-sm font-normal tracking-wide"
            style={{ width: `${Math.max(1, input.length)}ch` }}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
          <span className="cursor-blink text-rose text-sm">█</span>
          <div className="flex-1" />
        </form>
      </div>

      {/* Status bar */}
      <div className="px-5 sm:px-6 py-2.5 flex items-center justify-between border-t border-border shrink-0">
        <span className="text-foreground/25 text-[11px] font-mono tracking-wider">
          click a topic or type below
        </span>
      </div>
    </div>
  );
}
