import fs from 'fs';
import path from 'path';

const shortsDir = path.resolve('./src/content/shorts');
const approvedDir = path.resolve('./src/content/shorts-approved');

if (!fs.existsSync(approvedDir)) {
  fs.mkdirSync(approvedDir, { recursive: true });
}

const file = process.argv[2];
if (!file) {
  const pending = fs.readdirSync(shortsDir).filter((f) => f.endsWith('.json'));
  console.log('Pending Shorts for Approval:');
  pending.forEach((f) => console.log(`  ${f}`));
  console.log('\nUsage: npm run approve:shorts -- filename.json');
  process.exit(0);
}

const filePath = path.join(shortsDir, file);
if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
data.status = 'approved';
data.approvedAt = new Date().toISOString();

const approvedPath = path.join(approvedDir, file);
fs.writeFileSync(approvedPath, JSON.stringify(data, null, 2), 'utf-8');
fs.unlinkSync(filePath);

console.log(`✓ Approved and moved to: ${approvedPath}`);
console.log(`Ready to generate videos and upload to YouTube`);
