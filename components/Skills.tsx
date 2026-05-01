'use client'

import { useReveal } from './useReveal'

const categories = [
  {
    label: 'Languages',
    color: 'bg-orange-50 text-orange-800 border-orange-200',
    dot: 'bg-orange-400',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'Bash'],
  },
  {
    label: 'Frontend',
    color: 'bg-blue-50 text-blue-800 border-blue-200',
    dot: 'bg-blue-400',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'HTML/CSS', 'Framer Motion'],
  },
  {
    label: 'Backend',
    color: 'bg-green-50 text-green-800 border-green-200',
    dot: 'bg-green-400',
    skills: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'WebSockets'],
  },
  {
    label: 'Mobile',
    color: 'bg-purple-50 text-purple-800 border-purple-200',
    dot: 'bg-purple-400',
    skills: ['Flutter', 'React Native', 'Dart'],
  },
  {
    label: 'Database',
    color: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    dot: 'bg-yellow-400',
    skills: ['PostgreSQL', 'MongoDB', 'DynamoDB', 'Redis', 'SQLite'],
  },
  {
    label: 'DevOps & Cloud',
    color: 'bg-red-50 text-red-800 border-red-200',
    dot: 'bg-red-400',
    skills: ['Docker', 'AWS', 'Cloudflare', 'GitHub Actions', 'Linux', 'Nginx'],
  },
]

export default function Skills() {
  useReveal()

  return (
    <section id="skills" className="py-28 px-6 md:px-12 bg-card">
      <div className="max-w-6xl mx-auto">
        <p className="reveal text-xs font-medium tracking-[0.2em] uppercase text-accent mb-6">
          Skills
        </p>

        <h2 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl font-bold text-ink leading-tight mb-4">
          The stack.
        </h2>
        <p className="reveal reveal-delay-2 text-muted mb-14 max-w-md">
          Languages, frameworks, and tools I&apos;ve shipped real projects with.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div
              key={cat.label}
              className={`reveal reveal-delay-${(i % 3) + 1} bg-bg border border-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-200 hover:-translate-y-0.5`}
            >
              {/* Category header */}
              <div className="flex items-center gap-2.5 mb-4">
                <span className={`w-2 h-2 rounded-full ${cat.dot}`} />
                <span className="text-xs font-medium tracking-widest uppercase text-muted">
                  {cat.label}
                </span>
              </div>

              {/* Skills pills */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`text-xs px-3 py-1.5 rounded-full border font-medium ${cat.color}`}
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
