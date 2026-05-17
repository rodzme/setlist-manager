export interface Song {
  id: string;
  title: string;
  artist: string;
  lyrics: string;
}

export interface SongInput {
  title: string;
  artist: string;
  lyrics: string;
}

export function createSong(id: string, input: SongInput): Song {
  return {
    id,
    title: input.title,
    artist: input.artist,
    lyrics: input.lyrics,
  };
}

export function validateSong(value: unknown): value is Song {
  if (typeof value !== "object" || value === null) return false;
  const o = value as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.title === "string" &&
    typeof o.lyrics === "string" &&
    (o.artist === undefined || typeof o.artist === "string")
  );
}

export function normalizeSong(raw: Song): Song {
  return {
    id: raw.id,
    title: raw.title,
    artist: raw.artist ?? "",
    lyrics: raw.lyrics,
  };
}

export function songSearchText(song: Song): string {
  return `${song.title} ${song.artist} ${song.lyrics}`.toLowerCase();
}
