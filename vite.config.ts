import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-event-files',
      configureServer(server) {
        return () => {
          server.middlewares.use((req, res, next) => {
            const url = req.url?.split('?')[0] || '/'
            
            if (url === '/' || url === '') {
              const filePath = path.join(process.cwd(), 'Event/www.chennaieventmanagementservice.com/index.html')
              res.setHeader('Content-Type', 'text/html')
              res.end(fs.readFileSync(filePath))
              return
            }

            if (!url.includes('.') || url.includes('.html')) {
              let filePath = path.join(process.cwd(), `Event/www.chennaieventmanagementservice.com${url}`)
              if (!filePath.endsWith('.html') && fs.existsSync(filePath + '.html')) {
                filePath = filePath + '.html'
              }

              if (fs.existsSync(filePath) && filePath.endsWith('.html')) {
                res.setHeader('Content-Type', 'text/html')
                res.end(fs.readFileSync(filePath))
                return
              }
            }

            if (url.startsWith('/assets/') || url.includes('.css') || url.includes('.js') || url.includes('.webp') || url.includes('.svg') || url.includes('.png')) {
              const filePath = path.join(process.cwd(), `Event/www.chennaieventmanagementservice.com${url}`)
              if (fs.existsSync(filePath)) {
                res.end(fs.readFileSync(filePath))
                return
              }
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
