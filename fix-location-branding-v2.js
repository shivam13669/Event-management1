import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Start fresh from MPL folder (which has proper MPL branding)
const mplDir = path.join(__dirname, 'Event/www.mpleventmanagement.com');
const chennaiDir = path.join(__dirname, 'Event/www.chennaieventmanagementservice.com');

// Targeted location replacements - only for user-facing content
const replacements = [
  {
    // In titles and headings
    find: /Best Event Management Company In Mumbai & Mithila Region \(Bihar\), Tamil Nadu/gi,
    replace: 'Best Event Management Company In Mumbai & Mithila Region (Bihar)'
  },
  {
    find: /Best Event Management Company In [^,]+, [^,]+, Tamil Nadu/gi,
    replace: 'Best Event Management Company In Mumbai & Mithila Region (Bihar)'
  },
  {
    // In service location mentions
    find: /services (in|across) [^.]*?Chennai[^.]*/gi,
    replace: 'services in Mumbai & Mithila Region (Bihar)'
  },
  {
    // In location descriptions
    find: /Located in Anna Nagar, Chennai[^,]*,/gi,
    replace: 'Located in Mumbai & Mithila Region (Bihar),'
  },
  {
    // Address lines
    find: /Chennai – 600040\.?/gi,
    replace: 'Mumbai & Mithila Region (Bihar)'
  },
  {
    find: /Chennai – 600040,/gi,
    replace: 'Mumbai & Mithila Region (Bihar),'
  },
  {
    // WhatsApp text
    find: /Hello%20Chennai%20Event%20Management/gi,
    replace: 'Hello%20MPL%20Event%20Management'
  },
  {
    find: /Hello Chennai Event Management/gi,
    replace: 'Hello MPL Event Management'
  },
  {
    // Page titles and descriptions
    find: /in Chennai"/gi,
    replace: 'in Mumbai & Mithila Region (Bihar)"'
  },
  {
    find: /> Chennai</gi,
    replace: '> Mumbai & Mithila Region (Bihar)<'
  }
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;
  
  for (const rep of replacements) {
    content = content.replace(rep.find, rep.replace);
  }
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    return true;
  }
  return false;
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  let count = 0;
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      count += processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      if (processFile(filePath)) {
        console.log(`✓ ${file}`);
        count++;
      }
    }
  }
  return count;
}

console.log('Applying refined location branding...\n');
let totalCount = 0;

console.log('Processing MPL folder:');
totalCount += processDirectory(mplDir);

console.log('\nCopying to Chennai folder:');
fs.rmSync(chennaiDir, { recursive: true, force: true });
fs.cpSync(mplDir, chennaiDir, { recursive: true });

// Also update root index.html
console.log('\nUpdating root index.html');
fs.copyFileSync(path.join(mplDir, 'index.html'), path.join(__dirname, 'index.html'));

console.log(`\n✅ Complete! Updated ${totalCount} files`);
console.log('Location: Mumbai & Mithila Region (Bihar)');
console.log('Branding: MPL Event Management');
