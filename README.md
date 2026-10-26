# Space-themed engineering portfolio

Minimal sci-fi single-page portfolio built with **Vite**, **React**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **React Three Fiber**.

## Features

- Hero 3D scene (placeholder icosahedron or your GLB via `src/data/profile.ts`)
- Projects with per-card wireframe previews and scroll-linked rotation
- About, Skills, and Contact sections with placeholder copy in `src/data/`

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## 3D assets

See [public/models/README.md](public/models/README.md).

## Customize

- **Copy & links**: `src/data/profile.ts`, `projects.ts`, `skills.ts`
- **Theme tokens**: `src/index.css` (`--color-*` variables)
- **Scroll rotation strength**: `useCardScrollRotation(..., { turns: 0.75 })` in `ProjectCard.tsx`
