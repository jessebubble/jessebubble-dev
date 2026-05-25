'use client';

import { useEffect, useState, useRef } from 'react';
import type { OutputLine } from './terminal-commands';

const CHAR_DELAY_MS = 12;

function useTypewriter(text: string, enabled: boolean) {
  const [displayed, setDisplayed] = useState(enabled ? '' : text);
  const skipRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      setDisplayed(text);
      return;
    }
    setDisplayed('');
    skipRef.current = false;
    let i = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (skipRef.current) {
        setDisplayed(text);
        return;
      }
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i < text.length) {
        timeoutId = setTimeout(tick, CHAR_DELAY_MS);
      }
    };
    timeoutId = setTimeout(tick, CHAR_DELAY_MS);
    return () => {
      clearTimeout(timeoutId);
      skipRef.current = true;
    };
  }, [text, enabled]);

  return displayed;
}

function EchoLine({ text }: { text: string }) {
  return (
    <div className="flex items-baseline gap-1.5 mt-3 first:mt-0">
      <span className="text-rose">›</span>
      <span className="text-foreground">{text}</span>
    </div>
  );
}

function ActionLine({ text, stream }: { text: string; stream: boolean }) {
  const displayed = useTypewriter(text, stream);
  return (
    <div className="flex items-baseline gap-2 mt-1">
      <span className="text-rose shrink-0">⏺</span>
      <span className="text-foreground">{displayed}</span>
    </div>
  );
}

function ResultLine({ text, stream }: { text: string; stream: boolean }) {
  const displayed = useTypewriter(text, stream);
  return (
    <div className="flex items-baseline gap-2 pl-3">
      <span className="text-rose/40 shrink-0">⎿</span>
      <span className="text-foreground/70">{displayed}</span>
    </div>
  );
}

function DetailLine({ text, stream }: { text: string; stream: boolean }) {
  const displayed = useTypewriter(text, stream);
  return <div className="pl-5 text-foreground/60">{displayed}</div>;
}

function KvLine({
  k,
  v,
  stream,
}: {
  k: string;
  v: string;
  stream: boolean;
}) {
  const displayed = useTypewriter(v, stream);
  return (
    <div className="flex items-baseline gap-3 pl-3">
      <span className="text-foreground/40 text-[10px] tracking-widest uppercase w-20 sm:w-24 shrink-0">
        {k}
      </span>
      <span className="text-foreground/85">{displayed}</span>
    </div>
  );
}

function LinkLine({
  label,
  href,
  external,
}: {
  label: string;
  href: string;
  external?: boolean;
}) {
  return (
    <div className="pl-30 sm:pl-35 -mt-0.5">
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="text-rose hover:underline text-[12px]"
      >
        {label}
        {external && <span className="text-rose/60 ml-1 text-[10px]">↗</span>}
      </a>
    </div>
  );
}

function MetaLine({ text, stream }: { text: string; stream: boolean }) {
  const displayed = useTypewriter(text, stream);
  return (
    <div className="pl-5 text-foreground/35 text-[11px] italic mt-0.5">
      {displayed}
    </div>
  );
}

function ErrorLine({ text }: { text: string }) {
  return (
    <div className="flex items-baseline gap-2 mt-1">
      <span className="text-rose shrink-0">✗</span>
      <span className="text-foreground/70">{text}</span>
    </div>
  );
}

export function OutputLineView({
  line,
  stream,
}: {
  line: OutputLine;
  stream: boolean;
}) {
  switch (line.kind) {
    case 'echo':
      return <EchoLine text={line.text} />;
    case 'action':
      return <ActionLine text={line.text} stream={stream} />;
    case 'result':
      return <ResultLine text={line.text} stream={stream} />;
    case 'detail':
      return <DetailLine text={line.text} stream={stream} />;
    case 'kv':
      return <KvLine k={line.key} v={line.value} stream={stream} />;
    case 'link':
      return <LinkLine label={line.label} href={line.href} external={line.external} />;
    case 'meta':
      return <MetaLine text={line.text} stream={stream} />;
    case 'error':
      return <ErrorLine text={line.text} />;
    case 'separator':
      return <div className="h-1" />;
  }
}
