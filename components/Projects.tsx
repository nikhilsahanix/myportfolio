'use client'

import { useReveal } from './useReveal'

// ✏️ EDIT THIS ARRAY to add/update your projects
const projects = [
  {
    number: '01',
    title: 'Project Name Here',
    description:
      'A short description of what the project does, the problem it solves, and who it is for. Keep it to 2–3 lines.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    live: 'https://example.com',
    github: 'https://github.com/nikhilsahani/project',
    highlight: true,
  },
  {
    number: '02',
    title: 'Another Project',
    description:
      'Describe the project here. Mention the tech stack you used and any interesting challenges you solved.',
    tags: ['Go', 'Docker', 'AWS'],
    live: 'https://example.com',
    github: 'https://github.com/nikhilsahani/project2',
    highlight: false,
  },
  {
    number: '03',
    title: 'Mobile App / Other',
    description:
      'A mobile or non-web project. Flutter app, CLI tool, browser extension — anything you have built.',
    tags: ['Flutter', 'Dart', 'Firebase'],
    live: '',
    github: 'https://github.com/nikhilsahani/project3',
    highlight: false,
  },
]

export default function Projects() {
  useReveal()

  return (
    <section id="projects" className="py-28 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <p className="reveal text-xs font-medium tracking-[0.2em] uppercase text-accent mb-6">
          Projects
        </p>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <h2 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl font-bold text-ink leading-tight">
            Things I&apos;ve built.
          </h2>
          <a
            href="https://github.com/nikhilsahani"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal reveal-delay-2 text-sm text-muted hover:text-accent transition-colors shrink-0"
          >
            All on GitHub ↗
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <article
              key={p.number}
              className={`reveal reveal-delay-${i + 1} group relative bg-card border rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-all duration-200 ${
                p.highlight
                  ? 'border-accent/30 md:col-span-2 lg:col-span-1'
                  : 'border-border hover:border-accent/20'
              }`}
            >
              {/* Number */}
              <span className="font-display text-6xl font-bold text-border group-hover:text-accent/20 transition-colors duration-200 absolute top-4 right-6 leading-none select-none">
                {p.number}
              </span>

              <div className="relative z-10">
                <h3 className="font-display text-xl font-bold text-ink mb-3 group-hover:text-accent transition-colors duration-200">
                  {p.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-5">
                  {p.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 bg-bg border border-border rounded-full text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-4 relative z-10">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-muted hover:text-ink transition-colors"
                  >
                    GitHub ↗
                  </a>
                )}
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-accent hover:text-ink transition-colors"
                  >
                    Live Demo ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
