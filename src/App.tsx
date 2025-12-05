import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    const loadHtmlContent = async () => {
      const path = location.pathname === '/' ? 'index.html' : `${location.pathname.substring(1)}.html`
      const fullPath = `Event/www.chennaieventmanagementservice.com/${path}`

      try {
        const response = await fetch(fullPath)
        if (response.ok) {
          const html = await response.text()
          // Extract body content
          const parser = new DOMParser()
          const doc = parser.parseFromString(html, 'text/html')
          const bodyContent = doc.body.innerHTML

          // Update root with content
          const root = document.getElementById('app-content')
          if (root) {
            root.innerHTML = bodyContent
          }

          // Re-execute scripts
          const scripts = doc.querySelectorAll('script')
          scripts.forEach((script) => {
            const newScript = document.createElement('script')
            if (script.src) {
              newScript.src = script.src
            } else {
              newScript.textContent = script.textContent
            }
            document.body.appendChild(newScript)
          })
        }
      } catch (error) {
        console.error('Failed to load page:', error)
      }
    }

    loadHtmlContent()
  }, [location])

  return (
    <div id="app-content" className="app-root" />
  )
}
