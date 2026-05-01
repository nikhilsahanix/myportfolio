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
    <section id="about" className="py-28 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <p className="reveal text-xs font-medium tracking-[0.2em] uppercase text-accent mb-6">
          About
        </p>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: bio */}
          <div>
            <h2 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl font-bold text-ink leading-tight mb-8">
              A developer who thrives across every stack.
            </h2>

            <div className="reveal reveal-delay-2 space-y-4 text-muted leading-relaxed">
              <p>
                I&apos;m Nikhil Sahani — a full-stack developer with an itch to
                explore. I don&apos;t stick to one language or framework. If a
                problem needs Rust, I write Rust. If it needs Flutter, I build
                in Flutter. I call it <em className="text-ink not-italic font-medium">vibe coding</em>.
              </p>
              <p>
                I&apos;ve worked across the entire spectrum: web frontends in React
                and Next.js, backends in Node.js, Go, and Python, mobile apps
                with Flutter, and infrastructure with Docker and cloud
                platforms.
              </p>
              <p>
                Based in India. Building on the internet.
              </p>
            </div>

            {/* Social links */}
            <div className="reveal reveal-delay-3 flex gap-6 mt-8">
              {[
                { label: 'GitHub', href: 'https://github.com/nikhilsahani' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/nikhilsahani' },
                { label: 'Twitter', href: 'https://twitter.com/nikhilsahani' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted hover:text-accent transition-colors duration-200"
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
                className="bg-card border border-border rounded-2xl p-6 flex items-center justify-between group hover:border-accent/40 transition-colors duration-200"
              >
                <span className="text-muted text-sm">{stat.label}</span>
                <span className="font-display text-3xl font-bold text-ink group-hover:text-accent transition-colors duration-200">
                  {stat.value}
                </span>
              </div>
            ))}

            {/* Location card */}
            <div className="bg-ink text-white rounded-2xl p-6">
              <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Currently</p>
              <p className="font-display text-xl font-bold">Chandigarh, India</p>
              <p className="text-white/50 text-sm mt-1">Open to remote work worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
