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
      // ✏️ Replace this URL with your actual API route or form backend
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

  return (
    <section id="contact" className="py-28 px-6 md:px-12 bg-card">
      <div className="max-w-6xl mx-auto">
        <p className="reveal text-xs font-medium tracking-[0.2em] uppercase text-accent mb-6">
          Contact
        </p>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <h2 className="reveal reveal-delay-1 font-display text-4xl md:text-5xl font-bold text-ink leading-tight mb-6">
              Let&apos;s work together.
            </h2>
            <p className="reveal reveal-delay-2 text-muted leading-relaxed mb-8 max-w-sm">
              Have a project in mind, a role to fill, or just want to say hi?
              Drop me a message — I usually reply within 24 hours.
            </p>

            {/* Direct email */}
            <div className="reveal reveal-delay-3">
              <p className="text-xs uppercase tracking-widest text-muted mb-2">Email me directly</p>
              <a
                href="mailto:hello@nikhilsahani.in"
                className="font-display text-xl font-bold text-ink hover:text-accent transition-colors"
              >
                hello@nikhilsahani.in
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <form
            onSubmit={handleSubmit}
            className="reveal reveal-delay-2 flex flex-col gap-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-medium text-muted uppercase tracking-widest">
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
                  className="bg-bg border border-border rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-medium text-muted uppercase tracking-widest">
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
                  className="bg-bg border border-border rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs font-medium text-muted uppercase tracking-widest">
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
                className="bg-bg border border-border rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              className="bg-ink text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-accent transition-colors duration-200 disabled:opacity-50 self-start"
            >
              {status === 'idle' && 'Send Message →'}
              {status === 'sending' && 'Sending...'}
              {status === 'sent' && 'Message sent ✓'}
              {status === 'error' && 'Error — try again'}
            </button>

            {status === 'error' && (
              <p className="text-xs text-red-500">
                Something went wrong. Email me directly at hello@nikhilsahani.in
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
