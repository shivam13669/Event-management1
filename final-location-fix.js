import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mplDir = path.join(__dirname, 'Event/www.mpleventmanagement.com');
const chennaiDir = path.join(__dirname, 'Event/www.chennaieventmanagementservice.com');

// Simple, targeted replacements - only for user-facing text
const replacements = [
  // Remove ", Tamil Nadu" from location descriptions since user said only Mumbai & Mithila
  [/, Tamil Nadu/g, ''],
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  for (const [find, replace] of replacements) {
    content = content.replace(find, replace);
  }
  
  fs.writeFileSync(filePath, content, 'utf-8');
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      console.log(`Processing: ${file}`);
      processFile(filePath);
    }
  }
}

console.log('Applying final location branding to MPL folder...\n');
processDirectory(mplDir);

console.log('\nCopying to Chennai folder...');
fs.rmSync(chennaiDir, { recursive: true, force: true });
fs.cpSync(mplDir, chennaiDir, { recursive: true });

console.log('Updating root index.html...');
fs.copyFileSync(path.join(mplDir, 'index.html'), path.join(__dirname, 'index.html'));

console.log('\n✅ Done!');
console.log('Location: Mumbai & Mithila Region');
console.log('Branding: MPL Event Management');
