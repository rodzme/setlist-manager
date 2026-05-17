import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  // Relative asset URLs so the app works from subfolders, iCloud, and "Add to Home Screen"
  base: "./",
  plugins: [viteSingleFile()],
  build: {
    // Single self-contained index.html (like the original monolith) for static / offline use
    cssCodeSplit: false,
  },
});
