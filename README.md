```
   .─────────────────────.
  (   jessebubble.dev     )
   `────────────╲─────────'
                 ╲
                  ╲   ┌──────────────────────┐
                   ╲  │ ● ● ●   ~/portfolio  │
                    ╲ ├──────────────────────┤
                     ╲│ > whoami             │
                      │ jessebubble          │
                      │                      │
                      │ > now                │
                      │ design · workflows   │
                      │       · agents       │
                      │                      │
                      │ > _                  │
                      └──────────────────────┘
```

> Find your people. Build your future.

Personal site for **jessebubble** — software developer & community architect in San Antonio, TX. Founder of [DEVSA](https://devsa.community), lead developer at [434 Media](https://434media.com).

Currently focused on design, workflows, and agents.

---

## Stack

- **Next.js 16** — App Router, Turbopack
- **React 19**
- **TypeScript 5**
- **Tailwind 4**
- **motion** — animation
- **@chenglou/pretext** — grapheme-aware text layout (used in `/lab`)
- **Geist** — mono + pixel font families

## Routes

- `/` — hero · about · now · work · contact (single-page scroll)
- `/lab` — interactive Verlet-physics bio. Drag any unlocked letter. Press `F` to toggle gravity.

## Easter egg

Press `` ` `` or `~` anywhere on the site to open the terminal.

Commands: `about`, `work`, `contact`, `help`, `clear`.

## Structure

```
app/
├── page.tsx                    # composes the sections
├── layout.tsx                  # root layout + metadata
├── globals.css                 # tokens + scanline/glow effects
├── icon.tsx                    # favicon
├── opengraph-image.tsx         # OG card
├── lab/
│   ├── layout.tsx
│   └── page.tsx                # verlet physics demo
└── components/
    ├── section-hero.tsx        # full-bleed photo, name lockup
    ├── section-about.tsx
    ├── section-now.tsx         # current focus
    ├── section-work.tsx        # project cards
    ├── section-contact.tsx
    ├── terminal.tsx            # terminal UI
    ├── mobile-terminal.tsx     # drawer wrapper
    ├── terminal-easter-egg.tsx # ` keystroke handler
    ├── terminal-icon.tsx
    └── physics-text.tsx        # verlet integration on /lab
```

Sections are server components; client islands are scoped to `section-hero` (motion), the terminal stack, and the physics demo.

## Running locally

```bash
pnpm install
pnpm dev             # next dev (Turbopack)
pnpm build           # production build
pnpm start           # serve production build
pnpm lint            # eslint
```

Open http://localhost:3000.
