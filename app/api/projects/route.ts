// app\api\projects\route.ts

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      {
        projects: [],
        error: 'Supabase environment variables are missing.',
      },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const baseQuery = supabase
    .from('projects')
    .select('id, slug, title, brief_details, tech_stacks, github_url, live_demo_url');

  let result = await baseQuery.order('created_at', { ascending: false });

  // Backward-compatible query when created_at does not exist in schema.
  if (result.error?.message?.toLowerCase().includes('created_at')) {
    result = await baseQuery;
  }

  if (result.error) {
    return NextResponse.json(
      {
        projects: [],
        error: result.error.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ projects: result.data ?? [] });
}
