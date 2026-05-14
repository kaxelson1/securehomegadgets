import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY in .env');
  process.exit(1);
}

const keyword = process.argv.slice(2).join(' ').trim();
if (!keyword) {
  console.error('Usage: npm run plan -- "home security"');
  process.exit(1);
}

const client = new OpenAI({ apiKey: OPENAI_API_KEY });
const prompt = `Generate 5 unique blog post titles and target keyword phrases for an AI-powered home security gadgets website. Return JSON only as an array of strings.`;

async function generatePlan() {
  const response = await client.responses.create({
    model: 'gpt-4.1-mini',
    input: `${prompt} Topic: ${keyword}`,
    max_output_tokens: 400,
  });

  const text = response.output_text || response.output?.[0]?.content?.[0]?.text || '';
  let items;

  try {
    items = JSON.parse(text);
  } catch (error) {
    console.error('Failed to parse plan JSON output:', text);
    process.exit(1);
  }

  const targetPath = path.resolve('./scripts/plan.json');
  fs.writeFileSync(targetPath, JSON.stringify({ keyword, ideas: items }, null, 2), 'utf-8');
  console.log(`Saved ${items.length} topic ideas to ${targetPath}`);
}

generatePlan().catch((error) => {
  console.error(error);
  process.exit(1);
});
