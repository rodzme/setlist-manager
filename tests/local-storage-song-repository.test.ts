import { beforeEach, describe, expect, it } from "vitest";
import { LocalStorageSongRepository } from "../src/infrastructure/local-storage-song-repository.js";

describe("LocalStorageSongRepository", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("round-trips songs through localStorage", () => {
    const repo = new LocalStorageSongRepository();
    repo.saveAll([
      {
        id: "a",
        title: "Song A",
        artist: "Artist",
        lyrics: "Lyrics",
      },
    ]);

    const again = new LocalStorageSongRepository();
    const songs = again.list();
    expect(songs).toHaveLength(1);
    expect(songs[0].title).toBe("Song A");
  });

  it("drops invalid entries when loading", () => {
    localStorage.setItem(
      "songs",
      JSON.stringify([{ id: "ok", title: "T", lyrics: "L" }, { bad: true }]),
    );
    const repo = new LocalStorageSongRepository();
    expect(repo.list()).toHaveLength(1);
    expect(repo.list()[0].id).toBe("ok");
  });

  it("returns empty list for corrupt JSON", () => {
    localStorage.setItem("songs", "not-json");
    const repo = new LocalStorageSongRepository();
    expect(repo.list()).toEqual([]);
  });
});
