import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import type { ViteDevServer } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-event-files',
      configureServer(server: ViteDevServer) {
        return () => {
          server.middlewares.use((req, res, next) => {
            try {
              const url = req.url?.split('?')[0] || '/'
              const eventDir = path.join(process.cwd(), 'Event/www.chennaieventmanagementservice.com')
              let filePath = path.join(eventDir, url === '/' ? 'index.html' : url)

              if (fs.existsSync(filePath)) {
                const stat = fs.statSync(filePath)
                if (stat.isFile()) {
                  const content = fs.readFileSync(filePath)
                  const ext = path.extname(filePath)
                  
                  const mimeTypes: Record<string, string> = {
                    '.html': 'text/html',
                    '.css': 'text/css',
                    '.js': 'application/javascript',
                    '.json': 'application/json',
                    '.webp': 'image/webp',
                    '.svg': 'image/svg+xml',
                    '.png': 'image/png',
                    '.jpg': 'image/jpeg',
                    '.jpeg': 'image/jpeg',
                    '.gif': 'image/gif',
                    '.ico': 'image/x-icon',
                    '.woff': 'font/woff',
                    '.woff2': 'font/woff2',
                    '.ttf': 'font/ttf',
                    '.eot': 'application/vnd.ms-fontobject',
                  }

                  res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream')
                  res.end(content)
                  return
                }
              }

              if (url.endsWith('/') || url === '') {
                filePath = path.join(eventDir, url === '/' ? 'index.html' : `${url}index.html`)
                if (fs.existsSync(filePath)) {
                  res.setHeader('Content-Type', 'text/html')
                  res.end(fs.readFileSync(filePath))
                  return
                }
              } else if (!url.includes('.')) {
                filePath = path.join(eventDir, `${url}.html`)
                if (fs.existsSync(filePath)) {
                  res.setHeader('Content-Type', 'text/html')
                  res.end(fs.readFileSync(filePath))
                  return
                }
              }

              next()
            } catch (error) {
              console.error('Middleware error:', error)
              next()
            }
          })
        }
      },
    },
  ],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
