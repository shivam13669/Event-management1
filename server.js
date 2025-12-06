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

// Determine which site to serve
function getSiteDir(req) {
  const isMPL = req.query.site === 'mpl' || req.path.startsWith('/mpl');
  
  if (isMPL) {
    return path.join(__dirname, 'Event/www.mpleventmanagement.com');
  }
  return path.join(__dirname, 'Event/www.chennaieventmanagementservice.com');
}

// Middleware to serve static files
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
