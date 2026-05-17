import { PreferencesService } from "./application/preferences-service.js";
import { SongService } from "./application/song-service.js";
import { LocalStoragePreferences } from "./infrastructure/local-storage-preferences.js";
import { LocalStorageSongRepository } from "./infrastructure/local-storage-song-repository.js";
import { AppShell } from "./presentation/views/app-shell.js";

export function createApp(): AppShell {
  const songRepo = new LocalStorageSongRepository();
  const prefs = new LocalStoragePreferences();
  const songService = new SongService(songRepo);
  const preferencesService = new PreferencesService(prefs);
  return new AppShell(songService, preferencesService);
}
