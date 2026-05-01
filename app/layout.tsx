import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nikhil Sahani — Developer',
  description:
    'Vibe coder building things for the web across every stack — JS/TS, Python, Go, React, Next.js, Flutter, and more.',
  metadataBase: new URL('https://nikhilsahani.in'),
  openGraph: {
    title: 'Nikhil Sahani — Developer',
    description: 'I build things for the web.',
    url: 'https://nikhilsahani.in',
    siteName: 'Nikhil Sahani',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nikhil Sahani — Developer',
    description: 'I build things for the web.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${dmSans.variable} font-body bg-bg text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
