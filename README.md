# SecureHomeGadgets AI SEO Starter

A zero-touch Astro website starter for the home security niche. It includes AI-assisted content generation, SEO-friendly static pages, and automation hooks for future CI workflows.

## What’s included

- Astro static site with a simple blog structure
- AI content generation script using OpenAI
- Content stored as Markdown in `src/content/articles`
- Zero-touch automation-ready architecture for deployment and scheduled generation

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root with:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   SITE_NAME=Secure Home Gadgets
   SITE_URL=https://securehomegadgets.com
   ```
3. Run the local site:
   ```bash
   npm run dev
   ```

## Generate a new article

```bash
npm run generate -- "best smart home cameras 2026"
```

This writes a new markdown article into `src/content/articles` and includes SEO-friendly frontmatter.

## GitHub automation

The project includes a GitHub Actions workflow at `.github/workflows/ai-content-schedule.yml`.
It is configured to run weekly and will generate a new article automatically if `OPENAI_API_KEY` is available as a repository secret.

## Next steps

- Add your OpenAI API key as a secret in GitHub or your deployment provider
- Configure a deployment platform such as Vercel or Netlify
- Extend `scripts/generate.js` with keyword research or scheduled generation
