// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

const certDir = path.resolve('certs/dev-vite') // adjust if your certs live elsewhere

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.jsx'],
      refresh: true,
    }),
    react(),
    tailwindcss(),
  ],
  server: {
    https: {
      key: fs.readFileSync(path.join(certDir, 'portfolio.local+3-key.pem')),
      cert: fs.readFileSync(path.join(certDir, 'portfolio.local+3.pem')),
    },
    host: 'portfolio.local', // must match your cert SAN + hosts entry
    port: 5173,
    strictPort: true,
    hmr: {
      host: 'portfolio.local',
      protocol: 'wss',
      port: 5173,
    },
  },
})
