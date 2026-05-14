import fs from 'fs';
import path from 'path';
import { createOpenAIClient } from './openai-client.js';

const client = createOpenAIClient();
const articleSlug = process.argv[2];

if (!articleSlug) {
  console.error('Usage: npm run generate:shorts -- article-slug');
  process.exit(1);
}

const articlesDir = path.resolve('./src/content/articles');
const articlePath = path.join(articlesDir, `${articleSlug}.md`);

if (!fs.existsSync(articlePath)) {
  console.error(`Article not found: ${articlePath}`);
  process.exit(1);
}

const content = fs.readFileSync(articlePath, 'utf-8');
const [, frontmatter, body] = content.split('---');
const title = frontmatter.match(/title: "(.+?)"/)?.[1] || 'Home Security Gadget';
const keyword = frontmatter.match(/keyword: "(.+?)"/)?.[1] || 'home security';

const prompt = `Convert this blog article into 3 engaging YouTube Shorts scripts (each 45-60 seconds when read). Each script should:
- Start with an attention-grabbing hook
- Feature a trending product or viral gadget (mention brand and model)
- Include a clear benefit or pain point for smart home security shoppers
- End with a call-to-action (e.g., "link in bio for the latest deal")
- Use language like "trending", "viral", "must-have", and "top seller"
- Be shareable, catchy, and ideal for YouTube Shorts

Return as JSON array with 3 objects, each with "title", "hook", "body", and "cta" fields.

Article content:
${body}`;

async function generateShorts() {
  console.log(`Generating YouTube Shorts scripts from: ${articleSlug}`);

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 2000,
  });

  const responseText = response.choices[0]?.message?.content || '';
  let shorts;

  try {
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    shorts = JSON.parse(jsonMatch?.[0] || responseText);
  } catch (error) {
    console.error('Failed to parse shorts JSON:', error);
    process.exit(1);
  }

  const shortsDir = path.resolve('./src/content/shorts');
  if (!fs.existsSync(shortsDir)) {
    fs.mkdirSync(shortsDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().split('T')[0];
  const shortsFile = path.join(shortsDir, `${articleSlug}-${timestamp}.json`);

  const shortsData = {
    articleSlug,
    title,
    keyword,
    generatedAt: new Date().toISOString(),
    status: 'pending-approval',
    shorts: Array.isArray(shorts) ? shorts : [shorts],
  };

  fs.writeFileSync(shortsFile, JSON.stringify(shortsData, null, 2), 'utf-8');
  console.log(`✓ Generated ${shortsData.shorts.length} shorts scripts: ${shortsFile}`);
  console.log('Status: pending-approval');
  console.log('Run: npm run approve:shorts -- ' + path.basename(shortsFile));
}

generateShorts().catch((error) => {
  console.error(error);
  process.exit(1);
});
