const fs = require('fs');
const path = require('path');

function updatePhoneNumbers(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (!['node_modules', 'hts-cache', 'www.googletagmanager.com'].includes(file)) {
        updatePhoneNumbers(fullPath);
      }
      return;
    }
    
    if (file.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      const oldPhone = '9841435108';
      const newPhone = '9769511851';
      
      if (content.includes(oldPhone)) {
        content = content.replace(/9841435108/g, newPhone);
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  });
}

updatePhoneNumbers('.');
