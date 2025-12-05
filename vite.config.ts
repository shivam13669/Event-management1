import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import type { ViteDevServer } from 'vite'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const eventDir = path.join(__dirname, 'Event/www.chennaieventmanagementservice.com')

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-event-files',
      configureServer(server: ViteDevServer) {
        return () => {
          server.middlewares.use((req, res, next) => {
            if (!req.url) return next()
            
            const url = req.url.split('?')[0]
            let filePath = path.join(eventDir, url === '/' ? 'index.html' : url)

            try {
              // Check if file exists
              if (fs.existsSync(filePath)) {
                const stat = fs.statSync(filePath)
                
                if (stat.isFile()) {
                  const content = fs.readFileSync(filePath)
                  const ext = path.extname(filePath).toLowerCase()
                  
                  const mimeTypes: Record<string, string> = {
                    '.html': 'text/html; charset=utf-8',
                    '.css': 'text/css; charset=utf-8',
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
              }

              // If URL has no extension, try adding .html
              if (!path.extname(url)) {
                const htmlPath = path.join(eventDir, url === '/' ? 'index.html' : `${url}.html`)
                
                if (fs.existsSync(htmlPath)) {
                  const content = fs.readFileSync(htmlPath)
                  res.setHeader('Content-Type', 'text/html; charset=utf-8')
                  res.end(content)
                  return
                }
              }
            } catch (err) {
              console.error('Middleware error:', err)
            }

            next()
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
