'use client';

import { useState } from 'react';
import Link from 'next/link';
import PhysicsText from '../components/physics-text';

export default function LabPage() {
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="w-full px-6 sm:px-12 py-6 flex items-baseline justify-between border-b border-border">
        <Link
          href="/"
          className="font-pixel text-base text-foreground tracking-tight hover:text-rose transition-colors"
        >
          ← jesse<span className="text-rose">bubble</span>
        </Link>
        <span className="font-mono text-[10px] tracking-widest uppercase text-foreground/40">
          ▸ /lab
        </span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 py-16">
        <div className="w-full max-w-3xl mx-auto">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="font-mono text-[10px] tracking-widest uppercase text-rose/70">
              ▸ experiment 001
            </span>
            <span className="font-mono text-[10px] text-foreground/30 hidden sm:inline">
              // verlet integration on a constrained string
            </span>
          </div>

          <h1 className="font-pixel text-3xl sm:text-4xl text-foreground tracking-tight leading-tight mb-3">
            Bio as physics.
          </h1>
          <p className="font-mono text-xs text-foreground/50 mb-10 max-w-2xl leading-relaxed">
            Each character is a node. Distance constraints hold the
            string together. Gravity pulls the unlocked tail. Drag a letter
            and the rest unravels.
          </p>

          <PhysicsText resetKey={resetKey} />

          <div className="flex items-center justify-between mt-10 pt-6 border-t border-border flex-wrap gap-3">
            <span className="font-mono text-[11px] text-foreground/40 tracking-wider hidden sm:inline">
              press <kbd className="text-foreground/60">F</kbd> for gravity · drag any unlocked letter
            </span>
            <span className="font-mono text-[11px] text-foreground/40 tracking-wider sm:hidden">
              drag any unlocked letter
            </span>
            <button
              onClick={() => setResetKey((k) => k + 1)}
              className="font-mono text-[11px] text-rose/70 hover:text-rose tracking-wider transition-colors cursor-pointer"
            >
              reset ↻
            </button>
          </div>
        </div>
      </main>

      <footer className="w-full px-6 sm:px-12 py-6 border-t border-border flex items-center justify-between flex-wrap gap-4">
        <span className="font-mono text-[10px] tracking-widest uppercase text-foreground/30">
          fixed-timestep · distance constraints · pointer events
        </span>
        <Link
          href="/"
          className="font-mono text-[10px] tracking-widest uppercase text-foreground/40 hover:text-rose transition-colors"
        >
          back to home →
        </Link>
      </footer>
    </div>
  );
}
