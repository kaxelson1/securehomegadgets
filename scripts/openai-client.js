import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY?.trim();

function isInvalidApiKey(key) {
  if (!key) {
    return true;
  }

  const placeholderValues = [
    'sk-proj-your-key-here',
    'your-api-key-here',
    'sk-...'
  ];

  return (
    placeholderValues.includes(key) ||
    key.includes('your-key') ||
    key.length < 40
  );
}

export function createOpenAIClient() {
  if (!OPENAI_API_KEY) {
    console.error('Missing OPENAI_API_KEY in .env. Copy .env.example to .env and add your actual OpenAI API key from platform.openai.com.');
    process.exit(1);
  }

  if (isInvalidApiKey(OPENAI_API_KEY)) {
    console.error('Invalid OPENAI_API_KEY in .env. Replace the placeholder value with your real OpenAI API key from platform.openai.com.');
    process.exit(1);
  }

  return new OpenAI({ apiKey: OPENAI_API_KEY });
}
