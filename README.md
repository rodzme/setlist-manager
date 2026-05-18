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

Static output is written to `dist/`. **Use the built `dist/index.html` on your phone** — not the project root `index.html` (that file only works with `npm run dev`).

The production build is a **single self-contained HTML file** (all JS and CSS inlined), similar to the original app, so it works when:

- Hosted on GitHub Pages, Netlify, or any static server
- Opened from a subfolder (not only the domain root)
- Added to the iPhone home screen (see below)

### iPhone / “Add to Home Screen”

1. Run `npm run build`.
2. Upload **everything in `dist/`** to your host, or at minimum serve `dist/index.html` over **https** (required for a reliable home-screen web app).
3. Open that URL in Safari → Share → **Add to Home Screen**.

If you see a **white screen**, you are usually opening the wrong file:

| File | Works on iPhone? |
|------|------------------|
| Project root `index.html` (before build) | No — needs the Vite dev server |
| `dist/index.html` after `npm run build` | Yes |

Your existing `localStorage` data is per-origin (per URL). If the home-screen URL changed, songs may appear “missing” until you use the same URL as before or import a backup.

### GitHub Pages

If the site is `https://<user>.github.io/setlist-manager/` and the console shows **404** for `/src/main.ts`, GitHub is serving the **development** `index.html` from the repo root, not the built app.

**Fix:** In the repo on GitHub → **Settings → Pages → Build and deployment → Source:** choose **GitHub Actions**, then push to `main`. The [deploy workflow](.github/workflows/deploy-pages.yml) runs `npm run build` and publishes `dist/` (one self-contained `index.html`).

Do **not** set Pages source to “Deploy from branch / root” unless that branch only contains `dist/` output.

### Console messages

| Message | Meaning |
|---------|---------|
| `404` for `/src/main.ts` | Host is using dev `index.html`; run deploy workflow or upload `dist/` |
| `404` for `/favicon.ico` | Harmless; a `favicon.svg` is included after build |
| `apple-mobile-web-app-capable` deprecated | Informational; `mobile-web-app-capable` is included as well |

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
