// app/admin/login/page.tsx (updated)
'use client';

import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { useState } from "react";

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleGitHubLogin = async () => {
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `https://nikhilsahani.in/auth/callback?next=/admin/dashboard`,
        queryParams: {
          prompt: "consent",
        },
      },
    });

    if (error) {
      console.error('Login error:', error);
      setIsLoading(false);
    }
    // If no error, user will be redirected to GitHub
  };

  return (
    <div className="dot-grid flex min-h-screen flex-col items-center justify-center bg-bg font-body text-ink p-6 relative">
      {/* Quick link back to the main site for lost visitors */}
      <div className="absolute top-8 left-6 md:left-12">
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          Back to Portfolio
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="animate-fade-up w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
        {/* Decorative top border line */}
        <div className="h-1.5 w-full bg-accent"></div>

        <div className="p-8 md:p-12">
          {/* Status Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent"></span>
            Restricted Area
          </div>

          <h1 className="mb-4 font-display text-3xl font-bold text-ink md:text-4xl">
            Command Center
          </h1>

          {/* Instructions and Warnings */}
          <div className="mb-8 space-y-4 text-sm leading-relaxed text-muted">
            <p>
              Welcome to the backstage. This dashboard is exclusively reserved for <strong>Nikhil Sahani</strong> to manage database records, publish new case studies, and document project tech stacks.
            </p>

            <div className="rounded-lg border border-border bg-bg p-4 text-ink">
              <p className="font-semibold mb-1 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                  <path d="M12 9v4"></path>
                  <path d="M12 17h.01"></path>
                </svg>
                Notice to Visitors
              </p>
              <p className="text-muted">
                If you are a recruiter, fellow developer, or a curious traveler, you will not be able to log in here. The database Row Level Security (RLS) is strictly locked to my personal GitHub identity.
              </p>
            </div>
          </div>

          {/* Login Action */}
          <div className="border-t border-border pt-8">
            <button
              onClick={handleGitHubLogin}
              disabled={isLoading}
              className="group flex w-full items-center justify-center gap-3 rounded-lg bg-ink px-6 py-3.5 text-sm font-semibold text-card transition-all duration-300 hover:-translate-y-1 hover:bg-accent hover:shadow-lg active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Redirecting to GitHub...
                </>
              ) : (
                <>
                  <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor" className="transition-transform group-hover:scale-110">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                  Authenticate as Nikhil
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}