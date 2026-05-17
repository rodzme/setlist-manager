import { normalizeSong, validateSong, type Song } from "../domain/song.js";

export type ParseBackupResult =
  | { ok: true; songs: Song[] }
  | { ok: false; error: string };

export function parseBackupJson(json: string): ParseBackupResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return { ok: false, error: "Invalid JSON file." };
  }

  if (!Array.isArray(parsed)) {
    return { ok: false, error: "Backup must be a JSON array of songs." };
  }

  const songs: Song[] = [];
  for (const item of parsed) {
    if (!validateSong(item)) {
      return { ok: false, error: "Backup contains invalid song entries." };
    }
    songs.push(normalizeSong(item));
  }

  return { ok: true, songs };
}

export function stringifyBackup(songs: Song[]): string {
  return JSON.stringify(songs, null, 2);
}
