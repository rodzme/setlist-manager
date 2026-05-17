import { beforeEach, describe, expect, it } from "vitest";
import type { Song } from "../src/domain/song.js";
import type { SongRepository } from "../src/domain/ports/song-repository.js";
import { SongService } from "../src/application/song-service.js";

class InMemorySongRepository implements SongRepository {
  private songs: Song[] = [];

  list(): Song[] {
    return [...this.songs];
  }

  getById(id: string): Song | undefined {
    return this.songs.find((s) => s.id === id);
  }

  saveAll(songs: Song[]): void {
    this.songs = [...songs];
  }
}

describe("SongService", () => {
  let repo: InMemorySongRepository;
  let service: SongService;

  beforeEach(() => {
    repo = new InMemorySongRepository();
    service = new SongService(repo);
  });

  it("creates and lists songs", () => {
    service.createSong({ title: "A", artist: "B", lyrics: "C" });
    expect(service.listAll()).toHaveLength(1);
    expect(service.listAll()[0].title).toBe("A");
  });

  it("searches by title, artist, and lyrics", () => {
    service.createSong({ title: "Hello", artist: "World", lyrics: "Foo" });
    expect(service.searchSongs("hello")).toHaveLength(1);
    expect(service.searchSongs("world")).toHaveLength(1);
    expect(service.searchSongs("foo")).toHaveLength(1);
    expect(service.searchSongs("missing")).toHaveLength(0);
  });

  it("updates an existing song", () => {
    const created = service.createSong({
      title: "Old",
      artist: "",
      lyrics: "",
    });
    service.updateSong(created.id, {
      title: "New",
      artist: "Band",
      lyrics: "Words",
    });
    expect(service.getSong(created.id)?.title).toBe("New");
  });

  it("deletes a song", () => {
    const created = service.createSong({
      title: "Remove",
      artist: "",
      lyrics: "",
    });
    expect(service.deleteSong(created.id)).toBe(true);
    expect(service.listAll()).toHaveLength(0);
  });

  it("exports and imports backup JSON", () => {
    service.createSong({ title: "One", artist: "", lyrics: "L" });
    const json = service.exportSongs();
    repo.saveAll([]);
    const result = service.importSongs(json);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.count).toBe(1);
    expect(service.listAll()).toHaveLength(1);
  });

  it("returns error for invalid import JSON", () => {
    const result = service.importSongs("[]");
    expect(result.ok).toBe(true);
    const bad = service.importSongs("not json");
    expect(bad.ok).toBe(false);
  });
});
