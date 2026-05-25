'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MobileTerminal from './mobile-terminal';
import { TerminalIcon } from './terminal-icon';

export default function TerminalEasterEgg() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <MobileTerminal isOpen={open} onOpenChange={setOpen} />

      <AnimatePresence>
        {!open && (
          <motion.button
            onClick={() => setOpen(true)}
            className="fixed bottom-4 right-4 z-30 print:hidden flex items-center justify-center p-2.5 bg-background/95 backdrop-blur-sm border border-border hover:border-rose/50 transition-colors text-foreground/60 hover:text-rose shadow-sm cursor-pointer"
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ delay: 1.2, duration: 0.4 }}
            aria-label="Open terminal"
            title="Open terminal · press `"
          >
            <TerminalIcon size={18} autoAnimate />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
