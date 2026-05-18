# Setlist Manager

One HTML file — songs in `localStorage`, optional **cloud sync** between PC and iPhone.

## Cloud sync (PC ↔ iPhone)

1. Create a free account at [jsonbin.io](https://jsonbin.io).
2. Copy your **X-Master-Key** (API Keys page).
3. On your **PC** (or whichever has your songs):
   - Open the app → **Cloud sync** section
   - Paste the API key
   - Tap **Create new cloud backup**
   - Copy the **Sync ID** shown
4. On your **iPhone** (same URL / home-screen app):
   - Paste the **same** API key
   - Paste the **same** Sync ID
   - Tap **Save**
5. Tap **Sync now** on either device if needed.

After that, changes auto-upload (~1s after edits) and download when you open the app or every 45 seconds.

**Important:** Use the **same URL** on both devices (e.g. `https://rodzme.github.io/setlist-manager/`) so localStorage and sync behave consistently.

## GitHub Pages

- App file: [`docs/index.html`](docs/index.html)
- Settings → Pages → branch **main**, folder **`/docs`**
- After editing root `index.html`, run: `cp index.html docs/index.html` (or copy in Explorer) and push.

## Local use

Open [`index.html`](index.html) in a browser.

## Export / import

Manual JSON backup still works via **Export** / **Import** if you prefer a file over the cloud.
