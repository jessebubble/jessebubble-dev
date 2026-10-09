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
- **Geist** — mono + pixel font families

## Routes

- `/` — bio, projects, and contact beside a sticky photo panel
- `/work/[slug]` — one page per project: surfaces, stack, design, and code to read
- `/lab` — interactive Verlet-physics bio. Grab any letter and pull. `F` lets it fall, `G` toggles gravity, `R` resets.

## Structure

```
app/
├── page.tsx                    # home: bio, projects, contact
├── work/[slug]/page.tsx        # per-project pages
├── layout.tsx                  # root layout + metadata
├── globals.css                 # tokens + scanline/glow effects
├── icon.tsx                    # favicon
├── opengraph-image.tsx         # OG card
├── lab/
│   ├── layout.tsx
│   └── page.tsx                # verlet physics demo
└── components/
    └── physics-text.tsx        # verlet integration on /lab
lib/
└── projects.ts                 # project data
```

Pages are server components; client islands are the physics demo on /lab and the print controls on /resume.

## Running locally

```bash
pnpm install
pnpm dev             # next dev (Turbopack)
pnpm build           # production build
pnpm start           # serve production build
pnpm lint            # eslint
```

Open http://localhost:3000.
