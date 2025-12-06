import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Content replacements for MPL branding
const replacements = {
  'Chennai Event Management': 'MPL Event Management',
  'Chennai Events Management': 'MPL Event Management',
  'info@chennaieventmanagementservice.com': 'contact@mplevent.com',
  '+91 98414 35108': '+91 9769511851',
  '+91-98414-35108': '+91-9769511851',
  '98414 35108': '9769511851',
  'www.chennaieventmanagementservice.com': 'www.mpleventmanagement.com',
  'Orchestrating Corporate Excellence': 'Seamless Events, Lasting Memories',
  'in Chennai': ' - MPL Event Management',
  'Chennai,': 'Mumbai & Mithila Region,'
};

// Image URL mapping for MPL (using royalty-free images)
const imageMapping = {
  'msc-annual-16th-year.webp': 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg',
  'msc-annual-event.webp': 'https://images.pexels.com/photos/7648319/pexels-photo-7648319.jpeg',
  '60th-birthday-event.webp': 'https://images.pexels.com/photos/1729808/pexels-photo-1729808.jpeg',
  'wedding-eventsssss.webp': 'https://images.pexels.com/photos/35046242/pexels-photo-35046242.jpeg',
  'event-management-company.webp': 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg'
};

// Determine which site to serve
function getSiteDir(req) {
  const isChennai = req.query.site === 'chennai';

  if (isChennai) {
    return path.join(__dirname, 'Event/www.chennaieventmanagementservice.com');
  }
  return path.join(__dirname, 'Event/www.mpleventmanagement.com');
}

// Middleware to serve all requests
app.use((req, res, next) => {
  const siteDir = getSiteDir(req);
  
  // Adjust path if it starts with /mpl
  let filePath = req.path.startsWith('/mpl') ? req.path.slice(4) : req.path;
  if (!filePath) filePath = '/';
  
  filePath = path.join(siteDir, filePath);

  // If it's a directory, try index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // If no extension, try adding .html
  if (!path.extname(filePath)) {
    if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    }
  }

  // Check if file exists and serve it
  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
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
    };

    // For HTML files, apply replacements if MPL site
    if (ext === '.html' && req.query.site === 'mpl') {
      let content = fs.readFileSync(filePath, 'utf-8');
      
      // Apply all replacements
      for (const [oldStr, newStr] of Object.entries(replacements)) {
        content = content.replace(new RegExp(oldStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newStr);
      }
      
      // Replace image URLs with royalty-free versions
      for (const [oldImg, newImg] of Object.entries(imageMapping)) {
        const imgRegex = new RegExp(`assets/images/(?:bg|service-details)/${oldImg.replace(/\./g, '\\.')}`, 'g');
        content = content.replace(imgRegex, newImg);
      }
      
      // Add inline CSS for MPL theme to hide logo and apply custom styling
      const mplCssInline = `
      <style>
        :root {
          --primary-color: #2c3e50 !important;
          --secondary-color: #3498db !important;
        }
        .logo-img {
          display: none !important;
        }
        .logo::before {
          content: 'M' !important;
          font-size: 36px !important;
          font-weight: bold !important;
          color: #2c3e50 !important;
          font-family: 'Epunda Slab', serif !important;
        }
        .top-bar {
          background-color: #2c3e50 !important;
        }
        .top-bar:before {
          background-color: #3498db !important;
        }
        .btns-a {
          background-color: #e74c3c !important;
        }
        .btns-a:hover {
          background-color: #3498db !important;
        }
      </style>
      `;
      
      // Inject inline CSS and custom CSS file link
      content = content.replace(
        '</head>',
        mplCssInline + '\n<link rel="stylesheet" href="assets/css/mpl-theme.css" type="text/css" crossorigin="anonymous">\n</head>'
      );
      
      res.setHeader('Content-Type', mimeTypes[ext]);
      return res.send(content);
    }

    res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
    return res.sendFile(filePath);
  }

  // File not found
  res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Chennai site: http://localhost:${PORT}/`);
  console.log(`MPL site: http://localhost:${PORT}/?site=mpl`);
});
