export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border px-6 md:px-12 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
        <p>
          &copy; {year}{' '}
          <span className="text-ink font-medium">Nikhil Sahani</span>
          <span className="text-accent">.</span>
        </p>

        <div className="flex gap-6">
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
              className="hover:text-accent transition-colors duration-200"
            >
              {s.label}
            </a>
          ))}
        </div>

        <p className="text-xs text-muted/50">
          Built with Next.js · Hosted on Cloudflare Pages
        </p>
      </div>
    </footer>
  )
}
