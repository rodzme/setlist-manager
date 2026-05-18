# Setlist Manager

One HTML file. No build step. Songs saved in `localStorage`.

## Use locally

Open [`index.html`](index.html) in a browser, or run any static server in this folder.

## GitHub Pages

Live site: **https://rodzme.github.io/setlist-manager/**

1. The app lives in [`docs/index.html`](docs/index.html) (same file as the root copy).
2. On GitHub: **Settings → Pages → Source:** branch **main**, folder **`/docs`**.
3. After edits, copy `index.html` to `docs/index.html` and push both.

```bash
# keep docs in sync after editing index.html
cp index.html docs/index.html
```

## Data

- Songs: `localStorage` key `songs`
- Viewer font size: `localStorage` key `fontSize`
- Export / Import: JSON backup
