'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  COMMANDS,
  COMMAND_MAP,
  filterCommands,
  parseCommand,
  type OutputLine,
  type RunContext,
} from './terminal-commands';
import { OutputLineView } from './terminal-output-line';
import { SlashMenu } from './terminal-slash-menu';

const QUICK_CHIPS = ['about', 'now', 'work', 'resume', 'lab', 'agents'];

export default function Terminal() {
  const [lines, setLines] = useState<OutputLine[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandCount, setCommandCount] = useState(0);
  const [streamFromIndex, setStreamFromIndex] = useState(0);
  const [slashIndex, setSlashIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const slashQuery = input.startsWith('/') ? input.slice(1) : null;
  const slashCandidates = useMemo(
    () => (slashQuery !== null ? filterCommands(slashQuery) : []),
    [slashQuery]
  );
  const slashOpen = slashQuery !== null && slashCandidates.length > 0;

  // Keep slash selection in bounds when candidates change
  useEffect(() => {
    if (slashIndex >= slashCandidates.length) setSlashIndex(0);
  }, [slashCandidates.length, slashIndex]);

  // Reset selection when slash menu opens
  useEffect(() => {
    if (slashQuery !== null) setSlashIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slashQuery === null]);

  // Auto-scroll to bottom when lines change
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runCommand = useCallback(
    (rawInput: string) => {
      const trimmed = rawInput.trim();
      if (!trimmed) return;

      const name = parseCommand(trimmed);
      const cmd = COMMAND_MAP[name];

      const ctx: RunContext = {
        navigate: (path) => router.push(path),
        open: (url) => window.open(url, '_blank', 'noopener,noreferrer'),
        clear: () => {
          setLines([]);
          setStreamFromIndex(0);
        },
      };

      setCommandCount((c) => c + 1);
      setHistory((h) => [...h, trimmed]);
      setHistoryIndex(-1);

      // /clear is special: run side effect, no echo
      if (cmd?.name === 'clear') {
        cmd.run(ctx);
        return;
      }

      const echo: OutputLine = { kind: 'echo', text: trimmed };

      if (!cmd) {
        setLines((prev) => {
          setStreamFromIndex(prev.length);
          return [
            ...prev,
            echo,
            { kind: 'error', text: `command not found: ${trimmed}` },
            { kind: 'meta', text: 'type / to see available commands' },
          ];
        });
        return;
      }

      const output = cmd.run(ctx);
      setLines((prev) => {
        setStreamFromIndex(prev.length);
        return [...prev, echo, ...output];
      });
    },
    [router]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (slashOpen) {
      const cmd = slashCandidates[slashIndex];
      runCommand(`/${cmd.name}`);
      setInput('');
      return;
    }
    runCommand(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Slash menu navigation
    if (slashOpen) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSlashIndex((i) => Math.min(i + 1, slashCandidates.length - 1));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSlashIndex((i) => Math.max(i - 1, 0));
        return;
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        const cmd = slashCandidates[slashIndex];
        setInput(`/${cmd.name}`);
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        setInput('');
        return;
      }
    }

    // History navigation (when slash menu is closed)
    if (!slashOpen && e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex =
          historyIndex === -1
            ? history.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (!slashOpen && e.key === 'ArrowDown') {
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

  const handleChipClick = (name: string) => {
    runCommand(`/${name}`);
    inputRef.current?.focus();
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <div
      className="w-full flex flex-col flex-1 min-h-0 h-full font-mono bg-surface"
      onClick={focusInput}
    >
      {/* Top status strip */}
      <div className="px-4 sm:px-5 py-2 shrink-0 flex items-center justify-between border-b border-border bg-background">
        <div className="flex items-baseline gap-2 text-[11px]">
          <span className="font-pixel text-sm text-foreground tracking-tight">
            jesse<span className="text-rose">bubble</span>
          </span>
          <span className="text-foreground/25">·</span>
          <span className="font-mono text-foreground/40">terminal</span>
        </div>
        <span className="text-foreground/30 text-[10px] tracking-widest uppercase font-mono hidden sm:inline">
          type <kbd className="text-foreground/50">/</kbd> for commands
        </span>
      </div>

      {/* Scrollable output region */}
      <div
        ref={outputRef}
        className="scanline relative flex-1 overflow-y-auto terminal-output px-4 sm:px-5 py-3 font-mono text-[12px] sm:text-sm leading-[1.7] tracking-wide"
      >
        {/* Quick chips */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {QUICK_CHIPS.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleChipClick(cmd);
              }}
              className="text-[10px] font-mono px-2 py-1 border border-border text-foreground/45 hover:text-rose hover:border-rose/40 transition-colors cursor-pointer"
            >
              /{cmd}
            </button>
          ))}
        </div>

        {/* Welcome banner — only when terminal is empty */}
        {lines.length === 0 && (
          <div className="text-foreground/35 text-[11px] leading-relaxed">
            <p>
              Welcome. {COMMANDS.length} commands available — click a chip or
              type <span className="text-rose/70">/</span> to see them all.
            </p>
          </div>
        )}

        {/* Output lines */}
        {lines.map((line, i) => (
          <OutputLineView key={i} line={line} stream={i >= streamFromIndex} />
        ))}
      </div>

      {/* Input row (fixed below output) */}
      <div className="shrink-0 border-t border-border bg-surface px-4 sm:px-5 py-2.5 relative">
        <SlashMenu
          visible={slashOpen}
          commands={slashCandidates}
          selectedIndex={slashIndex}
          onSelect={(cmd) => {
            runCommand(`/${cmd.name}`);
            setInput('');
          }}
        />
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-rose font-medium mr-1.5">›</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none text-foreground caret-transparent font-mono text-[13px] sm:text-sm tracking-wide flex-1"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
          <span className="cursor-blink text-rose text-sm">█</span>
        </form>
      </div>

      {/* Mode line */}
      <div className="px-4 sm:px-5 py-1.5 flex items-center justify-between border-t border-border shrink-0 bg-background text-[10px] font-mono tracking-wider">
        <div className="flex items-center gap-2 text-foreground/40">
          <span>~/jessebubble</span>
          <span className="text-foreground/20">·</span>
          <span>main</span>
          <span className="text-foreground/20 hidden sm:inline">·</span>
          <span className="hidden sm:inline">
            {commandCount} {commandCount === 1 ? 'run' : 'runs'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-foreground/40">
          <span className="text-rose/70">●</span>
          <span className="hidden sm:inline">design · workflows · agents</span>
          <span className="sm:hidden">focus</span>
        </div>
      </div>
    </div>
  );
}
