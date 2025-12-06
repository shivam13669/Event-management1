import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // Replace old logo size with new larger size and fix typo
    const oldLogoRegex = /width="160"\s+heigth="70"/g;
    const newLogoSize = 'width="280" height="120"';
    
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
console.log('Increasing logo size...\n');
const updatedCount = processDirectory(rootDir);
console.log(`\n✓ Updated ${updatedCount} files`);
