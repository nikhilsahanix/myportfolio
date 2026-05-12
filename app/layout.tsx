// app\layout.tsx

import type { Metadata } from 'next'
import { Space_Mono, Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

/* ── Brutalist primary font ── */
const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-brutalist',
  display: 'swap',
  weight: ['400', '700'],
})

/* ── Legacy fonts (kept for non-hero sections until full redesign) ── */
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Nikhil Sahani — Developer',
  description:
    'Multi-stack developer building considered, fast, and quietly luxurious software for the web.',
  metadataBase: new URL('https://nikhilsahani.in'),
  openGraph: {
    title: 'Nikhil Sahani — Developer',
    description: 'Considered software, built across the stack.',
    url: 'https://nikhilsahani.in',
    siteName: 'Nikhil Sahani',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nikhil Sahani — Developer',
    description: 'Considered software, built across the stack.',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceMono.variable} ${geist.variable} ${geistMono.variable} antialiased`}
        style={{
          background: '#0A0A0A',
          color: '#B0B0B0',
          fontFamily: "'Space Mono', monospace",
        }}
      >
        {children}
      </body>
    </html>
  )
}
