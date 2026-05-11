'use client'

import { useEffect } from 'react'

export function useReveal(dep?: unknown) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    const elements = document.querySelectorAll('.reveal:not(.visible)')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [dep])
}