import { useEffect } from 'react'

export default function App() {
  useEffect(() => {
    const handleNavigation = () => {
      const pathname = window.location.pathname
      let targetFile = 'index.html'
      
      if (pathname !== '/' && pathname !== '') {
        targetFile = `${pathname.replace(/^\//, '')}.html`
      }

      // Fetch and inject the content
      fetch(`/${targetFile}`)
        .then(res => res.text())
        .then(html => {
          const parser = new DOMParser()
          const doc = parser.parseFromString(html, 'text/html')
          
          // Update title
          document.title = doc.title
          
          // Replace body content
          document.body.innerHTML = doc.body.innerHTML
          
          // Add stylesheets if not already present
          doc.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            const href = link.getAttribute('href')
            if (href && !document.querySelector(`link[href="${href}"]`)) {
              const newLink = document.createElement('link')
              newLink.rel = 'stylesheet'
              newLink.href = href
              document.head.appendChild(newLink)
            }
          })
          
          // Re-attach link handlers
          attachLinkHandlers()
        })
        .catch(err => {
          document.body.innerHTML = '<h1>404 - Page not found</h1>'
          console.error('Error loading page:', err)
        })
    }

    const attachLinkHandlers = () => {
      document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href')
        if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
          link.onclick = (e) => {
            e.preventDefault()
            const newPath = href.replace(/\.html$/, '').replace(/^index$/, '')
            window.history.pushState({}, '', newPath || '/')
            handleNavigation()
            return false
          }
        }
      })
    }

    handleNavigation()
    window.addEventListener('popstate', handleNavigation)

    return () => window.removeEventListener('popstate', handleNavigation)
  }, [])

  return null
}
