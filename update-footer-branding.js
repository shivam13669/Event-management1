import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function updateFooterBranding(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (!['node_modules', 'hts-cache', 'www.googletagmanager.com', '.git'].includes(file)) {
        updateFooterBranding(fullPath);
      }
      return;
    }
    
    if (file.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      let updated = false;
      
      if (content.includes('Website design & SEO by Xcodefix') || content.includes('www.xcodefix.com')) {
        content = content.replace(/Website design & SEO by Xcodefix/g, 'Website developed & SEO by khoobneek');
        content = content.replace(/https:\/\/www\.xcodefix\.com\//g, 'https://www.khoobneek.com/');
        updated = true;
      }
      
      if (updated) {
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  });
}

updateFooterBranding(__dirname);
console.log('Footer branding update complete!');
