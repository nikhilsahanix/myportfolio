import type { Metadata } from 'next'
import Resume from '@/components/Resume'
import './resume.css'

export const metadata: Metadata = {
  title: 'Nikhil Sahani — Resume',
  description:
    'Full-stack developer resume — Next.js, React, TypeScript, AWS, AI integrations, and more.',
}

export default function ResumePage() {
  return <Resume />
}
