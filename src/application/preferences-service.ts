import type { UserPreferences } from "../domain/ports/user-preferences.js";

export class PreferencesService {
  constructor(private readonly preferences: UserPreferences) {}

  getFontSize(): number {
    return this.preferences.getFontSize();
  }

  setFontSize(size: number): void {
    this.preferences.setFontSize(size);
  }

  adjustFontSize(delta: number): number {
    const next = this.getFontSize() + delta;
    this.setFontSize(next);
    return next;
  }
}
