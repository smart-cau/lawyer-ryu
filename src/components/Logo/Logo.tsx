import Image from 'next/image'

import { cn } from '@/utilities/ui'

type Props = {
  className?: string
  priority?: boolean
  tone?: 'light' | 'dark'
}

export function Logo({ className, priority = false, tone = 'light' }: Props) {
  const isDark = tone === 'dark'

  return (
    <span className={cn('flex items-center gap-3 leading-tight', className)}>
      <span className="relative inline-block h-9 w-[34px] shrink-0">
        <Image
          src="/brand/inyou-logo.png"
          alt="법무법인 인유"
          fill
          priority={priority}
          sizes="34px"
          className={cn(
            'object-contain transition-opacity duration-200 ease-out',
            isDark ? 'opacity-0' : 'opacity-100',
          )}
        />
        <Image
          src="/brand/inyou-logo-white.png"
          alt=""
          fill
          priority={priority}
          sizes="34px"
          aria-hidden
          className={cn(
            'object-contain transition-opacity duration-200 ease-out',
            isDark ? 'opacity-100' : 'opacity-0',
          )}
        />
      </span>
      <span className="flex flex-col">
        <span
          className={cn(
            'text-xs tracking-widest transition-colors duration-200 ease-out',
            isDark ? 'text-white/70' : 'text-muted-foreground',
          )}
        >
          [창원사무소]
        </span>
        <span
          className={cn(
            'text-lg font-semibold transition-colors duration-200 ease-out',
            isDark ? 'text-white' : 'text-foreground',
          )}
        >
          법무법인 인유
        </span>
      </span>
    </span>
  )
}
