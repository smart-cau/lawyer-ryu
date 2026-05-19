'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Logo } from '@/components/Logo/Logo'
import { cn } from '@/utilities/ui'

import { DesktopNav } from './DesktopNav'
import { MobileNav } from './MobileNav'

const SCROLL_THRESHOLD = 16

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const light = scrolled
  const tone = light ? 'light' : 'dark'

  return (
    <header
      className={cn(
        'sticky top-0 z-30 transition-colors duration-200 ease-out',
        light
          ? 'border-b border-border/60 bg-background backdrop-blur'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="container">
        <div className="flex items-center justify-between gap-6 py-6">
          <Link
            href="/"
            aria-label="법무법인 인유 홈"
            className="transition-opacity hover:opacity-80"
          >
            <Logo priority tone={tone} />
          </Link>

          <DesktopNav tone={tone} />
          <MobileNav tone={tone} />
        </div>
      </div>
    </header>
  )
}
