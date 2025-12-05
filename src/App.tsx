import { useEffect } from 'react'

export default function App() {
  useEffect(() => {
    // Get the current page from URL
    const path = window.location.pathname
    let pagePath = 'index.html'
    
    if (path !== '/' && path !== '') {
      pagePath = `${path.replace(/^\//, '')}.html`
    }

    // Construct full file path
    const fullPath = `/Event/www.chennaieventmanagementservice.com/${pagePath}`

    // Load the HTML content
    fetch(fullPath)
      .then(response => response.text())
      .then(html => {
        // Parse and extract body
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        
        // Set title
        document.title = doc.title
        
        // Clear existing root and inject body content
        const root = document.getElementById('root')!
        root.innerHTML = doc.body.innerHTML
        
        // Load and execute stylesheets from head
        const links = doc.querySelectorAll('link[rel="stylesheet"]')
        links.forEach(link => {
          const href = link.getAttribute('href')
          if (href && !document.querySelector(`link[href="${href}"]`)) {
            const newLink = document.createElement('link')
            newLink.rel = 'stylesheet'
            newLink.href = href
            document.head.appendChild(newLink)
          }
        })
        
        // Handle navigation
        const links2 = root.querySelectorAll('a[href]')
        links2.forEach(link => {
          const href = link.getAttribute('href')
          if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
            link.addEventListener('click', (e) => {
              e.preventDefault()
              const newPath = href.replace(/\.html$/, '').replace(/index$/, '')
              window.history.pushState({}, '', newPath || '/')
              // Reload the page
              window.dispatchEvent(new PopStateEvent('popstate'))
            })
          }
        })
      })
      .catch(err => {
        document.getElementById('root')!.innerHTML = '<h1>Page not found</h1>'
        console.error('Failed to load page:', err)
      })
  }, [window.location.pathname])

  return null
}
