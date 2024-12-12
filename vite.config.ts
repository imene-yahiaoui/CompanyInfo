import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://data.siren-api.fr", // API cible
        changeOrigin: true, // Change l'origine pour éviter CORS
        rewrite: (path) => path.replace(/^\/api/, ""), // Supprime "/api" dans l'URL
      },
    },
  },
});
