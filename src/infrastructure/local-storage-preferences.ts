import type { UserPreferences } from "../domain/ports/user-preferences.js";

const FONT_SIZE_KEY = "fontSize";
const DEFAULT_FONT_SIZE = 20;

export class LocalStoragePreferences implements UserPreferences {
  getFontSize(): number {
    const raw = localStorage.getItem(FONT_SIZE_KEY);
    const n = raw === null ? DEFAULT_FONT_SIZE : Number(raw);
    return Number.isFinite(n) ? n : DEFAULT_FONT_SIZE;
  }

  setFontSize(size: number): void {
    localStorage.setItem(FONT_SIZE_KEY, String(size));
  }
}
