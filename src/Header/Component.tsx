import Link from 'next/link'

import { Logo } from '@/components/Logo/Logo'

import { DesktopNav } from './DesktopNav'
import { MobileNav } from './MobileNav'

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container">
        <div className="flex items-center justify-between gap-6 py-6">
          <Link
            href="/"
            aria-label="법무법인 인유 홈"
            className="transition-opacity hover:opacity-80"
          >
            <Logo priority />
          </Link>

          <DesktopNav />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
