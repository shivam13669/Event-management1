import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirs = [
  path.join(__dirname, 'Event/www.chennaieventmanagementservice.com'),
  path.join(__dirname, 'Event/www.mpleventmanagement.com'),
];

for (const dir of dirs) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    const original = content;
    
    // Fix broken About page link
    content = content.replace(/event-management-company-Mumbai & Mithila Region \(Bihar\)\.html/g, 'event-management-company-chennai.html');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`✓ Fixed: ${file}`);
    }
  }
}

console.log('\n✅ About page links fixed!');
