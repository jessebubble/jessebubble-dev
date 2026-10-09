'use client';

import { useEffect, useRef, useState } from 'react';

const TEXT =
  "San Antonio native and software developer bridging the gap between creative strategy and technical execution. Whether engineering digital infrastructure or unifying the local tech space through DEVSA, I build the bridges that turn regional potential into measurable impact. By managing strategic partnerships and providing builders with the resources to ship their ideas, I architect the vital infrastructure for San Antonio's growing ecosystem.";

const GRAPHEMES = [
  ...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(TEXT),
].map((s) => s.segment);

const FONT_FAMILY =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
const CONSTRAINT_SLACK = 1.2;
const UNLOCK_THRESHOLD = 1;
const ITERATIONS = 12;
const DAMPING = 0.97;
const GRAVITY = 0.15;
const BOUNCE = 0.4;
const FIXED_DT = 1 / 120;
const MAX_STEPS = 4;
const HOVER_RADIUS = 90;
const WAKE_RADIUS = 80;
const WAKE_STRENGTH = 0.04;
const MAX_FLING = 40;

interface Letter {
  ch: string;
  w: number;
  x: number;
  y: number;
  ox: number;
  oy: number;
  px: number;
  py: number;
  locked: boolean;
  dragged: boolean;
  // Last values written to the DOM, so unchanged letters skip style writes
  rx: number;
  ry: number;
  opacity: number;
}

interface Drag {
  idx: number;
  offsetX: number;
  offsetY: number;
  vx: number;
  vy: number;
}

function typeScale(width: number) {
  const fontSize = width < 420 ? 14 : width < 640 ? 15 : 17;
  return { fontSize, lineHeight: Math.round(fontSize * 1.75) };
}

// Greedy word wrap over measured graphemes. Returns each grapheme's resting
// position plus the grapheme indices on each line.
function layoutText(widths: number[], maxWidth: number, lineHeight: number) {
  const positions: { x: number; y: number }[] = [];
  const lines: number[][] = [[]];
  let x = 0;
  let y = 0;

  for (let gi = 0; gi < GRAPHEMES.length; gi++) {
    const w = widths[gi];
    if (GRAPHEMES[gi] === ' ' && x > 0) {
      let wordW = 0;
      for (let j = gi + 1; j < GRAPHEMES.length && GRAPHEMES[j] !== ' '; j++) {
        wordW += widths[j];
      }
      if (x + w + wordW > maxWidth) {
        positions.push({ x, y });
        lines[lines.length - 1].push(gi);
        x = 0;
        y += lineHeight;
        lines.push([]);
        continue;
      }
    }
    positions.push({ x, y });
    lines[lines.length - 1].push(gi);
    x += w;
  }

  return { positions, lines, height: y + lineHeight };
}

// Snake the string through the lines, alternating direction, so neighbours on
// the string are neighbours on screen and the tail is the final character.
function snakeOrder(lines: number[][]) {
  const last = lines.length - 1;
  return lines.flatMap((line, li) =>
    (last - li) % 2 === 1 ? [...line].reverse() : line
  );
}

export default function PhysicsText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const looseRef = useRef<HTMLSpanElement>(null);
  const gravityRef = useRef(true);
  const unravelRef = useRef<() => void>(() => {});
  const [resetKey, setResetKey] = useState(0);
  const [gravity, setGravity] = useState(true);

  useEffect(() => {
    gravityRef.current = gravity;
  }, [gravity]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const measure = document.createElement('canvas').getContext('2d')!;

    let letters: Letter[] = [];
    let els: HTMLSpanElement[] = [];
    let rests: number[] = [];
    let lineHeight = 28;
    let radius = 7;
    let builtWidth = -1;
    let unravelIdx = -1;
    let looseCount = -1;
    let raf = 0;
    let lastTime = -1;
    let accumulator = 0;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const drags = new Map<number, Drag>();
    const pointer = { x: 0, y: 0, vx: 0, vy: 0, active: false };
    const bounds = { minX: 0, minY: 0, maxX: 0, maxY: 0 };
    const grid = new Map<number, number[]>();

    function build() {
      const width = container!.clientWidth;
      builtWidth = width;
      const scale = typeScale(width);
      lineHeight = scale.lineHeight;
      radius = scale.fontSize * 0.45;
      measure.font = `${scale.fontSize}px ${FONT_FAMILY}`;

      const widths = GRAPHEMES.map((g) => measure.measureText(g).width);
      const { positions, lines, height } = layoutText(
        widths,
        width,
        lineHeight
      );

      letters = snakeOrder(lines).map((ri) => {
        const p = positions[ri];
        return {
          ch: GRAPHEMES[ri],
          w: widths[ri],
          x: p.x,
          y: p.y,
          ox: p.x,
          oy: p.y,
          px: p.x,
          py: p.y,
          locked: true,
          dragged: false,
          rx: NaN,
          ry: NaN,
          opacity: -1,
        };
      });

      rests = [];
      for (let i = 0; i < letters.length - 1; i++) {
        const a = letters[i];
        const b = letters[i + 1];
        rests.push(
          Math.hypot(b.ox + b.w / 2 - (a.ox + a.w / 2), b.oy - a.oy) *
            CONSTRAINT_SLACK
        );
      }

      const font = `${scale.fontSize}px/${lineHeight}px ${FONT_FAMILY}`;
      els = letters.map((l) => {
        const span = document.createElement('span');
        span.className = 'physics-letter';
        span.textContent = l.ch;
        span.style.font = font;
        return span;
      });
      container!.replaceChildren(...els);
      container!.style.height = `${height + 8}px`;

      drags.clear();
      unravelIdx = -1;
      looseCount = -1;
    }

    function release(l: Letter) {
      l.locked = false;
      l.px = l.x;
      l.py = l.y;
    }

    build();

    unravelRef.current = () => {
      gravityRef.current = true;
      setGravity(true);
      unravelIdx = letters.length - 1;
    };

    // Pointer input: grab any letter; a locked one peels free on grab
    const toLocal = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handlePointerDown = (e: PointerEvent) => {
      const idx = els.indexOf(e.target as HTMLSpanElement);
      if (idx === -1 || letters[idx].dragged) return;
      const l = letters[idx];
      if (l.locked) release(l);
      const p = toLocal(e);
      drags.set(e.pointerId, {
        idx,
        offsetX: p.x - l.x,
        offsetY: p.y - l.y,
        vx: 0,
        vy: 0,
      });
      l.dragged = true;
      els[idx].classList.add('physics-dragging');
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      e.preventDefault();
    };

    const handlePointerMove = (e: PointerEvent) => {
      const p = toLocal(e);
      if (pointer.active) {
        pointer.vx = p.x - pointer.x;
        pointer.vy = p.y - pointer.y;
      }
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.active = true;

      const d = drags.get(e.pointerId);
      if (!d) return;
      const l = letters[d.idx];
      const nx = p.x - d.offsetX;
      const ny = p.y - d.offsetY;
      d.vx = d.vx * 0.5 + (nx - l.x) * 0.5;
      d.vy = d.vy * 0.5 + (ny - l.y) * 0.5;
      l.x = l.px = nx;
      l.y = l.py = ny;
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') pointer.active = false;
      const d = drags.get(e.pointerId);
      if (!d) return;
      const l = letters[d.idx];
      l.dragged = false;
      // Carry the drag velocity into the release so letters can be flung
      const clamp = (v: number) => Math.max(-MAX_FLING, Math.min(MAX_FLING, v));
      l.px = l.x - clamp(d.vx * 0.5);
      l.py = l.y - clamp(d.vy * 0.5);
      els[d.idx].classList.remove('physics-dragging');
      drags.delete(e.pointerId);
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t.isContentEditable || t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) return;
      const key = e.key.toLowerCase();
      if (key === 'f') unravelRef.current();
      else if (key === 'g') setGravity((g) => !g);
      else if (key === 'r') {
        setGravity(true);
        setResetKey((k) => k + 1);
      }
    };

    // Rebuild the layout when the available width changes
    const resizeObserver = new ResizeObserver(() => {
      if (Math.abs(container.clientWidth - builtWidth) < 1) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 150);
    });
    resizeObserver.observe(container);

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    document.documentElement.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);
    window.addEventListener('keydown', handleKey);

    function simulate() {
      // Let it fall: free one letter per step, starting from the tail
      if (unravelIdx >= 0) {
        while (unravelIdx >= 0 && !letters[unravelIdx].locked) unravelIdx--;
        if (unravelIdx >= 0) release(letters[unravelIdx--]);
      }

      // Peel: a loose letter stretched past its rest length frees its
      // locked neighbour, in either direction along the string
      for (let i = 0; i < letters.length - 1; i++) {
        const a = letters[i];
        const b = letters[i + 1];
        if (a.locked === b.locked) continue;
        const anchor = a.locked ? a : b;
        const free = a.locked ? b : a;
        const dist = Math.hypot(
          free.x + free.w / 2 - (anchor.ox + anchor.w / 2),
          free.y - anchor.oy
        );
        if (dist > rests[i] + UNLOCK_THRESHOLD) release(anchor);
      }

      // Verlet integration
      const g = gravityRef.current ? GRAVITY : 0;
      for (const l of letters) {
        if (l.locked || l.dragged) continue;
        const vx = (l.x - l.px) * DAMPING;
        const vy = (l.y - l.py) * DAMPING;
        l.px = l.x;
        l.py = l.y;
        l.x += vx;
        l.y += vy + g;
      }

      // Wake: a moving cursor stirs loose letters it passes through. Driven
      // by cursor velocity only, so a still cursor never pushes a letter away
      // from the hand reaching for it.
      if (!reduceMotion && pointer.active && (pointer.vx || pointer.vy)) {
        for (const l of letters) {
          if (l.locked || l.dragged) continue;
          const d = Math.hypot(
            l.x + l.w / 2 - pointer.x,
            l.y + lineHeight / 2 - pointer.y
          );
          if (d >= WAKE_RADIUS) continue;
          const f = (1 - d / WAKE_RADIUS) * WAKE_STRENGTH;
          l.x += pointer.vx * f;
          l.y += pointer.vy * f;
        }
      }
      pointer.vx *= 0.8;
      pointer.vy *= 0.8;

      // Distance constraints
      for (let iter = 0; iter < ITERATIONS; iter++) {
        for (let i = 0; i < letters.length - 1; i++) {
          const a = letters[i];
          const b = letters[i + 1];
          if (a.locked && b.locked) continue;
          const dx = b.x + b.w / 2 - (a.x + a.w / 2);
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.001;
          const diff = (dist - rests[i]) / dist;
          const aFixed = a.locked || a.dragged;
          const bFixed = b.locked || b.dragged;
          if (aFixed && !bFixed) {
            b.x -= dx * diff;
            b.y -= dy * diff;
          } else if (!aFixed && bFixed) {
            a.x += dx * diff;
            a.y += dy * diff;
          } else if (!aFixed && !bFixed) {
            a.x += dx * diff * 0.5;
            a.y += dy * diff * 0.5;
            b.x -= dx * diff * 0.5;
            b.y -= dy * diff * 0.5;
          }
        }
      }

      // Letter collisions, bucketed into a spatial hash so each letter only
      // checks the letters in its own and neighbouring cells
      const cell = radius * 2;
      grid.clear();
      for (let i = 0; i < letters.length; i++) {
        const l = letters[i];
        if (l.locked) continue;
        const key =
          Math.floor((l.x + l.w / 2) / cell) * 100003 +
          Math.floor((l.y + lineHeight / 2) / cell);
        const bucket = grid.get(key);
        if (bucket) bucket.push(i);
        else grid.set(key, [i]);
      }
      for (let i = 0; i < letters.length; i++) {
        const a = letters[i];
        if (a.locked) continue;
        const cx = Math.floor((a.x + a.w / 2) / cell);
        const cy = Math.floor((a.y + lineHeight / 2) / cell);
        for (let gx = cx - 1; gx <= cx + 1; gx++) {
          for (let gy = cy - 1; gy <= cy + 1; gy++) {
            const bucket = grid.get(gx * 100003 + gy);
            if (!bucket) continue;
            for (const j of bucket) {
              if (j <= i || j === i + 1) continue;
              const b = letters[j];
              const dx = b.x + b.w / 2 - (a.x + a.w / 2);
              const dy = b.y - a.y;
              const dist = Math.hypot(dx, dy) || 0.001;
              if (dist >= cell) continue;
              const overlap = ((cell - dist) / dist) * 0.5;
              if (a.dragged) {
                b.x += dx * overlap;
                b.y += dy * overlap;
              } else if (b.dragged) {
                a.x -= dx * overlap;
                a.y -= dy * overlap;
              } else {
                a.x -= dx * overlap;
                a.y -= dy * overlap;
                b.x += dx * overlap;
                b.y += dy * overlap;
              }
            }
          }
        }
      }

      // Keep loose letters inside the viewport
      for (const l of letters) {
        if (l.locked || l.dragged) continue;
        if (l.x < bounds.minX) {
          l.x = bounds.minX;
          l.px = l.x + (l.x - l.px) * BOUNCE;
        }
        if (l.x + l.w > bounds.maxX) {
          l.x = bounds.maxX - l.w;
          l.px = l.x + (l.x - l.px) * BOUNCE;
        }
        if (l.y < bounds.minY) {
          l.y = bounds.minY;
          l.py = l.y + (l.y - l.py) * BOUNCE;
        }
        if (l.y + lineHeight > bounds.maxY) {
          l.y = bounds.maxY - lineHeight;
          l.py = l.y + (l.y - l.py) * BOUNCE;
        }
      }
    }

    // Fixed-timestep render loop
    function render(now: number) {
      raf = requestAnimationFrame(render);
      if (lastTime < 0) {
        lastTime = now;
        return;
      }
      accumulator += Math.min((now - lastTime) / 1000, MAX_STEPS * FIXED_DT);
      lastTime = now;

      const rect = container!.getBoundingClientRect();
      bounds.minX = -rect.left;
      bounds.minY = -rect.top;
      bounds.maxX = document.documentElement.clientWidth - rect.left;
      bounds.maxY = window.innerHeight - rect.top;

      while (accumulator >= FIXED_DT) {
        simulate();
        accumulator -= FIXED_DT;
      }

      let loose = 0;
      for (let i = 0; i < letters.length; i++) {
        const l = letters[i];
        const el = els[i];
        if (!l.locked) loose++;

        if (l.x !== l.rx || l.y !== l.ry) {
          el.style.transform = `translate(${l.x}px, ${l.y}px)`;
          l.rx = l.x;
          l.ry = l.y;
        }

        // Letters near the cursor brighten, so the text reads as touchable
        let opacity = l.dragged ? 1 : l.locked ? 0.4 : 0.8;
        if (pointer.active) {
          const d = Math.hypot(
            l.x + l.w / 2 - pointer.x,
            l.y + lineHeight / 2 - pointer.y
          );
          if (d < HOVER_RADIUS) {
            opacity = Math.min(1, opacity + (1 - d / HOVER_RADIUS) * 0.5);
          }
        }
        opacity = Math.round(opacity * 20) / 20;
        if (opacity !== l.opacity) {
          el.style.opacity = String(opacity);
          l.opacity = opacity;
        }
      }

      if (loose !== looseCount && looseRef.current) {
        looseRef.current.textContent = String(loose);
        looseCount = loose;
      }
    }

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      document.documentElement.removeEventListener(
        'pointerleave',
        handlePointerLeave
      );
      window.removeEventListener('blur', handlePointerLeave);
      window.removeEventListener('keydown', handleKey);
    };
  }, [resetKey]);

  return (
    <div>
      <p className="sr-only">{TEXT}</p>
      <div
        ref={containerRef}
        aria-hidden="true"
        className="relative w-full select-none"
      />

      <div className="flex items-center justify-between mt-10 pt-6 border-t border-border flex-wrap gap-4">
        <span className="font-mono text-[11px] text-foreground/40 tracking-wider">
          <span ref={looseRef} className="text-rose tabular-nums">
            0
          </span>{' '}
          / {GRAPHEMES.length} loose
          <span className="hidden sm:inline"> · grab any letter</span>
        </span>

        <div className="flex items-center gap-5">
          <ControlButton keyHint="F" onClick={() => unravelRef.current()}>
            let it fall
          </ControlButton>
          <ControlButton
            keyHint="G"
            pressed={gravity}
            onClick={() => setGravity((g) => !g)}
          >
            gravity {gravity ? 'on' : 'off'}
          </ControlButton>
          <ControlButton
            keyHint="R"
            onClick={() => {
              setGravity(true);
              setResetKey((k) => k + 1);
            }}
          >
            reset ↻
          </ControlButton>
        </div>
      </div>
    </div>
  );
}

function ControlButton({
  keyHint,
  pressed,
  onClick,
  children,
}: {
  keyHint: string;
  pressed?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      aria-keyshortcuts={keyHint}
      className="font-mono text-[11px] text-rose/70 hover:text-rose tracking-wider transition-colors cursor-pointer inline-flex items-baseline gap-1.5"
    >
      {children}
      <kbd className="hidden sm:inline text-foreground/30">{keyHint}</kbd>
    </button>
  );
}
