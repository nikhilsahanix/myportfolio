'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, Variants } from 'framer-motion'

/* ══════════════════════════════════════
   Minimal Brutalist Resume Component
   Dark theme on-screen · Clean PDF output
   ══════════════════════════════════════ */

/* ── Animation variants ── */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

const lineGrow: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  show: { scaleX: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

/* ── Resume Data ── */
const contact = {
  email: 'contact@nikhilsahani.in',
  phone: '+91 95602 09329',
  site: 'nikhilsahani.in',
  linkedin: 'nikhilsahanividev',
  github: 'nikhilsahanix',
}

const skills = [
  { label: 'Languages', value: 'JavaScript, TypeScript, Python' },
  { label: 'Frontend', value: 'React 19, Next.js 16, Tailwind v4, Framer Motion, Radix UI, Zustand, Zod' },
  { label: 'Backend', value: 'Node.js, Fastify, BullMQ, Redis, Prisma, Mongoose' },
  { label: 'Databases', value: 'PostgreSQL, MongoDB, DynamoDB, AWS RDS' },
  { label: 'Cloud', value: 'AWS EC2, S3, RDS, API Gateway, DynamoDB, IAM, Vercel' },
  { label: 'Auth & Pay', value: 'NextAuth v4, JWT, OAuth 2.0, Stripe, Webhooks' },
  { label: 'AI & APIs', value: 'Claude SDK, Gemini AI, Google Drive API, Resend' },
  { label: 'Tools', value: 'Git, GitHub, Vitest, pino, ESLint' },
]

const projects = [
  {
    name: 'ContractIQ',
    tag: 'SaaS · AI · Legal-Tech',
    tagline: 'AI-Powered Legal Contract Review Platform',
    stack: 'Next.js 16, TypeScript, Fastify 4, Prisma, PostgreSQL, BullMQ, Redis, AWS EC2/RDS/S3/API Gateway, Stripe, Claude SDK, Google GenAI, Zod, Zustand',
    bullets: [
      'Built a multi-tenant SaaS that ingests PDFs/DOCX contracts (~200 pages), auto-classifies type via AI, and delivers risk scores, clause flags, and negotiation priorities in ~60 seconds.',
      'Engineered an async background job pipeline with BullMQ + Redis; deployed on AWS EC2 with RDS (PostgreSQL) and S3 presigned URLs for secure document storage and retrieval.',
      'Integrated Stripe billing with four subscription tiers (Solo → Enterprise), usage-quota enforcement, HMAC-signed webhooks, and full audit logging for compliance-grade operations.',
      'Exposed a developer REST API with API key auth, rate limiting, and webhook events — enabling legal-tech platforms to embed contract intelligence programmatically.',
    ],
  },
  {
    name: 'PaperMode',
    tag: 'Productivity · AI · Students',
    tagline: 'AI-Powered Study Planner — Honest Calendar for Students',
    stack: 'Next.js 16, React 19, Tailwind CSS v4, Framer Motion, Radix UI, MongoDB, Mongoose, NextAuth v4, Google Drive API, Gemini AI',
    bullets: [
      'Designed an "honest calendar" that tracks planned vs. actual study sessions, exposing real productivity gaps; integrated Google Gemini for adaptive AI-powered scheduling suggestions.',
      'Implemented Google OAuth via NextAuth v4 (JWT sessions + onboarding gate) with Google Drive sync for seamless cross-device persistence and a polished Framer Motion UI.',
    ],
  },
]

const introText = `Self-driven full-stack developer and relentless builder currently in my second year of BCA at Chitkara University. I don't wait to learn — I ship. From AI-powered SaaS platforms to intelligent productivity tools, I build products end-to-end: database design, backend architecture, cloud infrastructure, and polished frontend UI. My natural habitat is the JavaScript ecosystem — Next.js, React, Node.js, TypeScript — but I adapt fast and pick up new stacks as the problem demands. I've integrated LLMs (Claude, Gemini), wired up real-time job queues, built multi-tenant billing with Stripe, and deployed production workloads on AWS (EC2, RDS, S3, API Gateway). I think in systems, write clean APIs, and care deeply about the user experience on both sides of the stack.`

/* ── SVG Icons ── */
const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const ArrowLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

const SpinnerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="resume-spinner">
    <circle cx="12" cy="12" r="10" opacity="0.25" />
    <path d="M12 2a10 10 0 0 1 10 10" />
  </svg>
)

const MailIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const PhoneIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const GlobeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const GitHubIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)

export default function Resume() {
  const resumeRef = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)

  const handleDownloadPDF = useCallback(async () => {
    if (!resumeRef.current || downloading) return
    setDownloading(true)

    try {
      const html2canvas = (await import('html2canvas-pro')).default
      const { jsPDF } = await import('jspdf')

      const element = resumeRef.current

      // Render at 2x for crisp PDF
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#0A0A0A',
        width: element.scrollWidth,
        height: element.scrollHeight,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save('Nikhil_Sahani_Resume.pdf')
    } catch (err) {
      console.error('PDF generation failed:', err)
    } finally {
      setDownloading(false)
    }
  }, [downloading])

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="resume-wrapper"
    >
      {/* ── Action bar ── */}
      <motion.div variants={fadeUp} className="resume-actions">
        <a href="/" className="resume-back-btn">
          <ArrowLeftIcon />
          Back
        </a>
        <button
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="resume-download-btn"
        >
          {downloading ? (
            <>
              <SpinnerIcon />
              Generating…
            </>
          ) : (
            <>
              <DownloadIcon />
              Download PDF
            </>
          )}
        </button>
      </motion.div>

      {/* ── Resume Document ── */}
      <motion.div variants={fadeUp} className="resume-document" ref={resumeRef}>

        {/* ── HEADER ── */}
        <header className="resume-header">
          <div className="resume-header-left">
            <div className="resume-availability">
              <span className="resume-dot" />
              <span>Available for work</span>
            </div>
            <h1 className="resume-title">Nikhil Sahani<span className="resume-accent">.</span></h1>
            <p className="resume-subtitle">Full-Stack Developer</p>
            <p className="resume-education">BCA · Chitkara University · 2023–2026</p>
          </div>

          <div className="resume-header-right">
            <a href={`mailto:${contact.email}`} className="resume-contact-link">
              <MailIcon />
              <span>{contact.email}</span>
            </a>
            <div className="resume-contact-link">
              <PhoneIcon />
              <span>{contact.phone}</span>
            </div>
            <a href={`https://${contact.site}`} target="_blank" rel="noopener noreferrer" className="resume-contact-link">
              <GlobeIcon />
              <span>{contact.site}</span>
            </a>
            <a href={`https://linkedin.com/in/${contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="resume-contact-link">
              <LinkedInIcon />
              <span>{contact.linkedin}</span>
            </a>
            <a href={`https://github.com/${contact.github}`} target="_blank" rel="noopener noreferrer" className="resume-contact-link">
              <GitHubIcon />
              <span>{contact.github}</span>
            </a>
          </div>
        </header>

        <motion.div variants={lineGrow} className="resume-divider" />

        {/* ── INTRODUCTION ── */}
        <section className="resume-section">
          <h2 className="resume-section-title">Introduction</h2>
          <p className="resume-body">{introText}</p>
        </section>

        <div className="resume-divider resume-divider-thin" />

        {/* ── SKILLS ── */}
        <section className="resume-section">
          <h2 className="resume-section-title">Technical Skills</h2>
          <div className="resume-skills-grid">
            {skills.map((s, i) => (
              <div key={i} className="resume-skill-row">
                <span className="resume-skill-label">{s.label}</span>
                <span className="resume-skill-value">{s.value}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="resume-divider resume-divider-thin" />

        {/* ── PROJECTS ── */}
        <section className="resume-section">
          <h2 className="resume-section-title">Projects</h2>
          {projects.map((p, i) => (
            <div key={i} className="resume-project">
              <div className="resume-project-top">
                <h3 className="resume-project-name">{p.name}</h3>
                <span className="resume-project-tag">{p.tag}</span>
              </div>
              <p className="resume-project-tagline">{p.tagline}</p>
              <p className="resume-project-stack"><span>Stack:</span> {p.stack}</p>
              <ul className="resume-project-bullets">
                {p.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* ── FOOTER ── */}
        <footer className="resume-doc-footer">
          <span>nikhilsahani.in</span>
          <span>github.com/nikhilsahanix</span>
        </footer>
      </motion.div>
    </motion.div>
  )
}
