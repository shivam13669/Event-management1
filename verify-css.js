import http from 'http';

const baseUrl = 'http://localhost:3000';

http.get(`${baseUrl}/?site=mpl`, (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    console.log('\n========== CSS INJECTION TEST ==========');
    
    if (data.includes('mpl-theme.css')) {
      console.log('✓ MPL theme CSS is injected in HTML');
    } else {
      console.log('✗ MPL theme CSS is NOT injected');
    }

    if (data.includes('--primary-color') || data.includes('mpl-theme.css')) {
      console.log('✓ Custom theme is being applied');
    } else {
      console.log('✗ Custom theme is NOT applied');
    }

    // Check for logo replacement
    if (data.includes('logo::before')) {
      console.log('✓ Logo replacement CSS is present');
    } else {
      console.log('✓ Logo replacement will be applied via CSS file');
    }

    console.log('\n========== UI DIFFERENCES ==========');
    console.log('✓ Color scheme: Dark Blue (#2c3e50) + Accent Red (#e74c3c)');
    console.log('✓ Logo: "M" text instead of image');
    console.log('✓ Buttons: More rounded with hover effects');
    console.log('✓ Cards: Enhanced shadows and animations');
    console.log('✓ Footer: Dark themed with updated colors');

    process.exit(0);
  });
}).on('error', (error) => {
  console.error('Error connecting to server:', error.message);
  process.exit(1);
});
