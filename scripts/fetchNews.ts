import { createClient } from '@supabase/supabase-js';
import Parser from 'rss-parser';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const sources = [
  { url: 'https://feeds.feedburner.com/TheHackersNews', source: 'The Hacker News', category: 'security' },
  { url: 'https://www.bleepingcomputer.com/feed/', source: 'BleepingComputer', category: 'security' },
  { url: 'https://krebsonsecurity.com/feed/', source: 'KrebsOnSecurity', category: 'security' },
  { url: 'https://dev.to/feed', source: 'Dev.to', category: 'devops' },
  { url: 'https://kubernetes.io/feed.xml', source: 'Kubernetes Blog', category: 'devops' },
  { url: 'https://openai.com/blog/rss.xml', source: 'OpenAI', category: 'genai' },
  { url: 'https://huggingface.co/blog/feed.xml', source: 'HuggingFace', category: 'genai' },
  { url: 'https://deepmind.google/rss.xml', source: 'DeepMind', category: 'genai' },
  // Add darkweb sources with public RSS if available
];

const parser = new Parser();

async function summarize(text: string) {
  if (!process.env.HUGGINGFACE_API_KEY) return null;
  try {
    const res = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputs: text }),
    });
    const data = await res.json();
    return data[0]?.summary_text || null;
  } catch {
    return null;
  }
}

export async function fetchAndSaveNews() {
  for (const s of sources) {
    const feed = await parser.parseURL(s.url);
    for (const item of feed.items) {
      const { data: exists } = await supabase
        .from('news')
        .select('id')
        .eq('url', item.link)
        .eq('published_at', new Date(item.pubDate ?? item.isoDate ?? new Date()).toISOString());

      if (exists && exists.length) continue;

      const summary = await summarize(item.title + '. ' + (item.contentSnippet || ''));

      await supabase.from('news').insert([{
        title: item.title,
        source: s.source,
        category: s.category,
        url: item.link,
        summary,
        published_at: new Date(item.pubDate ?? item.isoDate ?? new Date()).toISOString(),
      }]);
    }
  }
}

if (require.main === module) {
  fetchAndSaveNews().then(() => console.log('News updated!')).catch(console.error);
}