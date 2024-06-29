import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx, ManifestV3Export } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import path from "path"

const _manifest = manifest as ManifestV3Export
export default defineConfig({
  plugins: [
    react(),
    crx({ manifest: _manifest }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        sidepanel: 'src/sidepanel.html',
      },
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss, autoprefixer,
      ],
    },
  },
})