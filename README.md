# Setlist Manager

One HTML app with separate pages for songs and cloud sync settings.

## Navigation

Use the hamburger menu (`?`) to move between:
- `Songs` (`index.html`)
- `Cloud Sync Settings` (`config.html`)

## Song organization

From the songs page, use the grouping selector to organize songs by:
- Artist
- Alphabetical letter (A, B, C, ...)
- Genre
- No grouping

Songs now include an optional `genre` field.

## Cloud sync (PC -> iPhone)

1. Create a free account at [jsonbin.io](https://jsonbin.io).
2. Copy your **X-Master-Key** (API Keys page).
3. On your **PC** (or whichever has your songs):
   - Open the app -> `Cloud Sync Settings`
   - Paste the API key
   - Tap **Create new cloud backup**
   - Copy the **Sync ID** shown
4. On your **iPhone** (same URL / home-screen app):
   - Paste the same API key
   - Paste the same Sync ID
   - Tap **Save**
5. Tap **Sync now** on either device if needed.

After that, changes auto-upload after edits and can be pulled on demand.

**Important:** Use the same URL on both devices (for example `https://rodzme.github.io/setlist-manager/`) so localStorage and sync behave consistently.

## GitHub Pages

- App files: [`docs/index.html`](docs/index.html), [`docs/config.html`](docs/config.html)
- Settings -> Pages -> branch **main**, folder **`/docs`**
- After editing root files, copy to `docs/` and push.

## Local use

Open [`index.html`](index.html) in a browser.

## Export / import

Manual JSON backup still works via **Export** / **Import**.
