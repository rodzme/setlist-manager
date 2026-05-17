import type { Song } from "../song.js";

export interface SongRepository {
  list(): Song[];
  getById(id: string): Song | undefined;
  saveAll(songs: Song[]): void;
}
