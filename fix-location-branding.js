import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const locationReplacements = {
  // Remove Chennai completely, replace with Mumbai and Bihar
  'Chennai': 'Mumbai & Mithila Region (Bihar)',
  'Chennai,': 'Mumbai & Mithila Region (Bihar),',
  'in Chennai': ' in Mumbai & Mithila Region (Bihar)',
  'In Chennai': ' In Mumbai & Mithila Region (Bihar)',
  'Anna Nagar, Chennai': 'Mumbai & Mithila Region (Bihar)',
  'Chennai – 600040': 'Mumbai & Mithila Region (Bihar)',
  'Chennai – 600040.': 'Mumbai & Mithila Region (Bihar)',
  'Chennaieventmanagementservice.com': 'www.mpleventmanagement.com',
  'Chennai Event Management,': 'MPL Event Management,',
  'event-management-company-chennai': 'event-management-company-mpl',
  'corporate-event-planner-organizer-chennai': 'corporate-event-planner-organizer-mpl',
  'event-planner-chennai': 'event-planner-mpl'
};

function applyReplacements(content) {
  let result = content;
  for (const [oldStr, newStr] of Object.entries(locationReplacements)) {
    // Create case-insensitive regex for replacements
    const regex = new RegExp(oldStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    result = result.replace(regex, newStr);
  }
  return result;
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
      console.log(`Processing: ${filePath}`);
      let content = fs.readFileSync(filePath, 'utf-8');
      const originalContent = content;
      content = applyReplacements(content);
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf-8');
        count++;
      }
    }
  }
  return count;
}

// Apply location branding to all folders
const dirs = [
  path.join(__dirname, 'Event/www.chennaieventmanagementservice.com'),
  path.join(__dirname, 'Event/www.mpleventmanagement.com')
];

for (const dir of dirs) {
  console.log(`\nProcessing directory: ${dir}`);
  const count = processDirectory(dir);
  console.log(`Updated ${count} files in ${dir}`);
}

console.log('\nLocation branding fixed! Service now shows Mumbai & Mithila Region (Bihar) only.');
