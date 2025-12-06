import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const oldMessage = /https:\/\/wa\.me\/\+919769511851\?text=Hello%20Mumbai & Mithila Region \(Bihar\)%20Event%20Management,We%20need%20your%20service/g;
const newMessage = 'https://wa.me/+919769511851?text=Hi';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;
  
  content = content.replace(oldMessage, newMessage);
  
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
        console.log(`✓ ${filePath}`);
        count++;
      }
    }
  }
  return count;
}

console.log('Updating WhatsApp message to "Hi"...\n');
let totalCount = 0;

const mplDir = path.join(__dirname, 'Event/www.mpleventmanagement.com');
const chennaiDir = path.join(__dirname, 'Event/www.chennaieventmanagementservice.com');

console.log('Processing MPL folder:');
totalCount += processDirectory(mplDir);

console.log('\nProcessing Chennai folder:');
totalCount += processDirectory(chennaiDir);

console.log(`\n✅ Updated ${totalCount} files with new WhatsApp message!`);
