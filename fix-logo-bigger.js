import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // Replace current logo size with much bigger size
    const oldLogoRegex = /width="280"\s+height="120"/g;
    const newLogoSize = 'width="400" height="170"';
    
    if (oldLogoRegex.test(content)) {
      content = content.replace(oldLogoRegex, newLogoSize);
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`✓ Updated: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`✗ Error processing ${filePath}: ${error.message}`);
    return false;
  }
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
        count++;
      }
    }
  }

  return count;
}

// Process all HTML files
const rootDir = path.join(__dirname);
console.log('Making logo much bigger...\n');
const updatedCount = processDirectory(rootDir);
console.log(`\n✓ Updated ${updatedCount} files`);
