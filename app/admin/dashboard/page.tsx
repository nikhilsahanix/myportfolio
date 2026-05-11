// app\admin\dashboard\page.tsx

import { redirect } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import FormMessage from './FormMessage';
import SubmitButton from './SubmitButton';
import DeleteButton from './DeleteButton';
import EditProjectModal from './EditProjectModal';
import FlashMessage from './FlashMessage';

export const dynamic = 'force-dynamic';

// Helper function to set flash message in cookie
async function setFlashMessage(type: 'success' | 'error', message: string) {
  'use server';
  const cookieStore = await cookies();
  cookieStore.set('flash_message', JSON.stringify({ type, message }), {
    maxAge: 10, // Cookie expires in 10 seconds
    path: '/',
    httpOnly: true,
    sameSite: 'lax'
  });
}

// Helper function to get and clear flash message
async function getFlashMessage() {
  const cookieStore = await cookies();
  const flashData = cookieStore.get('flash_message')?.value;
  
  if (flashData) {
    // Clear the cookie immediately after reading
    cookieStore.set('flash_message', '', {
      maxAge: 0,
      path: '/'
    });
    
    try {
      return JSON.parse(flashData);
    } catch {
      return null;
    }
  }
  return null;
}

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const flashMessage = await getFlashMessage();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('Auth error in dashboard:', userError);
    redirect('/admin/login');
  }

  const myEmail = "nikhilsahani7237@gmail.com";
  if (user.email !== myEmail) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-abyss">
        <div className="glass p-8 text-center">
          <h1 className="font-display text-2xl font-bold iridescent-text">Access Denied</h1>
          <p className="mt-2 text-pearl/60">You are not authorized to view this command center.</p>
        </div>
      </div>
    );
  }

  const { data: projectsData, error: projectsError } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (projectsError) {
    console.error('Failed to fetch projects:', projectsError);
  }

  const projectsCount = projectsData?.length || 0;

  // ---------- SERVER ACTIONS ----------

  async function addProject(formData: FormData) {
    'use server';

    console.log('🔵 addProject triggered');

    const actionCookieStore = await cookies();
    const supabaseAction = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) { return actionCookieStore.get(name)?.value; },
        }
      }
    );

    const { data: { user }, error: authError } = await supabaseAction.auth.getUser();
    if (authError || !user) {
      await setFlashMessage('error', 'Authentication failed. Please login again.');
      redirect('/admin/login');
    }

    const rawTechStacks = formData.get('tech_stacks') as string;
    const techStacksArray = rawTechStacks
      ? rawTechStacks.split(',').map(item => item.trim()).filter(Boolean)
      : [];

    const newProject = {
      title: formData.get('title')?.toString().trim() || '',
      slug: formData.get('slug')?.toString().trim() || '',
      live_demo_url: formData.get('live_demo_url')?.toString().trim() || null,
      github_url: formData.get('github_url')?.toString().trim() || null,
      tech_stacks: techStacksArray,
      brief_details: formData.get('brief_details')?.toString().trim() || null,
      problems_faced: formData.get('problems_faced')?.toString().trim() || null,
      vibe_coding_fixes: formData.get('vibe_coding_fixes')?.toString().trim() || null,
    };

    if (!newProject.title || !newProject.slug) {
      await setFlashMessage('error', 'Title and Slug are required.');
      redirect('/admin/dashboard');
    }

    const { error: insertError } = await supabaseAction
      .from('projects')
      .insert([newProject]);

    if (insertError) {
      const userFriendlyMsg = insertError.message.includes('duplicate key')
        ? 'A project with this slug already exists. Please choose a unique slug.'
        : insertError.message;
      await setFlashMessage('error', userFriendlyMsg);
      redirect('/admin/dashboard');
    }

    revalidatePath('/admin/dashboard');
    revalidatePath('/#projects');
    await setFlashMessage('success', `Project "${newProject.title}" created successfully!`);
    redirect('/admin/dashboard');
  }

  async function updateProject(formData: FormData) {
    'use server';

    console.log('🔵 updateProject triggered');

    const actionCookieStore = await cookies();
    const supabaseAction = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) { return actionCookieStore.get(name)?.value; },
        }
      }
    );

    const { data: { user }, error: authError } = await supabaseAction.auth.getUser();
    if (authError || !user) {
      await setFlashMessage('error', 'Authentication failed. Please login again.');
      redirect('/admin/login');
    }

    const id = formData.get('id')?.toString().trim();
    if (!id) {
      await setFlashMessage('error', 'Project ID is missing.');
      redirect('/admin/dashboard');
    }

    const rawTechStacks = formData.get('tech_stacks') as string;
    const techStacksArray = rawTechStacks
      ? rawTechStacks.split(',').map(item => item.trim()).filter(Boolean)
      : [];

    const title = formData.get('title')?.toString().trim() || '';
    const slug = formData.get('slug')?.toString().trim() || '';

    if (!title || !slug) {
      await setFlashMessage('error', 'Title and Slug are required.');
      redirect('/admin/dashboard');
    }

    const updatedFields = {
      title,
      slug,
      live_demo_url: formData.get('live_demo_url')?.toString().trim() || null,
      github_url: formData.get('github_url')?.toString().trim() || null,
      tech_stacks: techStacksArray,
      brief_details: formData.get('brief_details')?.toString().trim() || null,
      problems_faced: formData.get('problems_faced')?.toString().trim() || null,
      vibe_coding_fixes: formData.get('vibe_coding_fixes')?.toString().trim() || null,
    };

    console.log('📦 Updating project:', id, updatedFields);

    const { error: updateError } = await supabaseAction
      .from('projects')
      .update(updatedFields)
      .eq('id', id);

    if (updateError) {
      console.error('❌ Supabase update error:', updateError);
      const userFriendlyMsg = updateError.message.includes('duplicate key')
        ? 'A project with this slug already exists. Please choose a unique slug.'
        : updateError.message;
      await setFlashMessage('error', userFriendlyMsg);
      redirect('/admin/dashboard');
    }

    console.log('✅ Project updated successfully!');
    revalidatePath('/admin/dashboard');
    revalidatePath('/#projects');
    await setFlashMessage('success', `Project "${title}" updated successfully!`);
    redirect('/admin/dashboard');
  }

  async function deleteProject(formData: FormData) {
    'use server';

    console.log('🔵 deleteProject triggered');

    const actionCookieStore = await cookies();
    const supabaseAction = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) { return actionCookieStore.get(name)?.value; },
        }
      }
    );

    const { data: { user }, error: authError } = await supabaseAction.auth.getUser();
    if (authError || !user) {
      await setFlashMessage('error', 'Authentication failed. Please login again.');
      redirect('/admin/login');
    }

    const id = formData.get('id')?.toString().trim();
    if (!id) {
      await setFlashMessage('error', 'Project ID is missing.');
      redirect('/admin/dashboard');
    }

    console.log('🗑️ Deleting project:', id);

    const { error: deleteError } = await supabaseAction
      .from('projects')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('❌ Supabase delete error:', deleteError);
      await setFlashMessage('error', `Failed to delete project: ${deleteError.message}`);
      redirect('/admin/dashboard');
    }

    console.log('✅ Project deleted successfully!');
    revalidatePath('/admin/dashboard');
    revalidatePath('/#projects');
    await setFlashMessage('success', 'Project deleted successfully!');
    redirect('/admin/dashboard');
  }

  return (
    <div className="min-h-screen bg-abyss font-body">
      {/* Navbar */}
      <header className="glass-dock sticky top-0 z-20 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 animate-pulse rounded-full bg-azure"></div>
            <h1 className="font-display text-xl font-bold tracking-tight text-pearl">
              Portfolio <span className="iridescent-text">Command</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <span className="hidden text-sm text-pearl/60 md:inline-block">
              {user.email}
            </span>
            <form action={async () => {
              'use server';
              const actionCookieStore = await cookies();
              const supabaseAuth = createServerClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                {
                  cookies: {
                    get(name: string) { return actionCookieStore.get(name)?.value; },
                    set(name: string, value: string, options: any) {
                      actionCookieStore.set({ name, value, ...options });
                    },
                    remove(name: string, options: any) {
                      actionCookieStore.set({ name, value: '', ...options });
                    }
                  }
                }
              );
              await supabaseAuth.auth.signOut();
              redirect('/admin/login');
            }}>
              <button type="submit" className="text-sm font-medium text-pearl/60 transition-colors hover:text-azure">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6 lg:p-8">
        {/* Flash Message - Client Component for auto-dismiss */}
        <FlashMessage flashMessage={flashMessage} />

        {/* Header Section */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="scroll-rise">
            <h2 className="font-display text-3xl font-bold text-pearl">Welcome back, Nikhil.</h2>
            <p className="mt-1 text-pearl/60">Manage your projects, track your vibes, and update your portfolio.</p>
          </div>
          <a 
            href="/" 
            target="_blank" 
            className="inline-flex items-center justify-center rounded-md bg-pearl px-5 py-2.5 text-sm font-medium text-abyss transition-all hover:-translate-y-0.5 hover:bg-azure hover:text-white hover:shadow-lg hover:shadow-azure/20"
          >
            + View Live Site
          </a>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left column: Add Project Form */}
          <div className="scroll-rise lg:col-span-2">
            <div className="glass p-6 md:p-8">
              <div className="mb-6 border-b border-white/10 pb-4">
                <h3 className="font-display text-xl font-semibold text-pearl">Draft New Project</h3>
                <p className="text-sm text-pearl/60">Add a new case study to your portfolio database.</p>
              </div>

              <form action={addProject} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-azure/80">Project Title *</label>
                    <input 
                      name="title" 
                      type="text" 
                      required 
                      placeholder="e.g. Master Email Validator" 
                      className="w-full rounded-md border border-white/10 bg-abyss/50 px-4 py-2.5 text-sm text-pearl placeholder:text-pearl/30 transition-all focus:border-azure focus:outline-none focus:ring-1 focus:ring-azure/50" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-azure/80">URL Slug *</label>
                    <input 
                      name="slug" 
                      type="text" 
                      required 
                      placeholder="e.g. master-email-validator" 
                      className="w-full rounded-md border border-white/10 bg-abyss/50 px-4 py-2.5 text-sm text-pearl placeholder:text-pearl/30 transition-all focus:border-azure focus:outline-none focus:ring-1 focus:ring-azure/50" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-azure/80">Live Demo URL</label>
                    <input 
                      name="live_demo_url" 
                      type="url" 
                      placeholder="https://" 
                      className="w-full rounded-md border border-white/10 bg-abyss/50 px-4 py-2.5 text-sm text-pearl placeholder:text-pearl/30 transition-all focus:border-azure focus:outline-none focus:ring-1 focus:ring-azure/50" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-azure/80">GitHub Repo URL</label>
                    <input 
                      name="github_url" 
                      type="url" 
                      placeholder="https://github.com/..." 
                      className="w-full rounded-md border border-white/10 bg-abyss/50 px-4 py-2.5 text-sm text-pearl placeholder:text-pearl/30 transition-all focus:border-azure focus:outline-none focus:ring-1 focus:ring-azure/50" 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-azure/80">Tech Stacks (Comma Separated)</label>
                  <input 
                    name="tech_stacks" 
                    type="text" 
                    placeholder="Next.js, TypeScript, Playwright, AWS" 
                    className="w-full rounded-md border border-white/10 bg-abyss/50 px-4 py-2.5 text-sm text-pearl placeholder:text-pearl/30 transition-all focus:border-azure focus:outline-none focus:ring-1 focus:ring-azure/50" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-azure/80">Brief Details *</label>
                  <textarea 
                    name="brief_details" 
                    required 
                    rows={3} 
                    placeholder="A short summary of what this project does..." 
                    className="w-full resize-none rounded-md border border-white/10 bg-abyss/50 px-4 py-2.5 text-sm text-pearl placeholder:text-pearl/30 transition-all focus:border-azure focus:outline-none focus:ring-1 focus:ring-azure/50"
                  ></textarea>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-azure/80">Problems Faced (Markdown)</label>
                  <textarea 
                    name="problems_faced" 
                    rows={4} 
                    placeholder="Describe the roadblocks you hit..." 
                    className="w-full resize-y rounded-md border border-white/10 bg-abyss/50 px-4 py-2.5 font-mono text-sm text-pearl placeholder:text-pearl/30 transition-all focus:border-azure focus:outline-none focus:ring-1 focus:ring-azure/50"
                  ></textarea>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-azure/80">Vibe Coding Fixes (Markdown)</label>
                  <textarea 
                    name="vibe_coding_fixes" 
                    rows={4} 
                    placeholder="How did you use AI and intuition to solve it?..." 
                    className="w-full resize-y rounded-md border border-white/10 bg-abyss/50 px-4 py-2.5 font-mono text-sm text-pearl placeholder:text-pearl/30 transition-all focus:border-azure focus:outline-none focus:ring-1 focus:ring-azure/50"
                  ></textarea>
                </div>

                <div className="flex justify-end border-t border-white/10 pt-6">
                  <SubmitButton />
                </div>
              </form>
            </div>
          </div>

          {/* Right column: Stats & project list */}
          <div className="space-y-8 lg:col-span-1">
            <div className="scroll-rise reveal-delay-1">
              <div className="glass-strong p-6">
                <h3 className="mb-4 font-display text-lg font-medium text-pearl/80">Database Status</h3>
                <div className="flex items-end gap-3">
                  <span className="font-display text-5xl font-bold iridescent-text">{projectsCount}</span>
                  <span className="mb-1 text-sm text-pearl/60">Active Projects</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-pearl/60">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-mint"></div>
                  Connected to Supabase Postgres
                </div>
              </div>
            </div>

            <div className="scroll-rise reveal-delay-2">
              <div className="glass p-6">
                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="font-display text-lg font-semibold text-pearl">Published</h3>
                  <span className="text-xs font-medium text-pearl/60">{projectsCount} total</span>
                </div>

                {projectsCount === 0 ? (
                  <div className="flex h-48 flex-col items-center justify-center text-center">
                    <div className="mb-3 rounded-full bg-white/5 p-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pearl/30">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-pearl">No projects found</p>
                    <p className="mt-1 text-xs text-pearl/40">Draft your first project using the form.</p>
                  </div>
                ) : (
                  <div className="flex max-h-96 flex-col gap-3 overflow-y-auto pr-1">
                    {projectsData?.map((project) => (
                      <div
                        key={project.id}
                        className="group flex items-center justify-between rounded-lg border border-white/10 bg-abyss/30 p-3 transition-all hover:border-azure/40 hover:bg-abyss/50"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-pearl">{project.title}</p>
                          <p className="truncate text-xs text-pearl/40">/{project.slug}</p>
                        </div>
                        {/* Actions */}
                        <div className="ml-3 flex shrink-0 items-center gap-3">
                          <EditProjectModal
                            project={project}
                            updateAction={updateProject}
                          />
                          <span className="text-white/10">|</span>
                          <DeleteButton
                            projectId={project.id}
                            projectTitle={project.title}
                            deleteAction={deleteProject}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}