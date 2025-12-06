import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoUrl = 'https://cdn.builder.io/api/v1/image/assets%2Ffacb77d3c6da4b4083bc8acea6edc977%2Feab5b57fd00c45dea4caa42f22a20f2c?format=webp&width=800';
const logoHtml = `Website developed & SEO by <img src="${logoUrl}" alt="khoobneek" style="height: 20px; margin-left: 5px; vertical-align: middle; display: inline-block;">`;

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // Fix duplicate closing div tag (around line 544)
    const duplicateDivRegex = /<div class="ser-csr-overlays">\s*<h4>Community \/ Public Events[^<]*<\/h4>\s*<\/div>\s*<\/div>\s*<\/a>/;
    if (duplicateDivRegex.test(content)) {
      content = content.replace(duplicateDivRegex, (match) => {
        return match.replace(/\s*<\/div>\s*<\/a>$/, '\n                                    </a>');
      });
      modified = true;
    }

    // Replace footer text with logo
    const footerRegex = /<a href="https:\/\/www\.khoobneek\.com\/"[^>]*>Website developed & SEO by khoobneek<\/a>/g;
    if (footerRegex.test(content)) {
      content = content.replace(footerRegex, `<a href="https://www.khoobneek.com/" target="_blank">${logoHtml}</a>`);
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
console.log('Starting footer update...\n');
const updatedCount = processDirectory(rootDir);
console.log(`\n✓ Updated ${updatedCount} files`);
