import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

function applyReplacements(content) {
  let result = content;
  for (const [oldStr, newStr] of Object.entries(replacements)) {
    result = result.replace(new RegExp(oldStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newStr);
  }
  return result;
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      console.log(`Processing: ${filePath}`);
      let content = fs.readFileSync(filePath, 'utf-8');
      content = applyReplacements(content);
      fs.writeFileSync(filePath, content, 'utf-8');
    }
  }
}

// Apply branding to MPL folder
const mplDir = path.join(__dirname, 'Event/www.mpleventmanagement.com');
console.log(`Applying MPL branding to: ${mplDir}`);
processDirectory(mplDir);
console.log('MPL branding applied!');

// Copy to Chennai folder
const chennaiDir = path.join(__dirname, 'Event/www.chennaieventmanagementservice.com');
console.log(`Copying to: ${chennaiDir}`);
fs.rmSync(chennaiDir, { recursive: true, force: true });
fs.cpSync(mplDir, chennaiDir, { recursive: true });
console.log('Done! MPL content is now in both folders.');
