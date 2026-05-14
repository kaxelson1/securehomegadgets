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

const client = new OpenAI({ apiKey: OPENAI_API_KEY });
const topic = process.argv.slice(2).join(' ').trim() || 'home security';

const prompt = `Generate 5 unique blog post topics and target keyword phrases for an AI-powered home security gadgets website. Focus on product reviews, comparisons, and buying guides that would generate affiliate revenue from Amazon, Best Buy, and other retailers.

Return ONLY a JSON array of objects with this structure:
[
  {
    "title": "Best Smart Door Locks for 2026",
    "keyword": "best smart door locks",
    "difficulty": "medium",
    "searchVolume": 5400
  }
]

Topic area: ${topic}`;

async function planTopics() {
  console.log(`Planning content topics for: ${topic}`);
  console.log('');

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 800,
  });

  const text = response.choices[0]?.message?.content || '';
  let topics;

  try {
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    topics = JSON.parse(jsonMatch?.[0] || text);
  } catch (error) {
    console.error('Failed to parse topics JSON:', error);
    console.error('Raw response:', text);
    process.exit(1);
  }

  const planDir = path.resolve('./scripts');
  const planFile = path.join(planDir, 'plan.json');

  const plan = {
    topic,
    generatedAt: new Date().toISOString(),
    topics: Array.isArray(topics) ? topics : [topics],
  };

  fs.writeFileSync(planFile, JSON.stringify(plan, null, 2), 'utf-8');

  console.log(`✓ Generated ${plan.topics.length} topic ideas:`);
  console.log('');
  plan.topics.forEach((t, idx) => {
    console.log(`${idx + 1}. ${t.title}`);
    console.log(`   Keyword: "${t.keyword}"`);
    console.log(`   Difficulty: ${t.difficulty} | Volume: ${t.searchVolume}`);
    console.log('');
  });

  console.log(`\nTo generate an article, run:`);
  console.log(`  npm run generate:content -- "${plan.topics[0].keyword}"`);
}

planTopics().catch((error) => {
  console.error(error);
  process.exit(1);
});
