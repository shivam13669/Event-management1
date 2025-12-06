import http from 'http';

const baseUrl = 'http://localhost:3000';

function testSite(site, expectedStrings) {
  return new Promise((resolve, reject) => {
    const url = site === 'mpl' ? `${baseUrl}/?site=mpl` : baseUrl;
    const options = new URL(url);
    
    http.get(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        console.log(`\n========== ${site.toUpperCase()} Site Test ==========`);
        let allFound = true;
        
        for (const str of expectedStrings) {
          if (data.includes(str)) {
            console.log(`✓ Found: "${str}"`);
          } else {
            console.log(`✗ NOT FOUND: "${str}"`);
            allFound = false;
          }
        }
        
        console.log(`\nTest Result: ${allFound ? 'PASSED' : 'FAILED'}`);
        resolve(allFound);
      });
    }).on('error', reject);
  });
}

async function main() {
  try {
    const chennaiTests = [
      'Chennai Event Management',
      'info@chennaieventmanagementservice.com',
      '+91 98414 35108',
      'Orchestrating Corporate Excellence'
    ];

    const mplTests = [
      'MPL Event Management',
      'contact@mplevent.com',
      '+91 9769511851',
      'Seamless Events, Lasting Memories'
    ];

    console.log('Starting verification of both websites...');
    
    const chennaiPass = await testSite('chennai', chennaiTests);
    const mplPass = await testSite('mpl', mplTests);

    console.log('\n========== FINAL RESULT ==========');
    console.log(`Chennai Site: ${chennaiPass ? '✓ PASS' : '✗ FAIL'}`);
    console.log(`MPL Site: ${mplPass ? '✓ PASS' : '✗ FAIL'}`);

    process.exit(chennaiPass && mplPass ? 0 : 1);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
