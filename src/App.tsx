import { useEffect, useState } from 'react'

export default function App() {
  const [pageContent, setPageContent] = useState('')
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const loadPage = async () => {
      try {
        const pathname = window.location.pathname
        let filePath = 'Event/www.chennaieventmanagementservice.com/index.html'

        if (pathname !== '/' && pathname !== '') {
          const pageName = pathname.replace(/^\//, '').replace(/\/$/, '')
          filePath = `Event/www.chennaieventmanagementservice.com/${pageName}.html`
        }

        const response = await fetch(filePath)
        if (response.ok) {
          const html = await response.text()
          
          // Parse HTML
          const parser = new DOMParser()
          const doc = parser.parseFromString(html, 'text/html')
          
          // Update head elements (meta, title, scripts, etc)
          const newHead = doc.head
          document.title = doc.title
          
          // Copy meta tags and stylesheets
          const metaTags = newHead.querySelectorAll('meta, link[rel="stylesheet"], script[type="application/ld+json"]')
          metaTags.forEach((tag) => {
            const existing = document.head.querySelector(`[data-page-script="${tag.getAttribute('src') || tag.getAttribute('href') || tag.textContent?.slice(0, 20)}"]`)
            if (!existing) {
              const newTag = tag.cloneNode(true) as Element
              newTag.setAttribute('data-page-script', 'true')
              document.head.appendChild(newTag)
            }
          })
          
          // Get body content
          const bodyContent = doc.body.innerHTML
          setPageContent(bodyContent)
          setCurrentPath(pathname)

          // Execute inline scripts
          const scripts = doc.querySelectorAll('body script')
          scripts.forEach((script) => {
            if (!script.src) {
              try {
                // eslint-disable-next-line no-eval
                eval(script.textContent || '')
              } catch (e) {
                console.warn('Script execution error:', e)
              }
            }
          })
        } else {
          setPageContent('<div style="padding: 40px; text-align: center;"><h1>404 - Page Not Found</h1></div>')
        }
      } catch (error) {
        console.error('Failed to load page:', error)
        setPageContent('<div style="padding: 40px; text-align: center;"><h1>Error loading page</h1></div>')
      }
    }

    loadPage()

    // Handle link clicks
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a') as HTMLAnchorElement
      
      if (link && link.href && !link.href.includes('mailto:') && !link.href.includes('tel:')) {
        const href = link.getAttribute('href')
        if (href && !href.startsWith('http') && !href.startsWith('#')) {
          e.preventDefault()
          const newPath = href.replace(/\.html$/, '').replace(/^index$/, '')
          window.history.pushState({}, '', newPath || '/')
          window.dispatchEvent(new PopStateEvent('popstate'))
        }
      }
    }

    const root = document.getElementById('app-content')
    if (root) {
      root.addEventListener('click', handleLinkClick)
    }

    return () => {
      if (root) {
        root.removeEventListener('click', handleLinkClick)
      }
    }
  }, [currentPath])

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return (
    <div id="app-content" dangerouslySetInnerHTML={{ __html: pageContent }} />
  )
}
