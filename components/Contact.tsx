'use client'

import { useState } from 'react'
import { useReveal } from './useReveal'

export default function Contact() {
  useReveal()

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'bg-card border border-border rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted/30 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all duration-200 min-h-11'

  return (
    <section id="contact" className="py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-bg">
      <div className="max-w-6xl mx-auto">
        <p className="reveal text-xs font-semibold tracking-[0.25em] uppercase text-accent mb-6">
          Contact
        </p>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left */}
          <div>
            <h2 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl font-bold text-ink leading-tight mb-6">
              Let&apos;s work{' '}
              <span className="gradient-text">together.</span>
            </h2>
            <p className="reveal reveal-delay-2 text-muted leading-relaxed mb-8 max-w-sm text-[15px]">
              Have a project in mind, a role to fill, or just want to say hi?
              Drop me a message — I usually reply within 24 hours.
            </p>

            <div className="reveal reveal-delay-3 space-y-1 mb-8">
              <p className="text-xs uppercase tracking-widest text-muted/50 font-bold">Direct email</p>
              <a
                href="mailto:contact@nikhilsahani.in"
                className="font-display text-lg sm:text-xl font-bold text-ink hover:text-accent transition-colors duration-200 break-all"
              >
                contact@nikhilsahani.in
              </a>
            </div>

            <div className="reveal reveal-delay-4 flex flex-wrap gap-3 sm:gap-4">
              {[
                { label: 'WhatsApp', href: 'https://wa.me/919560209329' },
                { label: 'GitHub', href: 'https://github.com/nikhilsahanix' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nikhilsahanivibedev' },
                { label: 'X', href: 'https://x.com/nikhilvibedev' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center min-h-11 px-4 rounded-full border border-border text-sm text-muted hover:text-accent hover:border-accent/40 transition-colors duration-200 font-medium"
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="reveal reveal-delay-2 flex flex-col gap-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-bold text-muted/60 uppercase tracking-widest">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-bold text-muted/60 uppercase tracking-widest">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs font-bold text-muted/60 uppercase tracking-widest">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                className={`${inputClass} resize-none min-h-32`}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              className="self-start inline-flex items-center justify-center min-h-11 bg-accent text-white px-6 sm:px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-accent/90 transition-all duration-300 shadow-[0_0_25px_rgba(124,92,252,0.35)] hover:shadow-[0_0_40px_rgba(124,92,252,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'idle' && 'Send Message →'}
              {status === 'sending' && 'Sending...'}
              {status === 'sent' && 'Sent successfully ✓'}
              {status === 'error' && 'Error — try again'}
            </button>

            {status === 'error' && (
              <p className="text-xs text-red-400/80">
                Something went wrong. Email me directly at contact@nikhilsahani.in
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
