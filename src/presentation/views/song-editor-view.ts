import type { Song } from "../../domain/song.js";
import { el } from "../../shared/dom.js";

export interface EditorFields {
  title: HTMLInputElement;
  artist: HTMLInputElement;
  lyrics: HTMLTextAreaElement;
}

export function createSongEditorView(): {
  root: HTMLElement;
  fields: EditorFields;
} {
  const title = el("input", {
    attrs: { type: "text", id: "songTitle", placeholder: "Song title" },
  }) as HTMLInputElement;

  const artist = el("input", {
    attrs: { type: "text", id: "songArtist", placeholder: "Artist" },
  }) as HTMLInputElement;

  const lyrics = el("textarea", {
    attrs: { id: "songLyrics", placeholder: "Paste lyrics here..." },
  }) as HTMLTextAreaElement;

  const root = el("div", { className: "hidden", attrs: { id: "editor" } }, [
    el("div", { className: "card" }, [
      el("h2", { text: "Song" }),
      title,
      el("div", { className: "spacer" }),
      artist,
      el("div", { className: "spacer" }),
      lyrics,
      el("div", { className: "spacer" }),
      el("div", { className: "editor-actions" }, [
        el("button", {
          className: "primary",
          text: "Save",
          attrs: { type: "button", "data-action": "save-song" },
        }),
        el("button", {
          text: "Cancel",
          attrs: { type: "button", "data-action": "cancel-edit" },
        }),
      ]),
    ]),
  ]);

  return { root, fields: { title, artist, lyrics } };
}

export function fillEditorFields(fields: EditorFields, song?: Song): void {
  fields.title.value = song?.title ?? "";
  fields.artist.value = song?.artist ?? "";
  fields.lyrics.value = song?.lyrics ?? "";
}

export function readEditorFields(fields: EditorFields): {
  title: string;
  artist: string;
  lyrics: string;
} {
  return {
    title: fields.title.value,
    artist: fields.artist.value,
    lyrics: fields.lyrics.value,
  };
}
