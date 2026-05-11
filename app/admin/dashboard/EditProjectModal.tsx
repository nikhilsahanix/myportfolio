'use client';

import { useState, useTransition, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  slug: string;
  live_demo_url: string | null;
  github_url: string | null;
  tech_stacks: string[];
  brief_details: string | null;
  problems_faced: string | null;
  vibe_coding_fixes: string | null;
}

interface EditProjectModalProps {
  project: Project;
  updateAction: (formData: FormData) => Promise<void>;
}

export default function EditProjectModal({ project, updateAction }: EditProjectModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Animate panel in/out
  useEffect(() => {
    if (isOpen) {
      // tiny delay so the transition fires after mount
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set('id', project.id);

    startTransition(async () => {
      await updateAction(formData);
      handleClose();
    });
  };

  const inputClass =
    'w-full rounded-md border border-border bg-bg px-4 py-2.5 text-sm text-ink transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent';
  const labelClass = 'text-xs font-bold uppercase tracking-wider text-muted';

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs font-medium text-accent hover:text-ink transition-colors"
      >
        Edit
      </button>

      {/* Slide-over panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            style={{ opacity: isVisible ? 1 : 0 }}
            onClick={handleClose}
          />

          {/* Panel */}
          <div
            className="relative z-10 flex h-full w-full max-w-xl flex-col bg-card shadow-2xl transition-transform duration-300 ease-out"
            style={{ transform: isVisible ? 'translateX(0)' : 'translateX(100%)' }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <h3 className="font-display text-xl font-bold text-ink">Edit Project</h3>
                <p className="text-xs text-muted mt-0.5 truncate max-w-xs">/{project.slug}</p>
              </div>
              <button
                onClick={handleClose}
                className="rounded-lg p-2 text-muted hover:bg-bg hover:text-ink transition-colors"
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Scrollable form */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <form id="edit-project-form" onSubmit={handleSubmit} className="space-y-5">
                {/* Title + Slug */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className={labelClass}>Project Title *</label>
                    <input
                      name="title"
                      type="text"
                      required
                      defaultValue={project.title}
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass}>URL Slug *</label>
                    <input
                      name="slug"
                      type="text"
                      required
                      defaultValue={project.slug}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* URLs */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className={labelClass}>Live Demo URL</label>
                    <input
                      name="live_demo_url"
                      type="url"
                      defaultValue={project.live_demo_url ?? ''}
                      placeholder="https://"
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass}>GitHub Repo URL</label>
                    <input
                      name="github_url"
                      type="url"
                      defaultValue={project.github_url ?? ''}
                      placeholder="https://github.com/..."
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Tech stacks */}
                <div className="space-y-1.5">
                  <label className={labelClass}>Tech Stacks (Comma Separated)</label>
                  <input
                    name="tech_stacks"
                    type="text"
                    defaultValue={project.tech_stacks?.join(', ') ?? ''}
                    placeholder="Next.js, TypeScript, Supabase"
                    className={inputClass}
                  />
                </div>

                {/* Brief details */}
                <div className="space-y-1.5">
                  <label className={labelClass}>Brief Details *</label>
                  <textarea
                    name="brief_details"
                    required
                    rows={3}
                    defaultValue={project.brief_details ?? ''}
                    placeholder="A short summary of what this project does..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Problems faced */}
                <div className="space-y-1.5">
                  <label className={labelClass}>Problems Faced (Markdown)</label>
                  <textarea
                    name="problems_faced"
                    rows={4}
                    defaultValue={project.problems_faced ?? ''}
                    placeholder="Describe the roadblocks you hit..."
                    className={`${inputClass} resize-y font-mono`}
                  />
                </div>

                {/* Vibe coding fixes */}
                <div className="space-y-1.5">
                  <label className={labelClass}>Vibe Coding Fixes (Markdown)</label>
                  <textarea
                    name="vibe_coding_fixes"
                    rows={4}
                    defaultValue={project.vibe_coding_fixes ?? ''}
                    placeholder="How did you use AI and intuition to solve it?..."
                    className={`${inputClass} resize-y font-mono`}
                  />
                </div>
              </form>
            </div>

            {/* Sticky footer */}
            <div className="flex items-center justify-end gap-3 border-t border-border bg-card px-6 py-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={isPending}
                className="rounded-md border border-border bg-bg px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-border disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="edit-project-form"
                disabled={isPending}
                className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-all hover:-translate-y-0.5 hover:shadow-md disabled:opacity-70 disabled:translate-y-0"
              >
                {isPending ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving…
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}