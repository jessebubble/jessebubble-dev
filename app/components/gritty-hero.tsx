'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { TerminalIcon } from './terminal-icon';

interface GrittyHeroProps {
  onOpenTerminal: () => void;
}

export default function GrittyHero({ onOpenTerminal }: GrittyHeroProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Main image with gritty treatment */}
      <div
        className={`relative h-full transition-all duration-1000 ease-out ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Image with grayscale + contrast boost */}
        <div className="relative gritty-image h-full">
          <Image
            src="/hat-jesse-headshot.jpg"
            alt="jessebubble"
            width={800}
            height={1000}
            priority
            className="w-full h-full object-cover object-top grayscale contrast-125 brightness-110"
            onLoad={() => setLoaded(true)}
          />

          {/* Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none gritty-scanlines" />

          {/* Noise/grain overlay */}
          <div className="absolute inset-0 pointer-events-none gritty-noise opacity-[0.15]" />

          {/* Rose duotone tint */}
          <div className="absolute inset-0 pointer-events-none bg-rose/8 mix-blend-multiply" />

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none gritty-vignette" />
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent pointer-events-none" />

        {/* Terminal button overlay — bottom right of image */}
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-3">
          {/* Hint label */}
          <motion.span
            className="font-mono text-[11px] text-foreground/40 tracking-wider"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            open terminal
          </motion.span>

          {/* Animated arrow pointing to button */}
          <motion.span
            className="text-rose/60 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: [0, 4, 0] }}
            transition={{
              opacity: { delay: 1.5, duration: 0.4 },
              x: { delay: 2, duration: 1.2, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            →
          </motion.span>

          {/* Button with pulse ring */}
          <motion.button
            onClick={onOpenTerminal}
            className="relative flex items-center justify-center w-12 h-12 border bg-background/80 backdrop-blur-sm border-border text-foreground/60 hover:text-foreground hover:border-rose/50 cursor-pointer transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.4, type: 'spring' }}
            aria-label="Open terminal"
          >
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 border border-rose/40"
              initial={{ opacity: 0.6, scale: 1 }}
              animate={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 2, repeat: 3, delay: 2.5 }}
            />
            <TerminalIcon size={24} />
          </motion.button>
        </div>

        {/* Terminal-style label overlay */}
        <div className="absolute bottom-6 left-4 font-mono text-[11px] text-foreground/30 tracking-widest uppercase">
          <span className="text-rose/50">▸</span> hero.jpg — 2026
        </div>
      </div>

      {!loaded && (
        <div className="text-muted font-pixel text-sm py-20 text-center">
          loading...
        </div>
      )}
    </div>
  );
}
