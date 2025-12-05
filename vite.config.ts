import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import type { ViteDevServer } from 'vite'

const STATIC_EXTENSIONS = ['.css', '.js', '.json', '.webp', '.svg', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.map']

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
              
              // First, try the URL as-is
              let filePath = path.join(eventDir, url === '/' ? 'index.html' : url)
              
              if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
                const content = fs.readFileSync(filePath)
                const ext = path.extname(filePath)
                const mimeTypes: Record<string, string> = {
                  '.html': 'text/html; charset=utf-8',
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
                  '.map': 'application/json',
                }
                res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream')
                res.end(content)
                return
              }

              // If it has an extension but doesn't exist, pass to next
              if (path.extname(url)) {
                next()
                return
              }

              // If it's a directory request, try index.html
              if (url.endsWith('/')) {
                filePath = path.join(eventDir, `${url}index.html`)
                if (fs.existsSync(filePath)) {
                  res.setHeader('Content-Type', 'text/html; charset=utf-8')
                  res.end(fs.readFileSync(filePath))
                  return
                }
              }

              // Try adding .html extension
              filePath = path.join(eventDir, `${url}.html`)
              if (fs.existsSync(filePath)) {
                res.setHeader('Content-Type', 'text/html; charset=utf-8')
                res.end(fs.readFileSync(filePath))
                return
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
