export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 px-4 sm:px-6 md:px-12 py-8 bg-bg">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-muted text-center lg:text-left">
        <p>
          &copy; {year}{' '}
          <span className="text-ink font-semibold">Nikhil Sahani</span>
          <span className="text-accent">.</span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
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
              className="min-h-11 inline-flex items-center px-2 hover:text-accent transition-colors duration-200 font-medium"
            >
              {s.label}
            </a>
          ))}
        </div>

        <p className="text-xs text-muted/40">
          Built with Next.js · Hosted on Cloudflare
        </p>
      </div>
    </footer>
  )
}
