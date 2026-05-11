import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg: '#0B0F1A',
        abyss: '#0B0F1A',
        surface: '#0E1426',
        slate: '#11172A',
        card: '#141B30',
        pane: '#171E36',
        border: 'rgba(255,255,255,0.08)',
        rule: 'rgba(255,255,255,0.06)',
        ink: '#E6ECF7',
        pearl: '#E6ECF7',
        muted: '#8A92A8',
        dim: '#5C6480',
        accent: '#7AA2FF',
        azure: '#7AA2FF',
        amethyst: '#C9A6FF',
        mint: '#5EEAD4',
        glow: '#5EEAD4',
      },
      backgroundImage: {
        'iridescent': 'linear-gradient(115deg, #7AA2FF 0%, #C9A6FF 45%, #5EEAD4 100%)',
        'iridescent-soft': 'linear-gradient(135deg, rgba(122,162,255,0.18), rgba(201,166,255,0.14), rgba(94,234,212,0.12))',
        'glass': 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        'starfield': 'radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.4), transparent), radial-gradient(1px 1px at 70% 70%, rgba(255,255,255,0.25), transparent), radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.3), transparent)',
      },
      boxShadow: {
        'glass': 'inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 80px -30px rgba(0,0,0,0.6)',
        'glow-azure': '0 0 60px -10px rgba(122,162,255,0.45)',
        'glow-amethyst': '0 0 60px -10px rgba(201,166,255,0.45)',
        'glow-mint': '0 0 50px -10px rgba(94,234,212,0.4)',
        'pillar': '0 50px 120px -40px rgba(122,162,255,0.35)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'drift': 'drift 18s ease-in-out infinite',
        'drift-slow': 'driftSlow 26s ease-in-out infinite',
        'orbit-1': 'orbit 28s linear infinite',
        'orbit-2': 'orbit 42s linear infinite reverse',
        'orbit-3': 'orbit 60s linear infinite',
        'shimmer': 'shimmer 8s linear infinite',
        'iridescent-pan': 'iridescentPan 9s ease infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'marquee': 'marquee 38s linear infinite',
        'spin-slow': 'spin 28s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(20px,-30px,0)' },
        },
        driftSlow: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(-30px,25px,0)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        iridescentPan: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
