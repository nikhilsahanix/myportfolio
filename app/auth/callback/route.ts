// app/auth/callback/route.ts
import { NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/admin/dashboard';

  console.log('🔵 Auth callback received:', { 
    hasCode: !!code, 
    next,
    origin,
    url: request.url 
  });

  if (code) {
    const cookieStore = await cookies();
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            const cookie = cookieStore.get(name)?.value;
            console.log('🍪 Getting cookie:', name, cookie ? 'exists' : 'missing');
            return cookie;
          },
          set(name: string, value: string, options: CookieOptions) {
            console.log('🍪 Setting cookie:', name);
            cookieStore.set({ 
              name, 
              value, 
              ...options,
              // Ensure cookies work on Vercel
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/',
            });
          },
          remove(name: string, options: CookieOptions) {
            console.log('🍪 Removing cookie:', name);
            cookieStore.set({ 
              name, 
              value: '', 
              ...options,
              maxAge: 0,
              path: '/',
            });
          },
        },
      }
    );
    
    try {
      // Exchange the code for a session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error('❌ Auth exchange failed:', error);
        return NextResponse.redirect(`${origin}/admin/login?error=${encodeURIComponent(error.message)}`);
      }

      console.log('✅ Auth exchange successful:', { 
        user: data?.user?.email,
        session: !!data?.session 
      });

      // Verify we can get the user immediately after
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('❌ Failed to get user after exchange:', userError);
        return NextResponse.redirect(`${origin}/admin/login?error=verification_failed`);
      }

      console.log('✅ User verified:', user.email);

      // Redirect to dashboard
      const redirectUrl = `${origin}${next}`;
      console.log('🔀 Redirecting to:', redirectUrl);
      
      return NextResponse.redirect(redirectUrl);
      
    } catch (err) {
      console.error('❌ Unexpected error in callback:', err);
      return NextResponse.redirect(`${origin}/admin/login?error=unexpected_error`);
    }
  }

  // No code present
  console.error('❌ No code in callback URL');
  return NextResponse.redirect(`${origin}/admin/login?error=no_code`);
}