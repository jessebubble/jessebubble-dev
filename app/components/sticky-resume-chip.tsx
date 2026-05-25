'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

export default function StickyResumeChip() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-4 right-4 z-30 print:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Link
            href="/resume"
            className="group flex items-center gap-2 px-3.5 py-2 bg-background/95 backdrop-blur-sm border border-rose/40 text-foreground hover:bg-rose hover:text-background hover:border-rose font-mono text-xs tracking-wide transition-colors shadow-sm"
            aria-label="View resume"
          >
            <span className="text-rose group-hover:text-background text-[10px] transition-colors">
              ▸
            </span>
            <span>Resume</span>
            <span className="text-rose/60 group-hover:text-background/80 text-[10px] transition-colors">
              ↗
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
