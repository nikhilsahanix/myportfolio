'use client'

import { useState, useEffect } from 'react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'nav-blur bg-bg/80 border-b border-border/50'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-display text-xl font-bold text-ink hover:text-accent transition-colors duration-300"
        >
          NS<span className="text-accent">.</span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-ink transition-colors duration-200 font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/resume"
            className="text-sm font-semibold px-5 py-2 rounded-full border border-accent/40 text-accent hover:bg-accent hover:text-white hover:border-accent transition-all duration-300"
          >
            Resume
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex min-h-11 min-w-11 items-center justify-center flex-col gap-1.5 p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-ink transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
          />
          <span
            className={`block w-5 h-0.5 bg-ink transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
          />
          <span
            className={`block w-5 h-0.5 bg-ink transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96' : 'max-h-0'
          } nav-blur bg-bg/95 border-b border-border/50`}
      >
        <nav className="flex flex-col px-4 sm:px-6 py-5 gap-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium text-muted hover:text-ink transition-colors min-h-11 inline-flex items-center"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/resume"
            className="text-base font-semibold text-accent mt-1 min-h-11 inline-flex items-center"
          >
            Resume →
          </a>
        </nav>
      </div>
    </header>
  )
}
