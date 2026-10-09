'use client';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="text-sm text-foreground underline decoration-foreground/30 underline-offset-[0.18em] hover:text-rose hover:decoration-rose/40 transition-colors cursor-pointer"
      aria-label="Open print dialog to save resume as PDF"
    >
      Download PDF
    </button>
  );
}
