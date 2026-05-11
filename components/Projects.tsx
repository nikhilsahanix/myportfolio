// components\Projects.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useReveal } from './useReveal';

interface Project {
  id: string;
  slug: string;
  title: string;
  brief_details: string;
  tech_stacks: string[] | null;
  github_url: string | null;
  live_demo_url: string | null;
}

export default function Projects() {


  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useReveal(projects);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects', { cache: 'no-store' });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.error || 'Failed to load projects');
        }

        const normalized = Array.isArray(payload?.projects)
          ? payload.projects.map((p: any) => ({
            ...p,
            tech_stacks: Array.isArray(p?.tech_stacks) ? p.tech_stacks : [],
          }))
          : [];

        setProjects(normalized);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <section id="projects" className="py-28 px-6 md:px-12 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 rounded-2xl bg-card border border-border animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-28 px-6 md:px-12 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-red-400">
            <p className="font-semibold">Error loading projects</p>
            <p className="text-sm mt-1 opacity-70">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-28 px-6 md:px-12 bg-surface">
      <div className="max-w-6xl mx-auto">
        <p className="reveal text-xs font-semibold tracking-[0.25em] uppercase text-accent mb-6">
          Projects
        </p>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <h2 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl font-bold text-ink leading-tight">
            Things I&apos;ve <span className="gradient-text">built.</span>
          </h2>
          <a
            href="https://github.com/nikhilsahanix"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal reveal-delay-2 text-sm text-muted hover:text-accent transition-colors shrink-0 font-medium"
          >
            All on GitHub ↗
          </a>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <p className="text-muted font-medium">No projects yet.</p>
            <p className="text-sm text-muted/50 mt-2">Add your first project from the admin dashboard.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p, i) => {
              const techStacks = p.tech_stacks || [];
              const displayNumber = String(i + 1).padStart(2, '0');
              const isHighlight = i === 0;

              return (
                <article
                  key={p.id}
                  className={`reveal reveal-delay-${(i % 3) + 1} group relative bg-card border rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 ${isHighlight
                    ? 'border-accent/30 shadow-[0_0_30px_rgba(124,92,252,0.12)] md:col-span-2 lg:col-span-1'
                    : 'border-border hover:border-accent/25 hover:shadow-[0_0_30px_rgba(124,92,252,0.08)]'
                    }`}
                >
                  <span className="font-display text-7xl font-extrabold text-border/40 group-hover:text-accent/15 transition-colors duration-300 absolute top-3 right-5 leading-none select-none pointer-events-none">
                    {displayNumber}
                  </span>

                  <div className="relative z-10">
                    <h3 className="font-display text-xl font-bold text-ink mb-3 group-hover:text-accent transition-colors duration-200">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mb-5 line-clamp-3">
                      {p.brief_details}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {techStacks.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 bg-accent/10 border border-accent/15 rounded-full text-muted font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 relative z-10 items-center mt-auto border-t border-border/50 pt-4">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="text-xs font-semibold text-muted hover:text-accent transition-colors mr-auto"
                    >
                      Case Study →
                    </Link>

                    {p.github_url && (
                      <a
                        href={p.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-muted/60 hover:text-ink transition-colors"
                      >
                        GitHub ↗
                      </a>
                    )}
                    {p.live_demo_url && (
                      <a
                        href={p.live_demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-accent hover:text-ink transition-colors"
                      >
                        Live ↗
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
