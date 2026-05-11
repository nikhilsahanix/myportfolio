'use client'

import { useReveal } from './useReveal'

const stats = [
  { value: '10+', label: 'Languages & frameworks' },
  { value: '∞', label: 'Stacks explored' },
  { value: '100%', label: 'Vibe-driven development' },
]

export default function About() {
  useReveal()

  return (
    <section id="about" className="py-28 px-6 md:px-12 bg-surface">
      <div className="max-w-6xl mx-auto">
        <p className="reveal text-xs font-semibold tracking-[0.25em] uppercase text-accent mb-6">
          About
        </p>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: bio */}
          <div>
            <h2 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl font-bold text-ink leading-tight mb-8">
              A developer who thrives{' '}
              <span className="gradient-text">across every stack.</span>
            </h2>

            <div className="reveal reveal-delay-2 space-y-4 text-muted leading-relaxed text-[15px]">
              <p>
                I&apos;m Nikhil Sahani — a full-stack developer with an itch to
                explore. I don&apos;t stick to one language or framework. If a
                problem needs Rust, I write Rust. If it needs Flutter, I build
                in Flutter. I call it{' '}
                <em className="text-ink not-italic font-semibold">vibe coding</em>.
              </p>
              <p>
                I&apos;ve worked across the entire spectrum: web frontends in React
                and Next.js, backends in Node.js, Go, and Python, mobile apps
                with Flutter, and infrastructure with Docker and cloud platforms.
              </p>
              <p>Based in India. Building on the internet.</p>
            </div>

            <div className="reveal reveal-delay-3 flex gap-6 mt-8">
              {[
                { label: 'GitHub', href: 'https://github.com/nikhilsahanix' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nikhilsahanivibedev' },
                { label: 'X', href: 'https://x.com/nikhilvibedev' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted hover:text-accent transition-colors duration-200 font-medium"
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Right: stats */}
          <div className="reveal reveal-delay-2 grid grid-cols-1 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group bg-card border border-border rounded-2xl p-6 flex items-center justify-between hover:border-accent/30 hover:shadow-[0_0_25px_rgba(124,92,252,0.1)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="text-muted text-sm font-medium">{stat.label}</span>
                <span className="font-display text-3xl font-bold text-ink group-hover:text-accent transition-colors duration-300">
                  {stat.value}
                </span>
              </div>
            ))}

            {/* Location card */}
            <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent pointer-events-none" />
              <p className="relative text-accent/60 text-xs uppercase tracking-widest mb-2 font-bold">Currently</p>
              <p className="relative font-display text-xl font-bold text-ink">Chandigarh, India</p>
              <p className="relative text-muted text-sm mt-1">Open to remote work worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
