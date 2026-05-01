'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Trigger reveal on mount
    const els = sectionRef.current?.querySelectorAll('.reveal')
    setTimeout(() => {
      els?.forEach((el) => el.classList.add('visible'))
    }, 100)
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-16 px-6 md:px-12 overflow-hidden"
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />

      {/* Decorative red circle */}
      <div className="absolute top-24 right-12 w-72 h-72 rounded-full border border-accent/20 pointer-events-none hidden lg:block" />
      <div className="absolute top-32 right-20 w-48 h-48 rounded-full border border-accent/10 pointer-events-none hidden lg:block" />

      <div className="relative max-w-6xl w-full mx-auto py-24 md:py-0">
        {/* Available badge */}
        <div className="reveal reveal-delay-1 mb-8 inline-flex">
          <span className="inline-flex items-center gap-2.5 text-sm text-muted border border-border bg-card/80 rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for work
          </span>
        </div>

        {/* Name */}
        <h1 className="reveal reveal-delay-2 font-display font-bold leading-[0.88] tracking-tight text-ink mb-8"
          style={{ fontSize: 'clamp(4.5rem, 13vw, 10rem)' }}
        >
          Nikhil
          <br />
          <span className="text-accent">Sahani</span>
          <span className="text-accent">.</span>
        </h1>

        {/* Tagline */}
        <p className="reveal reveal-delay-3 text-xl md:text-2xl text-muted font-body max-w-lg mb-4 leading-relaxed">
          I build things for the web.
        </p>

        {/* Sub-tagline */}
        <p className="reveal reveal-delay-4 text-base text-muted/70 font-body max-w-md mb-10 leading-relaxed">
          Vibe coder working across JS/TS, Python, Go, React, Next.js,
          Flutter, DevOps — and whatever the problem calls for.
        </p>

        {/* CTAs */}
        <div className="reveal reveal-delay-5 flex flex-wrap gap-4 items-center">
          <a
            href="#projects"
            className="bg-ink text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-accent transition-colors duration-200"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="border border-ink text-ink px-8 py-3.5 rounded-full text-sm font-medium hover:border-accent hover:text-accent transition-colors duration-200"
          >
            Get in touch
          </a>
          <a
            href="https://github.com/nikhilsahani"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-ink transition-colors duration-200 flex items-center gap-1.5"
          >
            GitHub ↗
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted/40">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-muted/40 to-transparent" />
      </div>
    </section>
  )
}
