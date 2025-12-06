import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const oldUrl = 'https://cdn.builder.io/api/v1/image/assets%2Ffacb77d3c6da4b4083bc8acea6edc977%2Feab5b57fd00c45dea4caa42f22a20f2c?format=webp&width=800';
const newUrl = 'https://cdn.builder.io/api/v1/image/assets%2F778fc7d34fc54ef5aa2bc33b16d01d8f%2F78f55454a26342d2be3e1dda7a93ed01?format=webp&width=800';

const filesToUpdate = [
  'index.html',
  'Event/www.chennaieventmanagementservice.com/index.html',
  'Event/www.chennaieventmanagementservice.com/naming-ceremony-event-organizer.html',
  'Event/www.chennaieventmanagementservice.com/incentive-program-trip-planner.html',
  'Event/www.chennaieventmanagementservice.com/press-conference-media-events-planner.html',
  'Event/www.chennaieventmanagementservice.com/school-college-event-planner.html',
  'Event/www.chennaieventmanagementservice.com/live-music-concert-planner.html',
  'Event/www.chennaieventmanagementservice.com/baby-shower-planner-organizer.html',
  'Event/www.chennaieventmanagementservice.com/cultural-programs-traditional-event-planner.html',
  'Event/www.chennaieventmanagementservice.com/brand-activations-event-planner.html',
  'Event/www.chennaieventmanagementservice.com/corporate-training-workshop-planner.html',
  'Event/www.chennaieventmanagementservice.com/wedding-management-planner.html',
  'Event/www.chennaieventmanagementservice.com/mice-event-planner.html',
  'Event/www.chennaieventmanagementservice.com/corporate-event-organizer-chennai.html',
  'Event/www.chennaieventmanagementservice.com/enquire-wedding-corporate-event-plan.html',
  'Event/www.chennaieventmanagementservice.com/annual-general-meeting-planner.html',
  'Event/www.chennaieventmanagementservice.com/event-planner-organiser.html',
  'Event/www.chennaieventmanagementservice.com/team-building-activities-planner.html',
  'Event/www.chennaieventmanagementservice.com/get-togethers-reunions-event-planner.html',
  'Event/www.chennaieventmanagementservice.com/birthday-party-event-organizer.html',
  'Event/www.chennaieventmanagementservice.com/engagement-ceremony-planner.html',
  'Event/www.chennaieventmanagementservice.com/corporate-retreats-event-planner.html',
  'Event/www.chennaieventmanagementservice.com/dealer-meet-event-management.html',
  'Event/www.chennaieventmanagementservice.com/christmas-event-planner.html',
  'Event/www.chennaieventmanagementservice.com/housewarming-event-organizer.html',
  'Event/www.chennaieventmanagementservice.com/puberty-function-event-planner.html',
  'Event/www.chennaieventmanagementservice.com/anniversary-planner-organizer.html',
  'Event/www.chennaieventmanagementservice.com/luxury-lifestyle-event-planners.html',
  'Event/www.chennaieventmanagementservice.com/reception-events-management.html',
  'Event/www.chennaieventmanagementservice.com/trade-show-exhibition-planner.html',
  'Event/www.chennaieventmanagementservice.com/conclave-event-planner.html',
  'Event/www.chennaieventmanagementservice.com/conference-seminars-organizer.html',
  'Event/www.chennaieventmanagementservice.com/new-year-event-planner.html',
  'Event/www.chennaieventmanagementservice.com/channel-partner-meeting-planner.html',
  'Event/www.chennaieventmanagementservice.com/corporate-event-planner-organizer.html',
  'Event/www.chennaieventmanagementservice.com/community-public-events.html',
  'Event/www.chennaieventmanagementservice.com/product-launch-event-planner.html',
  'Event/www.chennaieventmanagementservice.com/event-management-company-chennai.html',
  'Event/www.chennaieventmanagementservice.com/event-planner-chennai.html',
  'Event/www.chennaieventmanagementservice.com/pongal-event-organizer.html',
  'Event/www.chennaieventmanagementservice.com/award-ceremony-event-planner.html',
  'Event/www.chennaieventmanagementservice.com/corporate-summit-event-planner.html',
  'Event/www.mpleventmanagement.com/index.html',
  'Event/www.mpleventmanagement.com/naming-ceremony-event-organizer.html',
  'Event/www.mpleventmanagement.com/incentive-program-trip-planner.html',
  'Event/www.mpleventmanagement.com/press-conference-media-events-planner.html',
  'Event/www.mpleventmanagement.com/pongal-event-organizer.html',
  'Event/www.mpleventmanagement.com/school-college-event-planner.html',
  'Event/www.mpleventmanagement.com/live-music-concert-planner.html',
  'Event/www.mpleventmanagement.com/baby-shower-planner-organizer.html',
  'Event/www.mpleventmanagement.com/cultural-programs-traditional-event-planner.html',
  'Event/www.mpleventmanagement.com/brand-activations-event-planner.html',
  'Event/www.mpleventmanagement.com/corporate-training-workshop-planner.html',
  'Event/www.mpleventmanagement.com/wedding-management-planner.html',
  'Event/www.mpleventmanagement.com/mice-event-planner.html',
  'Event/www.mpleventmanagement.com/corporate-event-organizer-chennai.html',
  'Event/www.mpleventmanagement.com/enquire-wedding-corporate-event-plan.html',
  'Event/www.mpleventmanagement.com/annual-general-meeting-planner.html',
  'Event/www.mpleventmanagement.com/event-planner-organiser.html',
  'Event/www.mpleventmanagement.com/team-building-activities-planner.html',
  'Event/www.mpleventmanagement.com/get-togethers-reunions-event-planner.html',
  'Event/www.mpleventmanagement.com/birthday-party-event-organizer.html',
  'Event/www.mpleventmanagement.com/engagement-ceremony-planner.html',
  'Event/www.mpleventmanagement.com/corporate-retreats-event-planner.html',
  'Event/www.mpleventmanagement.com/dealer-meet-event-management.html',
  'Event/www.mpleventmanagement.com/christmas-event-planner.html',
  'Event/www.mpleventmanagement.com/housewarming-event-organizer.html',
  'Event/www.mpleventmanagement.com/puberty-function-event-planner.html',
  'Event/www.mpleventmanagement.com/anniversary-planner-organizer.html',
  'Event/www.mpleventmanagement.com/luxury-lifestyle-event-planners.html',
  'Event/www.mpleventmanagement.com/reception-events-management.html',
  'Event/www.mpleventmanagement.com/trade-show-exhibition-planner.html',
  'Event/www.mpleventmanagement.com/conclave-event-planner.html',
  'Event/www.mpleventmanagement.com/conference-seminars-organizer.html',
  'Event/www.mpleventmanagement.com/new-year-event-planner.html',
  'Event/www.mpleventmanagement.com/corporate-event-planner-organizer.html',
  'Event/www.mpleventmanagement.com/channel-partner-meeting-planner.html',
  'Event/www.mpleventmanagement.com/community-public-events.html',
  'Event/www.mpleventmanagement.com/product-launch-event-planner.html',
  'Event/www.mpleventmanagement.com/event-planner-chennai.html',
  'Event/www.mpleventmanagement.com/event-management-company-chennai.html',
  'Event/www.mpleventmanagement.com/award-ceremony-event-planner.html',
  'Event/www.mpleventmanagement.com/corporate-summit-event-planner.html'
];

let updated = 0;
let failed = 0;

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes(oldUrl)) {
      content = content.replace(new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newUrl);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Updated: ${file}`);
      updated++;
    } else {
      console.log(`! Skipped (URL not found): ${file}`);
    }
  } catch (err) {
    console.error(`✗ Error updating ${file}: ${err.message}`);
    failed++;
  }
});

console.log(`\nSummary: ${updated} files updated, ${failed} failed`);
