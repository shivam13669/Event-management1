import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: path.resolve(__dirname, 'Event/www.chennaieventmanagementservice.com'),
  publicDir: 'assets',
  server: {
    port: 3000,
    middlewareMode: false,
  },
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
  },
})
