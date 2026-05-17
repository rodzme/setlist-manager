import { normalizeSong, validateSong, type Song } from "../domain/song.js";
import type { SongRepository } from "../domain/ports/song-repository.js";

const STORAGE_KEY = "songs";

export class LocalStorageSongRepository implements SongRepository {
  private cache: Song[] | null = null;

  list(): Song[] {
    if (this.cache) return [...this.cache];
    this.cache = this.loadFromStorage();
    return [...this.cache];
  }

  getById(id: string): Song | undefined {
    return this.list().find((s) => s.id === id);
  }

  saveAll(songs: Song[]): void {
    this.cache = songs.map(normalizeSong);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cache));
  }

  private loadFromStorage(): Song[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    try {
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        console.warn("Invalid songs data in localStorage; resetting.");
        return [];
      }

      const valid: Song[] = [];
      let dropped = 0;
      for (const item of parsed) {
        if (validateSong(item)) {
          valid.push(normalizeSong(item));
        } else {
          dropped++;
        }
      }
      if (dropped > 0) {
        console.warn(`Dropped ${dropped} invalid song(s) from localStorage.`);
      }
      return valid;
    } catch {
      console.warn("Corrupt songs data in localStorage; resetting.");
      return [];
    }
  }
}
