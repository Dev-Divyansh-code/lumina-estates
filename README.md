# Lumina Estates

Luxury real estate experience built with React, Vite, TypeScript, Framer Motion, GSAP, and Lenis.

**Design language:** Architectural calm — silver / graphite palette, framed sections, cinematic scroll.

---

## Quick Start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
npm run lint
```

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 18 + Vite 5 + TypeScript |
| Styling | Tailwind CSS 3 + custom design tokens |
| Animation | Framer Motion + GSAP ScrollTrigger |
| Smooth scroll | Lenis |
| Routing | React Router v6 |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |

---

## Project Structure

```
src/
├── components/
│   ├── layout/       # Navbar (pill), Footer
│   ├── ui/           # Hero, mosaics, brand, scroll, offline gate
│   ├── property/     # PropertyCard, PropertyShowcase
│   └── forms/        # ContactModal, NavSearch
├── pages/            # Home, Residences, Detail, About, Journal, errors
├── store/            # Theme + UI Zustand store
├── lib/              # properties data, images, hero-content, utils
├── hooks/
└── index.css         # Design tokens + light theme overrides
public/
└── offline.html      # Static offline fallback
```

---

## Key Features

1. **Hero** — Architecture backdrop, LUMINA wordmark, copy, desktop search bar
2. **Mobile search** — Navbar search icon + overlay (hero search desktop-only)
3. **Featured residences** — Image accordion (3 frames)
4. **Collection mosaic** — 3×3 hover grid
5. **Framed sections** — White rim + rounded panels site-wide
6. **Dark / light theme** — Persisted in `localStorage`
7. **Smooth scroll** — Lenis + GSAP story sections
8. **Offline / connection error** — Live overlay + `/offline` + `public/offline.html`
9. **404** — Framed not-found experience
10. **Contact modal** — Private viewing form (Zod validated)

---

## Hero content control

Edit `src/lib/hero-content.ts` for brand text, eyebrow, title lines, and tagline.

---

## Performance notes

- Secondary routes are code-split (`React.lazy`)
- Manual chunks: `motion`, `gsap`, `lenis`, `react-vendor`, `forms`, `icons`
- Hero uses stable `svh` height on mobile (no `dvh` stretch)
- Reduced-motion respected in key animations

---

## Optional upgrades (not applied)

| Area | Suggestion |
|------|------------|
| Framework | React 19 + React Router 7 (breaking) |
| Build | Vite 6/8 + Tailwind 4 (config migration) |
| SEO | React Helmet / meta per route |
| PWA | Service worker to serve `offline.html` |
| Cleanup | ~~Legacy UI~~ removed (old hero/nav/smoke/gold stripe) |
| a11y | Audit focus traps in modals/drawers |
| Images | Self-host Unsplash assets or CDN with sizes |

---

## License

Private project — Lumina Estates.
