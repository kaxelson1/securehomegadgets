import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const SITE_URL = process.env.SITE_URL || 'https://securehomegadgets.com';
const YOUTUBE_CHANNEL = process.env.YOUTUBE_CHANNEL || '@securehomegadgets';
const AMAZON_ASSOCIATE_ID = process.env.AMAZON_ASSOCIATE_ID || '';

const approvedDir = path.resolve('./src/content/shorts-approved');
const uploadedDir = path.resolve('./src/content/shorts-uploaded');

if (!fs.existsSync(uploadedDir)) {
  fs.mkdirSync(uploadedDir, { recursive: true });
}

const files = fs.readdirSync(approvedDir).filter((f) => f.endsWith('.json'));

if (files.length === 0) {
  console.log('No approved shorts to upload');
  process.exit(0);
}

async function uploadToYouTube() {
  console.log(`Found ${files.length} approved shorts ready to upload`);
  console.log('');
  console.log('NEXT STEPS (Manual for now):');
  console.log('1. Install YouTube API credentials in .env:');
  console.log('   - YOUTUBE_CLIENT_ID');
  console.log('   - YOUTUBE_CLIENT_SECRET');
  console.log('   - YOUTUBE_REFRESH_TOKEN');
  console.log('');
  console.log('2. Generate video files from approved shorts scripts:');
  console.log('   Recommended: Use Synthesia, HeyGen, or Runway ML API');
  console.log('');
  console.log('3. Videos to generate:');

  files.forEach((file) => {
    const data = JSON.parse(fs.readFileSync(path.join(approvedDir, file), 'utf-8'));
    data.shorts.forEach((short, idx) => {
      const affiliateLink = AMAZON_ASSOCIATE_ID
        ? `\n🔗 Amazon: https://amazon.com (with tag=${AMAZON_ASSOCIATE_ID})`
        : '';
      console.log(`
[${data.articleSlug} - Short ${idx + 1}]
Title: ${short.title}
Hook: ${short.hook}
Body: ${short.body}
CTA: ${short.cta}${affiliateLink}
`);
    });
  });

  console.log(`\nOnce videos are created, move MP4 files to ./videos/`);
  console.log('Then run: npm run upload:youtube -- confirm');
}

uploadToYouTube().catch((error) => {
  console.error(error);
  process.exit(1);
});
