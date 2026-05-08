import Image from 'next/image'

import { cn } from '@/utilities/ui'

type Props = {
  className?: string
  priority?: boolean
  tone?: 'light' | 'dark'
}

export function Logo({ className, priority = false, tone = 'light' }: Props) {
  return (
    <span className={cn('flex items-center gap-3 leading-tight', className)}>
      <Image
        src="/brand/inyou-logo.png"
        alt="법무법인 인유"
        width={98}
        height={103}
        priority={priority}
        className="h-9 w-auto"
      />
      <span className="flex flex-col">
        <span
          className={cn(
            'text-xs tracking-widest',
            tone === 'dark' ? 'text-white/60' : 'text-muted-foreground',
          )}
        >
          [창원사무소]
        </span>
        <span
          className={cn(
            'text-lg font-semibold',
            tone === 'dark' ? 'text-white' : 'text-foreground',
          )}
        >
          법무법인 인유
        </span>
      </span>
    </span>
  )
}
