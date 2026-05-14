# SecureHomeGadgets AI SEO Empire

A complete zero-touch, AI-powered system for building a profitable home security gadget website with:

- **Automated blog content** via OpenAI (SEO-optimized, affiliate-ready)
- **YouTube Shorts** automation (script generation + upload)
- **Affiliate monetization** (Amazon Associates, Best Buy, etc.)
- **Email approval workflow** for content safety
- **Weekly automation** via GitHub Actions

## Quick Start

### 1. Environment Setup

Create `.env`:

```env
OPENAI_API_KEY=sk-...your-key...
SITE_URL=https://securehomegadgets.com
SITE_NAME=Secure Home Gadgets
YOUTUBE_CHANNEL=@securehomegadgets
AMAZON_ASSOCIATE_ID=your-associate-tag
BESTBUY_AFFILIATE_ID=your-affiliate-id
```

### 2. Install & Sync

```bash
npm install
npm run sync:products
```

### 3. Dev Server

```bash
npm run dev
```

Open `http://localhost:4321/`

## Automation Workflow

### Step 1: Plan Topics

```bash
npm run plan:topics -- "smart home security cameras"
```

AI generates 5 SEO-optimized topic ideas → `scripts/plan.json`

### Step 2: Generate Blog Article

```bash
npm run generate:content -- "best wireless security cameras for apartments"
```

Publishes to `src/content/articles/` with SEO metadata:
- `title`, `description`, `keyword`, `canonical`
- Product mentions for affiliate placement
- 1200+ word count

### Step 3: Generate YouTube Shorts Scripts

```bash
npm run generate:shorts -- best-wireless-security-cameras-for-apartments
```

Creates 3 engaging YouTube Shorts scripts (45-60 sec each) → `src/content/shorts/`
- Attention-grabbing hooks
- Product features
- Call-to-action with affiliate link

Status: `pending-approval`

### Step 4: Review & Approve

```bash
npm run approve:shorts
```

Lists all pending scripts. Approve with:

```bash
npm run approve:shorts -- best-wireless-security-cameras-for-apartments-2026-05-13.json
```

Moves to `src/content/shorts-approved/`

### Step 5: Generate Videos

Videos are generated from approved scripts using:

- **Synthesia** (AI avatars, most professional) ⭐ Recommended
- **HeyGen** (realistic avatars, great engagement)
- **Runway ML** (creative, style-transfer videos)
- **FFmpeg + TTS** (budget option)

**For now:** Scripts are ready for external video generation. Place MP4 files in `./videos/`

### Step 6: Upload to YouTube

```bash
npm run upload:youtube
```

*(Requires YouTube API credentials)*

## Monetization Streams

### 1. Affiliate Revenue 💰

**Setup:**
- Update `.env` with `AMAZON_ASSOCIATE_ID` and `BESTBUY_AFFILIATE_ID`
- Run `npm run sync:products` to populate product database

**How it works:**
- Blog articles mention specific products with links
- YouTube Shorts include product names + "link in bio"
- Affiliate URLs auto-inserted in description

**Products included:**
- Ring Video Doorbell Pro
- Google Nest Cam Outdoor
- Wyze Cam v3
- Samsung Smart Lock
- *(Add more in `scripts/sync-products.js`)*

### 2. YouTube Shorts Revenue 📺

- Eligible for YouTube Partner Program once you hit 1,000 subscribers + 4,000 watch hours
- Estimated: $100-$500/month at 100k monthly views

### 3. Website Ad Revenue 📰

Setup Google AdSense or Ezoic for display ads on blog posts.
- Estimated: $2-$10 CPM (depends on traffic quality)

### 4. Email List (Future) 📧

Add Mailchimp/ConvertKit integration for newsletter monetization.

## Project Structure

```
securehomegadgets/
├── src/
│   ├── pages/
│   │   ├── index.astro         # Homepage
│   │   ├── blog/[slug].astro   # Blog post pages
│   │   └── products.astro      # Product showcase
│   ├── content/
│   │   ├── articles/           # Published blog posts (.md)
│   │   ├── shorts/             # Pending YouTube scripts (.json)
│   │   ├── shorts-approved/    # Approved (ready for video)
│   │   └── shorts-uploaded/    # Published to YouTube
│   └── data/
│       └── products.json       # Affiliate product database
├── scripts/
│   ├── plan-topics.js          # AI topic research
│   ├── generate-article.js     # AI blog writer
│   ├── generate-shorts.js      # AI shorts scriptwriter
│   ├── approve-shorts.js       # Approval CLI
│   ├── upload-youtube.js       # YouTube automation
│   └── sync-products.js        # Affiliate product sync
├── videos/                     # Generated MP4 files
├── .github/workflows/          # GitHub Actions
├── package.json
├── astro.config.mjs
└── README.md
```

## GitHub Actions Automation

Workflows in `.github/workflows/`:

1. **Weekly Topics** → Articles
2. **Monthly Shorts** generation
3. **Auto-commit** to repo

**To enable:**

Add repository secrets in GitHub:
- `OPENAI_API_KEY`
- `YOUTUBE_CHANNEL`
- `AMAZON_ASSOCIATE_ID`

## Monetization Roadmap

| Stage          | Timeline | Revenue Target | Actions                            |
| -------------- | -------- | -------------- | ---------------------------------- |
| Foundation     | Now      | $0 (setup)     | ✅ Create 20+ articles, 50+ shorts |
| Growth         | Month 3  | $500-$1k       | Launch YouTube channel, get 1k subs |
| Scaling        | Month 6  | $2k-$5k        | 100+ articles, 5k YouTube subs     |
| Monetization   | Month 9  | $5k-$10k       | YouTube Partner, AdSense approved  |

## Next Steps

1. ✅ Set up `.env` with OpenAI API key
2. ⏳ Run `npm run plan:topics` to test AI integration
3. ⏳ Create first article with `npm run generate:content`
4. ⏳ Set up YouTube channel
5. ⏳ Configure video generation API (Synthesia/HeyGen)
6. ⏳ Deploy to Vercel/Netlify + GitHub Actions
7. ⏳ Monitor analytics and iterate

## Support

- Astro Docs: https://docs.astro.build
- OpenAI API: https://platform.openai.com/docs
- YouTube API: https://developers.google.com/youtube

---

**Built for:** securehomegadgets.com
**Updated:** May 13, 2026
