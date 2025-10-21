import { useState, useEffect } from 'react';
import { Tabs, Tab } from '@shadcn/ui/tabs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const categories = ['all', 'security', 'devops', 'genai', 'darkweb'];

export default function NewsDashboard() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let url = '/api/news';
    if (category !== 'all') url += `?category=${category}`;
    fetch(url)
      .then(res => res.json())
      .then(data => { setNews(data); setLoading(false); });
  }, [category]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Tabs value={category} onChange={setCategory}>
        {categories.map(cat => (
          <Tab key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</Tab>
        ))}
      </Tabs>
      <div className="mt-6">
        {loading ? (
          <div>Loading...</div>
        ) : (
          news.map(item => (
            <div key={item.id} className="mb-4 p-4 rounded shadow bg-white dark:bg-gray-800">
              <a href={item.url} target="_blank" rel="noopener" className="text-lg font-bold">{item.title}</a>
              <div className="text-xs text-gray-500">{item.source} • {new Date(item.published_at).toLocaleString()}</div>
              <div className="mt-2">{item.summary || item.title}</div>
              <div className="text-xs mt-2">{item.category}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}