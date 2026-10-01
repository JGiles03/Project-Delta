import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { configDefaults } from 'vitest/config'
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: ["pwa/apple-touch-icon.png"],

      devOptions: {
        enabled: false,
      },

      manifest: {
        name: "Child & Me",
        short_name: "Child & Me",
        description: "Plan your next adventure with your kids.",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",

        icons: [
          {
            src: "/pwa/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  test: {
    environment: "jsdom",
    exclude: [
      ...configDefaults.exclude,
      "src/tests/*"
    ],
    coverage: {
      provider: 'v8',
      enabled: true,
      exclude: [
      ...configDefaults.exclude,
      //"src/context/*",
      //"src/services/*",
      "src/assets/**",
      //"src/Stores/**",
      "**.css"
    ],
    },
    setupFiles: ["vitest-localstorage-mock"],
  },
});
