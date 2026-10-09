import Link from 'next/link';
import PhysicsText from '../components/physics-text';

export default function LabPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="w-full px-6 sm:px-12 py-6 border-b border-border">
        <div className="max-w-4xl mx-auto flex items-baseline justify-between">
          <Link
            href="/"
            className="font-pixel text-base text-foreground tracking-tight hover:text-rose transition-colors"
          >
            ← jessebubble
          </Link>
          <span className="font-mono text-[10px] tracking-widest uppercase text-foreground/40">
            /lab
          </span>
        </div>
      </header>

      <main className="flex-1 flex flex-col justify-center px-6 sm:px-12 py-16">
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="font-mono text-[10px] tracking-widest uppercase text-rose/70">
              experiment 001
            </span>
            <span className="font-mono text-[10px] text-foreground/30 hidden sm:inline">
              {'// verlet integration on a constrained string'}
            </span>
          </div>

          <h1 className="font-pixel text-3xl sm:text-4xl text-foreground tracking-tight leading-tight mb-3">
            Bio as physics.
          </h1>
          <p className="font-mono text-xs text-foreground/50 mb-10 max-w-2xl leading-relaxed">
            Every character is a node on one string that snakes through the
            lines. Grab any letter and pull: once a neighbor stretches past
            its rest length, it peels free. Fling letters, switch gravity off,
            or let the whole bio fall.
          </p>

          <PhysicsText />
        </div>
      </main>

      <footer className="w-full px-6 sm:px-12 py-6 border-t border-border">
        <div className="max-w-4xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <span className="font-mono text-[10px] tracking-widest uppercase text-foreground/30">
            fixed timestep · distance constraints · spatial-hash collisions
          </span>
          <Link
            href="/"
            className="font-mono text-[10px] tracking-widest uppercase text-foreground/40 hover:text-rose transition-colors"
          >
            back to home →
          </Link>
        </div>
      </footer>
    </div>
  );
}
