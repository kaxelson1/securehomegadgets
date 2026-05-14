import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SITE_URL = process.env.SITE_URL || 'https://securehomegadgets.com';

if (!OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY in .env');
  process.exit(1);
}

const client = new OpenAI({ apiKey: OPENAI_API_KEY });
const keyword = process.argv.slice(2).join(' ').trim();

if (!keyword) {
  console.error('Usage: npm run generate:content -- "keyword phrase"');
  process.exit(1);
}

const slug = keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const fileName = `${slug}.md`;
const targetDir = path.resolve('./src/content/articles');
const filePath = path.join(targetDir, fileName);

const prompt = `Write a long-form, SEO-optimized article for a home security gadget buyer audience using the keyword phrase: "${keyword}". Focus on currently trending and viral smart home security products in 2026. Include:
- A short introduction that highlights why these devices are trending now
- At least 5 helpful sections with product recommendations for trending doorbells, cameras, locks, and sensors
- A conclusion with a strong call-to-action and affiliate-minded language
- Mention smart home gadgets, cameras, sensors, installation tips, and security best practices
- Use comparative language (best, top, vs, trending) and recommend products people are currently searching for
Output only Markdown with no code blocks. Make it 1200+ words.`;

async function generateArticle() {
  console.log(`Generating article for keyword: ${keyword}`);

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 2000,
  });

  const articleBody = response.choices[0]?.message?.content || '';

  if (!articleBody.trim()) {
    console.error('No content generated from the OpenAI API.');
    process.exit(1);
  }

  const title = keyword
    .split(' ')
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(' ');
  const description = `AI-generated home security guide on ${keyword}.`;
  const date = new Date().toISOString().split('T')[0];

  const markdown = `---\ntitle: "${title}"\ndescription: "${description}"\ndate: "${date}"\nkeyword: "${keyword}"\ntags: "home security, smart home, gadgets"\ncanonical: "${SITE_URL}/blog/${slug}"\n---\n\n${articleBody.trim()}\n`;

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.writeFileSync(filePath, markdown, 'utf-8');
  console.log(`✓ Article generated: ${filePath}`);
  console.log(`  URL: ${SITE_URL}/blog/${slug}`);
}

generateArticle().catch((error) => {
  console.error(error);
  process.exit(1);
});

