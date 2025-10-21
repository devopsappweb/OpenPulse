# NewsHub: Free DevOps, Security, Darkweb & GenAI News Aggregator

A free, open-source Next.js dashboard that fetches, summarizes, and displays the latest headlines from Security, DevOps, GenAI, and Darkweb sources. Powered by Supabase, Vercel, Tailwind CSS, ShadCN UI, and Hugging Face summarization (optional). **No paid services, no credit card required.**

---
## Features

- 📰 Aggregates news every hour from leading RSS feeds (Security, DevOps, GenAI, Darkweb)
- 💾 Stores headlines in Supabase (PostgreSQL, free tier)
- 📑 Auto-summarizes with Hugging Face API (optional, free tier)
- 💡 Responsive, modern UI (Next.js, Tailwind CSS, ShadCN UI)
- 🌙 Dark/light theme toggle
- 🔄 Scheduled fetch via Vercel Cron or Supabase Functions
- 🚀 Free hosting on Vercel
- 🔗 Exposes `/api/news` JSON endpoint for integrations
- 🏷️ Filter by category (tabs)

---
## Setup

### 1. Supabase

- [Create a free Supabase project](https://app.supabase.com/)
- Go to **SQL Editor** → **Run SQL**:

```sql
CREATE TABLE news (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  source text NOT NULL,
  category text NOT NULL,
  url text NOT NULL,
  summary text,
  published_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_news_published_at ON news(published_at DESC);
```

- Get your API keys from **Project Settings → API**.

### 2. Clone & Install

```bash
git clone https://github.com/devopsappweb/OpenPulse.git
cd OpenPulse
npm install
```

### 3. Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
HUGGINGFACE_API_KEY=your_huggingface_api_key # Optional
```

### 4. Vercel Hosting

- [Import your repo to Vercel](https://vercel.com/import)
- Add your environment variables in Vercel dashboard

### 5. Scheduled News Fetch

- Use [Vercel Cron](https://vercel.com/docs/cron-jobs) or [Supabase Edge Functions](https://supabase.com/docs/guides/functions/schedule) to run `scripts/fetchNews.ts` hourly

### 6. Start Dev Server

```bash
npm run dev
```

---
## Folder Structure

```
OpenPulse/
├── components/
│   ├── NewsDashboard.tsx      # Main dashboard UI
│   ├── ThemeToggle.tsx        # Dark-light switch
├── pages/
│   ├── api/
│   │   └── news.ts            # JSON API endpoint
│   ├── index.tsx              # Home page
├── scripts/
│   └── fetchNews.ts           # Fetch & store news (cron)
├── styles/
│   └── globals.css            # Tailwind base styles
├── public/                    # Static assets
├── .env.local                 # Local secrets (not committed)
├── README.md
└── package.json
```

---
## Customization

- **Add RSS feeds:** Edit `scripts/fetchNews.ts` sources array
- **UI styling:** Tweak `components/NewsDashboard.tsx` and Tailwind config
- **Categories:** Add/remove in `categories` array of dashboard component

---
## License

MIT. No warranty. Use responsibly!

.env.local.example:
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
HUGGINGFACE_API_KEY=your_huggingface_api_key