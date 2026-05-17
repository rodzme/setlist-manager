import type { Song } from "../../domain/song.js";
import { clearChildren, el } from "../../shared/dom.js";

export function renderSongList(container: HTMLElement, songs: Song[]): void {
  clearChildren(container);

  if (songs.length === 0) {
    container.append(el("div", { className: "card", text: "No songs yet." }));
    return;
  }

  for (const song of songs) {
    const card = el("div", { className: "card" });
    card.append(
      el("h3", { text: song.title }),
      el("div", { className: "subtitle", text: song.artist || "" }),
      el("div", { className: "card-actions" }, [
        el("button", {
          text: "Open",
          attrs: { type: "button", "data-action": "open", "data-song-id": song.id },
        }),
        el("button", {
          text: "Edit",
          attrs: { type: "button", "data-action": "edit", "data-song-id": song.id },
        }),
        el("button", {
          text: "Delete",
          attrs: { type: "button", "data-action": "delete", "data-song-id": song.id },
        }),
      ]),
    );
    container.append(card);
  }
}
