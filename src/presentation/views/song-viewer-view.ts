import type { Song } from "../../domain/song.js";
import { el } from "../../shared/dom.js";

export interface ViewerElements {
  root: HTMLElement;
  title: HTMLElement;
  artist: HTMLElement;
  lyrics: HTMLPreElement;
}

export function createSongViewerView(): ViewerElements {
  const title = el("h2");
  const artist = el("div", { className: "subtitle" });
  const lyrics = el("pre", { className: "lyrics-pre" }) as HTMLPreElement;

  const root = el("div", { className: "hidden viewer-panel", attrs: { id: "viewer" } }, [
    el("div", { className: "viewer-header" }, [
      el("div", {}, [title, artist]),
      el("button", {
        text: "Close",
        attrs: { type: "button", "data-action": "close-viewer" },
      }),
    ]),
    lyrics,
    el("div", { className: "controls" }, [
      el("button", {
        text: "A-",
        attrs: { type: "button", "data-action": "font-decrease" },
      }),
      el("button", {
        text: "A+",
        attrs: { type: "button", "data-action": "font-increase" },
      }),
    ]),
  ]);

  return { root, title, artist, lyrics };
}

export function fillViewer(elements: ViewerElements, song: Song, fontSize: number): void {
  elements.title.textContent = song.title;
  elements.artist.textContent = song.artist || "";
  elements.lyrics.textContent = song.lyrics;
  elements.lyrics.style.fontSize = `${fontSize}px`;
}
