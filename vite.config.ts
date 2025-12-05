import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    middlewareMode: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  publicDir: 'Event/www.chennaieventmanagementservice.com',
})
