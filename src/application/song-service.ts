import { createSong, songSearchText, type Song, type SongInput } from "../domain/song.js";
import type { SongRepository } from "../domain/ports/song-repository.js";
import { parseBackupJson, stringifyBackup } from "../infrastructure/json-backup.js";
import { createId } from "../shared/id.js";

export type ImportResult =
  | { ok: true; count: number }
  | { ok: false; error: string };

export class SongService {
  constructor(private readonly repository: SongRepository) {}

  listAll(): Song[] {
    return this.repository.list();
  }

  searchSongs(query: string): Song[] {
    const q = query.trim().toLowerCase();
    const songs = this.repository.list();
    if (!q) return songs;
    return songs.filter((s) => songSearchText(s).includes(q));
  }

  getSong(id: string): Song | undefined {
    return this.repository.getById(id);
  }

  createSong(input: SongInput): Song {
    const song = createSong(createId(), input);
    const songs = this.repository.list();
    songs.unshift(song);
    this.repository.saveAll(songs);
    return song;
  }

  updateSong(id: string, input: SongInput): Song | undefined {
    const songs = this.repository.list();
    const index = songs.findIndex((s) => s.id === id);
    if (index === -1) return undefined;

    const updated = createSong(id, input);
    songs[index] = updated;
    this.repository.saveAll(songs);
    return updated;
  }

  deleteSong(id: string): boolean {
    const songs = this.repository.list();
    const next = songs.filter((s) => s.id !== id);
    if (next.length === songs.length) return false;
    this.repository.saveAll(next);
    return true;
  }

  replaceAll(songs: Song[]): void {
    this.repository.saveAll(songs);
  }

  exportSongs(): string {
    return stringifyBackup(this.repository.list());
  }

  importSongs(json: string): ImportResult {
    const result = parseBackupJson(json);
    if (!result.ok) return result;
    this.repository.saveAll(result.songs);
    return { ok: true, count: result.songs.length };
  }
}
