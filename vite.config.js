import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "VARIA | واریا",
        short_name: "واریا",
        description: "واریا مرجع آموزش های برنامه نویسی",
        display: "standalone",
        icons: [
          {
            src: "https://varya.storage.c2.liara.space/logo.png",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
