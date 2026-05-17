import { describe, expect, it } from "vitest";
import { parseBackupJson, stringifyBackup } from "../src/infrastructure/json-backup.js";
import type { Song } from "../src/domain/song.js";

const sample: Song[] = [
  {
    id: "1",
    title: "Test",
    artist: "Band",
    lyrics: "Line one",
  },
];

describe("parseBackupJson", () => {
  it("parses valid backup array", () => {
    const json = stringifyBackup(sample);
    const result = parseBackupJson(json);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.songs).toHaveLength(1);
      expect(result.songs[0].title).toBe("Test");
    }
  });

  it("rejects malformed JSON", () => {
    const result = parseBackupJson("{");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain("Invalid JSON");
  });

  it("rejects non-array JSON", () => {
    const result = parseBackupJson('{"id":"1"}');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain("array");
  });

  it("rejects invalid song entries", () => {
    const result = parseBackupJson('[{"title":"x"}]');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain("invalid");
  });

  it("accepts empty array", () => {
    const result = parseBackupJson("[]");
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.songs).toHaveLength(0);
  });
});
