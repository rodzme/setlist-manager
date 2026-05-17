import type { PreferencesService } from "../../application/preferences-service.js";
import type { SongService } from "../../application/song-service.js";
import {
  createSongEditorView,
  fillEditorFields,
  readEditorFields,
} from "./song-editor-view.js";
import { renderSongList } from "./song-list-view.js";
import {
  createSongViewerView,
  fillViewer,
} from "./song-viewer-view.js";
import { parseBackupJson } from "../../infrastructure/json-backup.js";
import { el } from "../../shared/dom.js";
import {
  initialAppState,
  type AppState,
} from "../router.js";

export class AppShell {
  private state: AppState = initialAppState();
  private readonly listEl: HTMLElement;
  private readonly messageEl: HTMLElement;
  private readonly searchInput: HTMLInputElement;
  private readonly importInput: HTMLInputElement;
  private readonly editorView: ReturnType<typeof createSongEditorView>;
  private readonly viewerView: ReturnType<typeof createSongViewerView>;
  private readonly mainSections: {
    list: HTMLElement;
    toolbar: HTMLElement;
    header: HTMLElement;
  };

  constructor(
    private readonly songService: SongService,
    private readonly preferencesService: PreferencesService,
  ) {
    this.listEl = el("div", { attrs: { id: "list" } });
    this.messageEl = el("div", {
      className: "message hidden",
      attrs: { id: "app-message", role: "status" },
    });
    this.searchInput = el("input", {
      attrs: {
        type: "search",
        id: "search",
        placeholder: "Search songs...",
      },
    }) as HTMLInputElement;

    this.importInput = el("input", {
      attrs: { type: "file", id: "importFile", accept: "application/json,.json" },
    }) as HTMLInputElement;
    this.importInput.hidden = true;

    this.editorView = createSongEditorView();
    this.viewerView = createSongViewerView();

    const header = el("div", { className: "top" }, [
      el("div", {}, [
        el("h1", { text: "Setlist Lyrics" }),
        el("div", { className: "subtitle", text: "Simple lyrics + setlists" }),
      ]),
      el("button", {
        className: "primary",
        text: "+ Song",
        attrs: { type: "button", "data-action": "new-song" },
      }),
    ]);

    const toolbar = el("div", { className: "toolbar" }, [
      this.searchInput,
      el("button", {
        text: "Export",
        attrs: { type: "button", "data-action": "export" },
      }),
      this.importInput,
      el("button", {
        text: "Import",
        attrs: { type: "button", "data-action": "import-trigger" },
      }),
    ]);

    this.mainSections = { list: this.listEl, toolbar, header };
  }

  mount(root: HTMLElement): void {
    root.append(
      this.messageEl,
      this.mainSections.header,
      this.mainSections.toolbar,
      this.listEl,
      this.editorView.root,
      this.viewerView.root,
    );

    root.addEventListener("click", (e) => this.onClick(e));
    this.searchInput.addEventListener("input", () => {
      this.state.searchQuery = this.searchInput.value;
      this.render();
    });
    this.importInput.addEventListener("change", () => void this.onImportFile());

    this.render();
  }

  private onClick(e: Event): void {
    const target = (e.target as HTMLElement).closest<HTMLElement>("[data-action]");
    if (!target) return;

    const action = target.dataset.action;
    const songId = target.dataset.songId;

    switch (action) {
      case "new-song":
        this.openEditor(null);
        break;
      case "edit":
        if (songId) this.openEditor(songId);
        break;
      case "open":
        if (songId) this.openViewer(songId);
        break;
      case "delete":
        if (songId) this.deleteSong(songId);
        break;
      case "save-song":
        this.saveSong();
        break;
      case "cancel-edit":
        this.showList();
        break;
      case "close-viewer":
        this.showList();
        break;
      case "font-decrease":
        this.changeFont(-2);
        break;
      case "font-increase":
        this.changeFont(2);
        break;
      case "export":
        this.exportData();
        break;
      case "import-trigger":
        this.importInput.click();
        break;
    }
  }

  private render(): void {
    const songs = this.songService.searchSongs(this.state.searchQuery);
    renderSongList(this.listEl, songs);
    this.renderMessage();
    this.updateVisibility();
  }

  private renderMessage(): void {
    if (!this.state.message) {
      this.messageEl.classList.add("hidden");
      this.messageEl.textContent = "";
      return;
    }
    this.messageEl.textContent = this.state.message;
    this.messageEl.classList.remove("hidden");
    this.messageEl.classList.toggle("error", this.state.messageIsError);
  }

  private updateVisibility(): void {
    const isList = this.state.view === "list";
    const isEditor = this.state.view === "editor";
    const isViewer = this.state.view === "viewer";

    this.mainSections.header.classList.toggle("hidden", !isList);
    this.mainSections.toolbar.classList.toggle("hidden", !isList);
    this.listEl.classList.toggle("hidden", !isList);
    this.editorView.root.classList.toggle("hidden", !isEditor);
    this.viewerView.root.classList.toggle("hidden", !isViewer);
  }

  private showList(): void {
    this.state.view = "list";
    this.state.editingId = null;
    this.state.viewingId = null;
    this.render();
  }

  private openEditor(id: string | null): void {
    this.state.view = "editor";
    this.state.editingId = id;
    const song = id ? this.songService.getSong(id) : undefined;
    fillEditorFields(this.editorView.fields, song);
    this.updateVisibility();
  }

  private openViewer(id: string): void {
    const song = this.songService.getSong(id);
    if (!song) return;

    this.state.view = "viewer";
    this.state.viewingId = id;
    const fontSize = this.preferencesService.getFontSize();
    fillViewer(this.viewerView, song, fontSize);
    this.updateVisibility();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  private saveSong(): void {
    const input = readEditorFields(this.editorView.fields);
    if (this.state.editingId) {
      this.songService.updateSong(this.state.editingId, input);
    } else {
      this.songService.createSong(input);
    }
    this.clearMessage();
    this.showList();
  }

  private deleteSong(id: string): void {
    if (!confirm("Delete song?")) return;
    this.songService.deleteSong(id);
    this.render();
  }

  private changeFont(delta: number): void {
    const size = this.preferencesService.adjustFontSize(delta);
    if (this.state.view === "viewer") {
      this.viewerView.lyrics.style.fontSize = `${size}px`;
    }
  }

  private exportData(): void {
    const json = this.songService.exportSongs();
    const blob = new Blob([json], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "setlist-backup.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  private async onImportFile(): Promise<void> {
    const file = this.importInput.files?.[0];
    this.importInput.value = "";
    if (!file) return;

    const currentCount = this.songService.listAll().length;
    let text: string;
    try {
      text = await file.text();
    } catch {
      this.setMessage("Failed to read import file.", true);
      return;
    }

    const parseOnly = parseBackupJson(text);
    if (!parseOnly.ok) {
      this.setMessage(parseOnly.error, true);
      return;
    }

    const replaceCount = parseOnly.songs.length;
    const msg =
      currentCount > 0
        ? `Import will replace ${currentCount} song(s) with ${replaceCount} from the file. Continue?`
        : `Import ${replaceCount} song(s)?`;
    if (!confirm(msg)) return;

    const result = this.songService.importSongs(text);
    if (!result.ok) {
      this.setMessage(result.error, true);
      return;
    }

    this.setMessage(`Imported ${result.count} song(s).`, false);
    this.showList();
  }

  private setMessage(message: string, isError: boolean): void {
    this.state.message = message;
    this.state.messageIsError = isError;
    this.renderMessage();
  }

  private clearMessage(): void {
    this.state.message = null;
    this.state.messageIsError = false;
  }
}
