import { existsSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// The hero's Resume button only shows when this PDF is in /public (keep in sync with src/data/site.js).
const RESUME_FILE = "public/Jermaine-Pasion-Resume.pdf";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __HAS_RESUME__: JSON.stringify(existsSync(RESUME_FILE)),
  },
});
