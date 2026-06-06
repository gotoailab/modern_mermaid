import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const isExtension = mode === 'extension';

  return {
    plugins: [
      react(),
      tailwindcss(),
      !isExtension && VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: "Modern Mermaid",
          short_name: "Mermaid",
          description: "A modern, beautiful Mermaid.js editor with custom themes and high-quality export.",
          start_url: "/",
          display: "standalone",
          background_color: "#ffffff",
          theme_color: "#1e1e1e",
          icons: [
            {
              src: "/icon-192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/icon-512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: ({ request }) =>
                request.destination === 'document' ||
                request.destination === 'script' ||
                request.destination === 'style' ||
                request.destination === 'image' ||
                request.destination === 'font',
              handler: 'CacheFirst',
              options: {
                cacheName: 'mm-static-cache',
                expiration: {
                  maxEntries: 200,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },
              },
            },
          ],
        },
      }),
    ].filter(Boolean),
    build: {
      outDir: isExtension ? 'dist-extension' : 'dist',
      sourcemap: isExtension,
      rollupOptions: isExtension ? {
        input: {
          main: 'index.html',
          background: 'src/background.ts'
        },
        output: {
          entryFileNames: (chunkInfo) => {
            return chunkInfo.name === 'background' ? '[name].js' : 'assets/[name]-[hash].js';
          }
        }
      } : {}
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: false,
    },
  };
})