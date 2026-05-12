'use client'

import { motion, Variants } from 'framer-motion'
/* ── Stagger orchestrator ── */
const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
}

/* ── Clip-reveal: text sweeps in from bottom like a printing press ── */
const clipReveal: Variants = {
  hidden: {
    clipPath: 'inset(100% 0 0 0)',
    y: 40,
    opacity: 0,
  },
  show: {
    clipPath: 'inset(0% 0 0 0)',
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/* ── Hard-cut fade (brutalist: no easing) ── */
const hardFade: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.01,   // near-instant snap
      ease: 'linear',
    },
  },
}

/* ── Line draw (the horizontal rules) ── */
const lineGrow: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  show: {
    scaleX: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center 2xl:items-end pt-24 2xl:pt-0"
      style={{
        background: '#0A0A0A',
        paddingLeft: 'clamp(1rem, 5vw, 4rem)',
        paddingRight: 'clamp(1rem, 5vw, 4rem)',
        paddingBottom: 'clamp(3rem, 8vh, 6rem)',
      }}
    >
      {/* ── Structural grid lines (visible scaffolding) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(176,176,176,0.04) 1px, transparent 1px),
            linear-gradient(rgba(176,176,176,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* ── Left gutter rule (editorial column marker) ── */}
      <div
        className="absolute top-0 bottom-0 hidden lg:block pointer-events-none"
        style={{
          left: 'clamp(1.5rem, 5vw, 4rem)',
          width: '2px',
          background: '#1A1A1A',
        }}
      />

      {/* ── Issue number / editorial meta (top-left corner) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.01 }}
        className="absolute top-8 hidden md:block"
        style={{
          left: 'calc(clamp(1.5rem, 5vw, 4rem) + 20px)',
          fontFamily: "'Space Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.2em',
          color: '#6B6B6B',
          textTransform: 'uppercase',
          writingMode: 'vertical-rl',
        }}
      >
        Portfolio / 2026
      </motion.div>

      {/* ── Top-right coordinates (editorial detail) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.01 }}
        className="absolute top-8 right-4 sm:right-6 md:right-8 hidden md:block"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.15em',
          color: '#6B6B6B',
          textTransform: 'uppercase',
          textAlign: 'right',
        }}
      >
        <span style={{ color: '#006D4E' }}>●</span> Available for work
        <br />
        <span style={{ color: '#B0B0B0', opacity: 0.4 }}>19.0760° N, 72.8777° E</span>
      </motion.div>

      {/* ── Main content ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative w-full max-w-[1400px]"
        style={{ marginLeft: 'clamp(0px, 3vw, 48px)' }}
      >
        {/* ── Role line ── */}
        <motion.div variants={hardFade} className="mb-6 flex items-center gap-4">
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#006D4E',
              fontWeight: 700,
            }}
          >
            Full-Stack Developer
          </span>
          <motion.div
            variants={lineGrow}
            style={{
              height: '2px',
              background: '#006D4E',
              flex: 1,
              maxWidth: '120px',
            }}
          />
        </motion.div>

        {/* ── Name: oversized, brutal ── */}
        <div className="overflow-hidden">
          <motion.h1
            variants={clipReveal}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              fontSize: 'clamp(3.5rem, 13vw, 11rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.04em',
              color: '#B0B0B0',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            Nikhil
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.h1
            variants={clipReveal}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              fontSize: 'clamp(3.5rem, 13vw, 11rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.04em',
              color: '#B0B0B0',
              textTransform: 'uppercase',
              margin: 0,
              marginTop: 'clamp(0.25rem, 1vw, 0.75rem)',
            }}
          >
            Sahani
            <span style={{ color: '#006D4E' }}>.</span>
          </motion.h1>
        </div>

        {/* ── Horizontal rule (structural) ── */}
        <motion.div
          variants={lineGrow}
          style={{
            height: '3px',
            background: '#1A1A1A',
            marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}
        />

        {/* ── Tagline + CTA row (editorial split layout) ── */}
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          {/* Left: description */}
          <motion.div variants={hardFade} className="max-w-lg">
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 'clamp(0.875rem, 1.2vw, 1.05rem)',
                lineHeight: 1.75,
                color: '#6B6B6B',
                margin: 0,
              }}
            >
              I build things for the web —
              across JS/TS, Python, Go, React, Next.js,
              Flutter, DevOps, and whatever the
              problem calls for.
            </p>
          </motion.div>

          {/* Right: CTAs (brutalist buttons) */}
          <motion.div
            variants={hardFade}
            className="flex flex-wrap gap-4 items-center"
          >
            <a
              href="#projects"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#0A0A0A',
                background: '#006D4E',
                padding: '14px 26px',
                border: '2px solid #006D4E',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-block',
                minHeight: '44px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#006D4E'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#006D4E'
                e.currentTarget.style.color = '#0A0A0A'
              }}
            >
              View Projects →
            </a>
            <a
              href="#contact"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#B0B0B0',
                background: 'transparent',
                padding: '14px 26px',
                border: '2px solid #1A1A1A',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-block',
                minHeight: '44px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#006D4E'
                e.currentTarget.style.color = '#006D4E'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1A1A1A'
                e.currentTarget.style.color = '#B0B0B0'
              }}
            >
              Get in touch
            </a>
          </motion.div>
        </div>

        {/* ── Bottom metadata strip ── */}
        <motion.div
          variants={hardFade}
          className="flex flex-wrap gap-x-10 gap-y-2 mt-12"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(176,176,176,0.3)',
          }}
        >
          <span>React</span>
          <span>Next.js</span>
          <span>TypeScript</span>
          <span>Go</span>
          <span>Python</span>
          <span>Flutter</span>
          <span>DevOps</span>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator (vertical text, brutalist) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.01 }}
        className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-3"
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#6B6B6B',
            writingMode: 'vertical-rl',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '2px',
            height: '48px',
            background: '#006D4E',
          }}
        />
      </motion.div>
    </section>
  )
}
