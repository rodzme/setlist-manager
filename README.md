# Setlist Manager

A lightweight lyrics and song library for musicians. Songs are stored locally in the browser (`localStorage`).

## Development

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

Static output is written to `dist/` and can be deployed to any static host (GitHub Pages, Netlify, etc.).

## Tests

```bash
npm test
```

## Project structure

| Layer | Path | Role |
|-------|------|------|
| Domain | `src/domain/` | `Song` types, validation, repository interfaces |
| Application | `src/application/` | Use cases (CRUD, search, import/export) |
| Infrastructure | `src/infrastructure/` | `localStorage` adapters, JSON backup parsing |
| Presentation | `src/presentation/` | UI views, styles, routing state |

## Data

- Songs: `localStorage` key `songs` (unchanged from the original single-page app)
- Font size in viewer: `localStorage` key `fontSize`

## Legacy

The original monolithic app is kept as [`index.legacy.html`](index.legacy.html) for reference only. The app entry point is [`index.html`](index.html) + Vite.
