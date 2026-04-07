'use client';

import { useRef, useEffect, useCallback } from 'react';
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';

const TEXT =
  "San Antonio native and software developer bridging the gap between creative strategy and technical execution. Whether engineering digital infrastructure or unifying the local tech space through DEVSA, I build the bridges that turn regional potential into measurable impact. By managing strategic partnerships and providing builders with the resources to ship their ideas, I architect the vital infrastructure for San Antonio's growing ecosystem.";

const FONT =
  '16px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
const LINE_HEIGHT = 28;
const MARGIN = 0;
const CONSTRAINT_DIST = 1.2;
const UNLOCK_THRESHOLD = 1;
const ITERATIONS = 12;
const DAMPING = 0.97;
const GRAVITY = 0.15;

interface Letter {
  ch: string;
  w: number;
  x: number;
  y: number;
  ox: number;
  oy: number;
  px: number;
  py: number;
  readingIdx: number;
  locked: boolean;
}

export default function PhysicsText({ resetKey }: { resetKey?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<Letter[]>([]);
  const elsRef = useRef<HTMLSpanElement[]>([]);
  const restLengthsRef = useRef<number[]>([]);
  const dragsRef = useRef<
    Map<number, { idx: number; offsetX: number; offsetY: number }>
  >(new Map());
  const rafRef = useRef<number>(0);
  const gravityOnRef = useRef(true);
  const unravelingRef = useRef(false);
  const unravelIdxRef = useRef(-1);
  const lastTimeRef = useRef(-1);
  const accumulatorRef = useRef(0);

  const getMaxWidth = useCallback(() => {
    if (!containerRef.current) return 400;
    return containerRef.current.getBoundingClientRect().width - MARGIN * 2;
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    // Clean up any previous run (React strict mode double-mount)
    container.innerHTML = '';
    const measureCtx = document.createElement('canvas').getContext('2d')!;
    measureCtx.font = FONT;

    const prepared = prepareWithSegments(TEXT, FONT);
    const segmenter = new Intl.Segmenter(undefined, {
      granularity: 'grapheme',
    });
    const allGraphemes = [...segmenter.segment(TEXT)].map((s) => s.segment);
    const graphemeWidths = allGraphemes.map(
      (g) => measureCtx.measureText(g).width
    );

    function layoutPositions(maxWidth: number) {
      // First pass: compute positions without centering
      const rawPositions: { x: number; y: number; w: number }[] = [];
      const lineStartIndices: number[] = [0];
      let x = 0;
      let lineY = 0;

      for (let gi = 0; gi < allGraphemes.length; gi++) {
        const g = allGraphemes[gi];
        const w = graphemeWidths[gi];

        if (g === ' ' && x > 0) {
          let wordW = 0;
          for (
            let j = gi + 1;
            j < allGraphemes.length && allGraphemes[j] !== ' ';
            j++
          ) {
            wordW += graphemeWidths[j];
          }
          if (x + w + wordW > maxWidth) {
            rawPositions.push({ x, y: lineY, w });
            x = 0;
            lineY += LINE_HEIGHT;
            lineStartIndices.push(gi + 1);
            continue;
          }
        }
        rawPositions.push({ x, y: lineY, w });
        x += w;
      }

      // Second pass: left-align (no centering offset)
      return rawPositions;
    }

    function buildZigzagMapping(maxWidth: number) {
      const { lines } = layoutWithLines(prepared, maxWidth, LINE_HEIGHT);
      const lineIndices: number[][] = [];
      let gi = 0;
      for (let li = 0; li < lines.length; li++) {
        const lineGraphemes = [...segmenter.segment(lines[li].text)].map(
          (s) => s.segment
        );
        const indices: number[] = [];
        for (let j = 0; j < lineGraphemes.length; j++) {
          indices.push(gi++);
        }
        lineIndices.push(indices);
      }

      const lastLineIdx = lineIndices.length - 1;
      const needFlip = lastLineIdx % 2 === 1;
      const stringOrder: number[] = [];
      for (let li = 0; li < lineIndices.length; li++) {
        const reversed = needFlip ? li % 2 === 0 : li % 2 === 1;
        if (reversed) {
          stringOrder.push(...[...lineIndices[li]].reverse());
        } else {
          stringOrder.push(...lineIndices[li]);
        }
      }
      return stringOrder;
    }

    const maxWidth = getMaxWidth();
    const positions = layoutPositions(maxWidth);
    const stringOrder = buildZigzagMapping(maxWidth);

    const letters: Letter[] = stringOrder.map((ri) => {
      const p = positions[ri];
      return {
        ch: allGraphemes[ri],
        w: p.w,
        x: p.x,
        y: p.y,
        ox: p.x,
        oy: p.y,
        px: p.x,
        py: p.y,
        readingIdx: ri,
        locked: true,
      };
    });
    lettersRef.current = letters;

    // Rest lengths between consecutive letters in string order
    const rests: number[] = [];
    for (let i = 0; i < letters.length - 1; i++) {
      const a = letters[i],
        b = letters[i + 1];
      const dist = Math.hypot(
        b.ox + b.w / 2 - (a.ox + a.w / 2),
        b.oy + LINE_HEIGHT / 2 - (a.oy + LINE_HEIGHT / 2)
      );
      rests.push(dist * CONSTRAINT_DIST);
    }
    restLengthsRef.current = rests;

    // Create span elements
    const els: HTMLSpanElement[] = [];
    for (const l of letters) {
      const span = document.createElement('span');
      span.className = 'physics-letter';
      span.textContent = l.ch;
      container.appendChild(span);
      els.push(span);
    }
    elsRef.current = els;

    // Unlock last 3 letters as draggable
    const lastIdx = letters.length - 1;
    for (let i = lastIdx; i > lastIdx - 3 && i >= 0; i--) {
      letters[i].locked = false;
      els[i].classList.add('physics-draggable');
    }

    // Calculate container height from layout
    const maxY = positions.reduce((max, p) => Math.max(max, p.y), 0);
    container.style.minHeight = `${maxY + LINE_HEIGHT + 8}px`;

    // 'F' key toggles gravity + unravel
    const handleKey = (e: KeyboardEvent) => {
      // Don't trigger when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (e.key === 'f' || e.key === 'F') {
        gravityOnRef.current = !gravityOnRef.current;
        if (gravityOnRef.current && !unravelingRef.current) {
          unravelingRef.current = true;
          unravelIdxRef.current = letters.length - 1;
          while (
            unravelIdxRef.current >= 0 &&
            !letters[unravelIdxRef.current].locked
          ) {
            unravelIdxRef.current--;
          }
        }
      }
    };
    window.addEventListener('keydown', handleKey);

    // Drag helpers
    const isDragged = (idx: number) => {
      for (const d of dragsRef.current.values()) if (d.idx === idx) return true;
      return false;
    };

    const handlePointerDown = (e: PointerEvent) => {
      const idx = els.indexOf(e.target as HTMLSpanElement);
      if (idx === -1 || letters[idx].locked || isDragged(idx)) return;
      const rect = container.getBoundingClientRect();
      dragsRef.current.set(e.pointerId, {
        idx,
        offsetX: e.clientX - rect.left - letters[idx].x,
        offsetY: e.clientY - rect.top - letters[idx].y,
      });
      els[idx].classList.add('physics-dragging');
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      e.preventDefault();
    };

    const handlePointerMove = (e: PointerEvent) => {
      const d = dragsRef.current.get(e.pointerId);
      if (!d) return;
      const rect = container.getBoundingClientRect();
      const l = letters[d.idx];
      l.x = e.clientX - rect.left - d.offsetX;
      l.y = e.clientY - rect.top - d.offsetY;
      l.px = l.x;
      l.py = l.y;
    };

    const handlePointerUp = (e: PointerEvent) => {
      const d = dragsRef.current.get(e.pointerId);
      if (!d) return;
      els[d.idx].classList.remove('physics-dragging');
      dragsRef.current.delete(e.pointerId);
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    // Resize handler
    const handleResize = () => {
      const newPositions = layoutPositions(getMaxWidth());
      for (let i = 0; i < letters.length; i++) {
        const np = newPositions[letters[i].readingIdx];
        if (letters[i].locked) {
          letters[i].x = np.x;
          letters[i].y = np.y;
          letters[i].ox = np.x;
          letters[i].oy = np.y;
          letters[i].px = np.x;
          letters[i].py = np.y;
        } else {
          letters[i].ox = np.x;
          letters[i].oy = np.y;
        }
      }
      const maxY = newPositions.reduce((max, p) => Math.max(max, p.y), 0);
      container.style.minHeight = `${maxY + LINE_HEIGHT + 8}px`;
    };
    window.addEventListener('resize', handleResize);

    // Physics simulation
    const FIXED_DT = 1 / 120;
    const MAX_STEPS = 4;

    function simulate() {
      const letters = lettersRef.current;
      const restLengths = restLengthsRef.current;

      // Unravel step
      if (unravelingRef.current) {
        if (!gravityOnRef.current || unravelIdxRef.current < 0) {
          unravelingRef.current = false;
        } else if (letters[unravelIdxRef.current]?.locked) {
          letters[unravelIdxRef.current].locked = false;
          letters[unravelIdxRef.current].px =
            letters[unravelIdxRef.current].x;
          letters[unravelIdxRef.current].py =
            letters[unravelIdxRef.current].y - 0.5;
          unravelIdxRef.current--;
        } else {
          unravelIdxRef.current--;
        }
      }

      // Unlock propagation — pulling a letter peels the next one free
      for (let i = letters.length - 2; i >= 0; i--) {
        if (letters[i].locked && !letters[i + 1].locked) {
          const a = letters[i],
            b = letters[i + 1];
          const dx = b.x + b.w / 2 - (a.ox + a.w / 2);
          const dy = b.y + LINE_HEIGHT / 2 - (a.oy + LINE_HEIGHT / 2);
          const dist = Math.hypot(dx, dy);
          if (dist > restLengths[i] + UNLOCK_THRESHOLD) {
            a.locked = false;
            a.px = a.x;
            a.py = a.y;
          }
        }
      }

      // Verlet integration
      for (let i = 0; i < letters.length; i++) {
        const l = letters[i];
        if (l.locked || isDragged(i)) continue;
        const vx = (l.x - l.px) * DAMPING;
        const vy = (l.y - l.py) * DAMPING;
        l.px = l.x;
        l.py = l.y;
        l.x += vx;
        l.y += vy + (gravityOnRef.current ? GRAVITY : 0);
      }

      // Distance constraints
      for (let iter = 0; iter < ITERATIONS; iter++) {
        for (let i = 0; i < letters.length - 1; i++) {
          const a = letters[i],
            b = letters[i + 1];
          if (a.locked && b.locked) continue;
          const ax = a.x + a.w / 2,
            ay = a.y + LINE_HEIGHT / 2;
          const bx = b.x + b.w / 2,
            by = b.y + LINE_HEIGHT / 2;
          const dx = bx - ax,
            dy = by - ay;
          const dist = Math.hypot(dx, dy) || 0.001;
          const diff = (dist - restLengths[i]) / dist;
          const aFixed = a.locked || isDragged(i);
          const bFixed = b.locked || isDragged(i + 1);
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

      // Letter collision
      const RADIUS = 7;
      for (let i = 0; i < letters.length; i++) {
        if (letters[i].locked) continue;
        const a = letters[i];
        const acx = a.x + a.w / 2,
          acy = a.y + LINE_HEIGHT / 2;
        for (let j = i + 1; j < letters.length; j++) {
          if (letters[j].locked || Math.abs(i - j) === 1) continue;
          const b = letters[j];
          const bcx = b.x + b.w / 2,
            bcy = b.y + LINE_HEIGHT / 2;
          const dx = bcx - acx,
            dy = bcy - acy;
          const dist = Math.hypot(dx, dy) || 0.001;
          if (dist < RADIUS * 2) {
            const overlap = ((RADIUS * 2 - dist) / dist) * 0.5;
            if (isDragged(i)) {
              b.x += dx * overlap;
              b.y += dy * overlap;
            } else if (isDragged(j)) {
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

      // Boundary constraints
      if (!containerRef.current) return;
      const cRect = containerRef.current.getBoundingClientRect();
      const minX = -cRect.left;
      const minY = -cRect.top;
      const maxX = window.innerWidth - cRect.left;
      const maxY = window.innerHeight - cRect.top;
      const bounce = 0.4;
      for (let i = 0; i < letters.length; i++) {
        const l = letters[i];
        if (l.locked || isDragged(i)) continue;
        if (l.x < minX) {
          l.x = minX;
          l.px = l.x + (l.x - l.px) * bounce;
        }
        if (l.x + l.w > maxX) {
          l.x = maxX - l.w;
          l.px = l.x + (l.x - l.px) * bounce;
        }
        if (l.y < minY) {
          l.y = minY;
          l.py = l.y + (l.y - l.py) * bounce;
        }
        if (l.y + LINE_HEIGHT > maxY) {
          l.y = maxY - LINE_HEIGHT;
          l.py = l.y + (l.y - l.py) * bounce;
        }
      }
    }

    // Fixed-timestep render loop
    function render(now: number) {
      if (lastTimeRef.current < 0) {
        lastTimeRef.current = now;
        rafRef.current = requestAnimationFrame(render);
        return;
      }
      const dt = Math.min(
        (now - lastTimeRef.current) / 1000,
        MAX_STEPS * FIXED_DT
      );
      lastTimeRef.current = now;
      accumulatorRef.current += dt;

      while (accumulatorRef.current >= FIXED_DT) {
        simulate();
        accumulatorRef.current -= FIXED_DT;
      }

      const letters = lettersRef.current;
      const els = elsRef.current;
      for (let i = 0; i < letters.length; i++) {
        if (!letters[i].locked) els[i].classList.add('physics-draggable');
        els[i].style.transform = `translate(${letters[i].x}px, ${letters[i].y}px)`;
      }
      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = -1;
      accumulatorRef.current = 0;
      gravityOnRef.current = true;
      unravelingRef.current = false;
      unravelIdxRef.current = -1;
      dragsRef.current.clear();
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [getMaxWidth, resetKey]);

  return (
    <div
      ref={containerRef}
      className="relative w-full touch-none select-none"
    />
  );
}
