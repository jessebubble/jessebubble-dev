'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Terminal from './terminal';

interface MobileTerminalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MobileTerminal({ isOpen, onOpenChange }: MobileTerminalProps) {

  // Close on escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
    }
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onOpenChange]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => onOpenChange(false)}
          />
        )}
      </AnimatePresence>

      {/* Terminal drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-40"
            style={{ height: '75vh', maxHeight: '75vh' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
              mass: 0.8,
            }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-2 pb-1 bg-surface-light rounded-t-2xl border-t border-x border-border">
              <div className="w-10 h-1 rounded-full bg-foreground/20" />
            </div>

            {/* Terminal content */}
            <div className="h-full bg-surface border-x border-border overflow-hidden flex flex-col">
              <Terminal />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
