import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(req, res) {
  const { category } = req.query;
  const query = supabase
    .from('news')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(100);

  if (category) query.eq('category', category);

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
}