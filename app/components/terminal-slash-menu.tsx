'use client';

import { motion, AnimatePresence } from 'motion/react';
import type { CommandDef, CommandCategory } from './terminal-commands';

const CATEGORY_LABEL: Record<CommandCategory, string> = {
  content: 'CONTENT',
  navigate: 'NAVIGATE',
  meta: 'META',
  system: 'SYSTEM',
};

interface Props {
  visible: boolean;
  commands: CommandDef[];
  selectedIndex: number;
  onSelect: (cmd: CommandDef) => void;
}

export function SlashMenu({
  visible,
  commands,
  selectedIndex,
  onSelect,
}: Props) {
  return (
    <AnimatePresence>
      {visible && commands.length > 0 && (
        <motion.div
          className="absolute bottom-full left-0 right-0 mb-1 bg-background border border-border max-h-64 overflow-y-auto z-20 shadow-lg"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.12, ease: 'easeOut' }}
        >
          <div className="px-3 py-1.5 text-[9px] tracking-widest uppercase text-foreground/30 border-b border-border bg-surface">
            commands · {commands.length}
          </div>
          {commands.map((cmd, i) => (
            <button
              key={cmd.name}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                onSelect(cmd);
              }}
              className={`w-full flex items-baseline gap-3 px-3 py-1.5 text-left font-mono text-xs cursor-pointer transition-colors ${
                i === selectedIndex
                  ? 'bg-rose/10 text-foreground'
                  : 'text-foreground/70 hover:bg-rose/5 hover:text-foreground'
              }`}
            >
              <span
                className={`shrink-0 w-20 ${
                  i === selectedIndex ? 'text-rose' : 'text-foreground/80'
                }`}
              >
                /{cmd.name}
              </span>
              <span className="flex-1 text-foreground/50 text-[11px] truncate">
                {cmd.description}
              </span>
              <span className="text-foreground/25 text-[9px] tracking-widest uppercase shrink-0">
                {CATEGORY_LABEL[cmd.category]}
              </span>
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
