'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

export default function SectionHero() {
  return (
    <section className="relative w-full h-dvh min-h-150 overflow-hidden bg-foreground">
      <Image
        src="/jesse-speaking.jpg"
        alt="Jesse speaking to a DEVSA gathering in San Antonio"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: '62% 50%' }}
      />

      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/70 via-black/25 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/40 to-transparent pointer-events-none" />

      <motion.div
        className="absolute top-6 left-6 sm:top-8 sm:left-12 z-10"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span className="font-pixel text-sm sm:text-base text-white/80 tracking-tight">
          jesse<span className="text-rose">bubble</span>
        </span>
      </motion.div>

      <motion.div
        className="absolute top-6 right-6 sm:top-8 sm:right-12 z-10 text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <span className="font-mono text-[10px] tracking-widest uppercase text-white/40">
          ▸ devsa · digital canvas
        </span>
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-6 sm:bottom-28 sm:left-12 right-6 z-10 max-w-3xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <h1 className="font-pixel text-5xl sm:text-7xl xl:text-8xl text-white tracking-tight leading-[0.95]">
          jesse<span className="text-rose">bubble</span>
        </h1>
        <p className="font-pixel text-xs sm:text-sm text-white/70 uppercase tracking-[0.15em] mt-3 sm:mt-4">
          Find your people. Build your future.
        </p>
        <p className="font-mono text-[11px] sm:text-xs text-white/40 mt-3 max-w-md leading-relaxed">
          Software developer & community architect. Building the bridges that
          turn regional potential into measurable impact.
        </p>
      </motion.div>
    </section>
  );
}
