'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Project {
    id: string;
    slug: string;
    title: string;
    brief_details: string;
    tech_stacks: string[];
    problems_faced: string | null;
    vibe_coding_fixes: string | null;
    github_url: string | null;
    live_demo_url: string | null;
    created_at: string;
}

// Minimal markdown → HTML (handles ###, **, *, 1., -)
function parseMarkdown(md: string): string {
    return md
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code>$1</code>')
        .replace(/^\d+\.\s+(.+)$/gm, '<li class="numbered">$1</li>')
        .replace(/^\*\s+(.+)$/gm, '<li>$1</li>')
        .replace(/(<li.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(?!<[hul])(.+)$/gm, (line) =>
            line.trim() && !line.startsWith('<') ? `<p>${line}</p>` : line
        );
}

export default function ProjectPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params?.slug as string;

    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;
        fetch(`/api/projects/${slug}`)
            .then((r) => r.json())
            .then((data) => {
                if (data.error) throw new Error(data.error);
                setProject(data.project);
            })
            .catch((e) => setError(e.message))
            .finally(() => setIsLoading(false));
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-abyss flex items-center justify-center">
                <div className="flex gap-2 items-center text-sm text-white/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-azure animate-pulse" />
                    Loading case study…
                </div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen bg-abyss flex items-center justify-center">
                <div className="text-center">
                    <p className="text-white/30 text-sm mb-4">Project not found</p>
                    <Link href="/#projects" className="text-azure text-sm hover:underline">
                        ← Back to projects
                    </Link>
                </div>
            </div>
        );
    }

    const date = new Date(project.created_at).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long',
    });

    return (
        <main className="min-h-screen bg-abyss text-white/80 font-mono">
            {/* ── top nav ── */}
            <nav className="sticky top-0 z-20 border-b border-white/[0.06] bg-abyss/80 backdrop-blur-xl px-6 py-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link
                        href="/#projects"
                        className="text-xs text-white/40 hover:text-azure transition-colors flex items-center gap-2"
                    >
                        ← Back
                    </Link>
                    <div className="flex items-center gap-4">
                        {project.github_url && (
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-white/40 hover:text-white transition-colors"
                            >
                                GitHub ↗
                            </a>
                        )}
                        {project.live_demo_url && (
                            <a
                                href={project.live_demo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-3 py-1.5 rounded-full border border-azure/30 text-azure hover:bg-azure/10 transition-colors"
                            >
                                Live Demo ↗
                            </a>
                        )}
                    </div>
                </div>
            </nav>

            {/* ── hero ── */}
            <header className="max-w-4xl mx-auto px-6 pt-20 pb-16">
                <p className="text-xs tracking-[0.3em] uppercase text-azure/70 mb-5">
                    Case Study · {date}
                </p>

                <h1 className="font-sans text-4xl md:text-6xl font-bold leading-[1.1] text-white mb-6">
                    {project.title}
                </h1>

                <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-2xl mb-10">
                    {project.brief_details}
                </p>

                {/* tech stack pills */}
                <div className="flex flex-wrap gap-2">
                    {(project.tech_stacks || []).map((tag) => (
                        <span
                            key={tag}
                            className="text-xs px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/60"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </header>

            {/* ── divider ── */}
            <div className="max-w-4xl mx-auto px-6">
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* ── content ── */}
            <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">

                {project.problems_faced && (
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <span className="text-xs tracking-[0.25em] uppercase text-white/25">01</span>
                            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-amethyst">
                                Problems Faced
                            </h2>
                        </div>
                        <div
                            className="prose-case"
                            dangerouslySetInnerHTML={{ __html: parseMarkdown(project.problems_faced) }}
                        />
                    </section>
                )}

                {project.vibe_coding_fixes && (
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <span className="text-xs tracking-[0.25em] uppercase text-white/25">02</span>
                            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-mint">
                                Vibe Coding Fixes
                            </h2>
                        </div>
                        <div
                            className="prose-case"
                            dangerouslySetInnerHTML={{ __html: parseMarkdown(project.vibe_coding_fixes) }}
                        />
                    </section>
                )}

                {/* ── footer CTA ── */}
                <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <Link
                        href="/#projects"
                        className="text-sm text-white/40 hover:text-white transition-colors"
                    >
                        ← All projects
                    </Link>
                    <div className="flex gap-4">
                        {project.github_url && (
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-white/40 hover:text-white transition-colors"
                            >
                                View Source ↗
                            </a>
                        )}
                        {project.live_demo_url && (
                            <a
                                href={project.live_demo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-semibold text-azure hover:text-white transition-colors"
                            >
                                Open Live Demo ↗
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* ── prose styles (scoped) ── */}
            <style>{`
        .prose-case h1,
        .prose-case h2,
        .prose-case h3 {
          color: rgba(255,255,255,0.9);
          font-family: var(--font-display);
          font-weight: 700;
          margin: 1.8rem 0 0.75rem;
          letter-spacing: -0.01em;
        }
        .prose-case h3 { font-size: 1.05rem; color: rgba(255,255,255,0.75); }
        .prose-case p  { margin: 0.9rem 0; color: rgba(255,255,255,0.55); line-height: 1.8; font-size: 0.9rem; }
        .prose-case ul { margin: 1rem 0; padding-left: 0; list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
        .prose-case li { position: relative; padding-left: 1.25rem; color: rgba(255,255,255,0.55); font-size: 0.9rem; line-height: 1.7; }
        .prose-case li::before { content: '—'; position: absolute; left: 0; color: rgba(122,162,255,0.5); }
        .prose-case li.numbered::before { content: counter(item) '.'; counter-increment: item; color: rgba(94,234,212,0.6); }
        .prose-case ul { counter-reset: item; }
        .prose-case strong { color: rgba(255,255,255,0.85); font-weight: 600; }
        .prose-case em    { color: rgba(201,166,255,0.8); font-style: italic; }
        .prose-case code  {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          background: rgba(122,162,255,0.08);
          border: 1px solid rgba(122,162,255,0.15);
          padding: 0.15em 0.45em;
          border-radius: 4px;
          color: rgba(122,162,255,0.9);
        }
      `}</style>
        </main>
    );
}