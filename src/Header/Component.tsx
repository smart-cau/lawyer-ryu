'use client'

import Link from 'next/link'
import { useEffect, useState, useSyncExternalStore } from 'react'

import { Logo } from '@/components/Logo/Logo'
import { cn } from '@/utilities/ui'

import { DesktopNav } from './DesktopNav'
import {
  getForcedHeaderToneServerSnapshot,
  getForcedHeaderToneSnapshot,
  subscribeForcedHeaderTone,
} from './heroToneStore'
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

  // 밝은 히어로 페이지가 헤더 tone을 강제하면 스크롤과 무관하게 그 값을 따른다.
  const forcedTone = useSyncExternalStore(
    subscribeForcedHeaderTone,
    getForcedHeaderToneSnapshot,
    getForcedHeaderToneServerSnapshot,
  )
  const light = forcedTone ? forcedTone === 'light' : scrolled
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
        <div className="flex items-center justify-between gap-6 py-[18px]">
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
