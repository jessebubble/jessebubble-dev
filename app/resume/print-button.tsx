'use client';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="font-mono text-xs px-3 py-1.5 border border-rose/50 text-rose hover:bg-rose hover:text-background transition-colors cursor-pointer flex items-center gap-1.5"
      aria-label="Open print dialog to save resume as PDF"
    >
      Download PDF
      <span aria-hidden="true">↓</span>
    </button>
  );
}
