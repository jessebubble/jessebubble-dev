'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { TerminalIcon } from './components/terminal-icon';
import MobileTerminal from './components/mobile-terminal';
import PhysicsText from './components/physics-text';

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [physicsResetKey, setPhysicsResetKey] = useState(0);

  return (
    <div className="flex flex-col h-dvh bg-background">
      {/* Hero — centered identity + terminal icon */}
      <main className="flex-1 flex flex-col items-center justify-center min-h-0 px-4 sm:px-8 overflow-y-auto">
        <div className="w-full flex flex-col items-center gap-5 stagger-children py-8">
          {/* Identity */}
          <div className="text-center">
            <h1 className="font-pixel text-6xl xl:text-7xl text-foreground tracking-tight mb-1">
              jesse<span className="text-rose">bubble</span>
            </h1>
            <p className="font-pixel text-sm text-foreground/40 tracking-wide uppercase">
              Find your people. Build your future.
            </p>
          </div>

          {/* Terminal icon + hint */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setTerminalOpen(true)}
              className="relative group cursor-pointer select-none text-rose/60 hover:text-rose transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open terminal"
            >
              <TerminalIcon size={24} autoAnimate className="relative z-10 sm:hidden" />
              <TerminalIcon size={28} autoAnimate className="relative z-10 hidden sm:block" />
            </motion.button>
            <motion.p
              className="font-mono text-[11px] text-foreground/20 tracking-wider font-light leading-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              open terminal
            </motion.p>
          </div>

          {/* Physics bio text */}
          <div className="w-full max-w-3xl mx-auto mt-2">
            <PhysicsText resetKey={physicsResetKey} />
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="font-mono text-[11px] text-foreground/25 tracking-wider hidden sm:inline">
                press F for gravity
              </span>
              <span className="font-mono text-[11px] text-foreground/15 hidden sm:inline">·</span>
              <button
                onClick={() => setPhysicsResetKey((k) => k + 1)}
                className="font-mono text-[11px] text-rose/50 hover:text-rose tracking-wider transition-colors cursor-pointer"
              >
                reset
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Terminal drawer */}
      <MobileTerminal isOpen={terminalOpen} onOpenChange={setTerminalOpen} />
    </div>
  );
}
