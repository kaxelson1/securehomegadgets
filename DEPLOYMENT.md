# Deployment Guide: SecureHomeGadgets

## Step 1: Prepare for GitHub

```bash
# Initialize git if needed
git init

# Add your remote repository
git remote add origin https://github.com/kaxelson1/securehomegadgets.git

# Create .env from template
cp .env.example .env
# Edit .env with your actual keys
```

## Step 2: Push to GitHub

```bash
git add .
git commit -m "Initial commit: AI-powered SEO empire starter"
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel (Recommended)

### Option A: Vercel CLI

```bash
npm install -g vercel
vercel

# Follow prompts:
# - Link to your GitHub repo
# - Set build command: npm run build
# - Set output directory: dist
```

### Option B: Vercel Dashboard

1. Go to vercel.com
2. Click "New Project"
3. Select your GitHub repo
4. Vercel auto-detects Astro configuration
5. Add environment variables (from .env)
6. Click Deploy

## Step 4: Configure GitHub Actions

1. Go to your GitHub repo → Settings → Secrets and variables → Actions
2. Add these secrets:
   - `OPENAI_API_KEY` = your-key
   - `YOUTUBE_CHANNEL` = @securehomegadgets
   - `AMAZON_ASSOCIATE_ID` = your-tag
   - `SITE_URL` = https://securehomegadgets.com

3. GitHub Actions will now run:
   - **Every Monday 8 AM UTC**: Generate content + YouTube Shorts
   - **On demand**: Run workflow_dispatch

## Step 5: Connect Domain

### In Vercel:

1. Go to Project Settings → Domains
2. Add your domain: `securehomegadgets.com`
3. Follow DNS setup instructions

### DNS Records (Update at your registrar):

```
Type:   CNAME
Name:   @ or www
Value:  cname.vercel-dns.com
TTL:    3600
```

## Step 6: Set Up YouTube Channel

1. Create channel at youtube.com/@securehomegadgets
2. Get YouTube API credentials:
   - Go to console.cloud.google.com
   - Create new project
   - Enable YouTube Data API v3
   - Create OAuth 2.0 credentials
   - Add credentials to .env

3. Link your domain (optional): Add channel.html verification file

## Step 7: Enable Monetization

### YouTube Partner Program

- Reach 1,000 subscribers + 4,000 watch hours
- Apply at youtube.com/creators/how-it-works

### Google AdSense

1. Add AdSense code to astro.config.mjs:
   ```javascript
   // Add to head in pages or global layout
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
   ```

2. Place ads in article pages

### Affiliate Programs

- Already configured in `.env`
- Links auto-inserted in products

## Step 8: Monitor & Optimize

### Analytics Setup

1. Google Analytics:
   - Create property at analytics.google.com
   - Add tracking ID to .env
   - Monitor top-performing content

2. YouTube Analytics:
   - Monitor shorts performance
   - Track subscriber growth
   - Optimize based on CTR and watch time

### Regular Maintenance

Every week:
- Review new content in GitHub
- Check analytics
- Approve YouTube Shorts manually (if needed)
- Adjust topics based on performance

## Troubleshooting

### Build Fails

```bash
npm run build
# Check error messages and fix before pushing
```

### GitHub Actions Not Running

- Verify secrets are added: Settings → Secrets and variables
- Check workflow file: `.github/workflows/ai-content-schedule.yml`
- Manually trigger: Actions tab → Select workflow → "Run workflow"

### YouTube Upload Not Working

- Verify YouTube API credentials in .env
- Check YouTube channel has content enabled
- Ensure refresh token hasn't expired

### Affiliate Links Not Working

- Test each link manually
- Verify associate IDs are correct in .env
- Check Amazon/Best Buy account status

## Scaling Checklist

- [ ] Domain set up and working
- [ ] GitHub Actions running successfully
- [ ] 10+ blog articles published
- [ ] 30+ YouTube Shorts scripts approved
- [ ] YouTube channel at 500+ subscribers
- [ ] Website averaging 100+ monthly visitors
- [ ] First affiliate commission received
- [ ] YouTube channel monetized (if 4k hours)
- [ ] AdSense approved and earning
- [ ] Email list growing (optional)

## Revenue Targets

| Month | Content | Subscribers | Monthly Revenue |
|-------|---------|-------------|-----------------|
| 1     | 10 articles | 50         | $0 (setup)      |
| 3     | 30 articles | 500        | $100-500        |
| 6     | 60 articles | 2,000      | $500-2,000      |
| 9     | 100 articles | 5,000     | $2,000-5,000    |
| 12    | 150 articles | 10,000    | $5,000-10,000   |

## Support

- Astro Docs: https://docs.astro.build
- Vercel Docs: https://vercel.com/docs
- YouTube API: https://developers.google.com/youtube

---

**Good luck!** 🚀
