'use client'

import { useReveal } from './useReveal'

const categories = [
  {
    label: 'Languages',
    color: 'text-orange-300',
    dot: 'bg-orange-400',
    hoverShadow: 'hover:shadow-[0_0_25px_rgba(251,146,60,0.1)]',
    hoverBorder: 'hover:border-orange-500/30',
    pillColor: 'bg-orange-500/10 text-orange-300 border-orange-500/20',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'Bash'],
  },
  {
    label: 'Frontend',
    color: 'text-blue-300',
    dot: 'bg-blue-400',
    hoverShadow: 'hover:shadow-[0_0_25px_rgba(96,165,250,0.1)]',
    hoverBorder: 'hover:border-blue-500/30',
    pillColor: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'HTML/CSS', 'Framer Motion'],
  },
  {
    label: 'Backend',
    color: 'text-emerald-300',
    dot: 'bg-emerald-400',
    hoverShadow: 'hover:shadow-[0_0_25px_rgba(52,211,153,0.1)]',
    hoverBorder: 'hover:border-emerald-500/30',
    pillColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    skills: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'WebSockets'],
  },
  {
    label: 'Mobile',
    color: 'text-violet-300',
    dot: 'bg-violet-400',
    hoverShadow: 'hover:shadow-[0_0_25px_rgba(167,139,250,0.1)]',
    hoverBorder: 'hover:border-violet-500/30',
    pillColor: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    skills: ['Flutter', 'React Native', 'Dart'],
  },
  {
    label: 'Database',
    color: 'text-yellow-300',
    dot: 'bg-yellow-400',
    hoverShadow: 'hover:shadow-[0_0_25px_rgba(234,179,8,0.1)]',
    hoverBorder: 'hover:border-yellow-500/30',
    pillColor: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20',
    skills: ['PostgreSQL', 'MongoDB', 'DynamoDB', 'Redis', 'SQLite'],
  },
  {
    label: 'DevOps & Cloud',
    color: 'text-red-300',
    dot: 'bg-red-400',
    hoverShadow: 'hover:shadow-[0_0_25px_rgba(248,113,113,0.1)]',
    hoverBorder: 'hover:border-red-500/30',
    pillColor: 'bg-red-500/10 text-red-300 border-red-500/20',
    skills: ['Docker', 'AWS', 'Cloudflare', 'GitHub Actions', 'Linux', 'Nginx'],
  },
]

export default function Skills() {
  useReveal()

  return (
    <section id="skills" className="py-28 px-6 md:px-12 bg-bg">
      <div className="max-w-6xl mx-auto">
        <p className="reveal text-xs font-semibold tracking-[0.25em] uppercase text-accent mb-6">
          Skills
        </p>

        <h2 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl font-bold text-ink leading-tight mb-4">
          The stack.
        </h2>
        <p className="reveal reveal-delay-2 text-muted mb-14 max-w-md text-[15px] leading-relaxed">
          Languages, frameworks, and tools I&apos;ve shipped real projects with.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <div
              key={cat.label}
              className={`reveal reveal-delay-${(i % 3) + 1} bg-card border border-border rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 ${cat.hoverShadow} ${cat.hoverBorder}`}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <span className={`w-2 h-2 rounded-full ${cat.dot}`} />
                <span className={`text-xs font-bold tracking-widest uppercase ${cat.color}`}>
                  {cat.label}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`text-xs px-3 py-1.5 rounded-full border font-medium ${cat.pillColor}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
