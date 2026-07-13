'use client'

import { Slot } from '@radix-ui/react-slot'
import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/utilities/ui'

type MotionDirection = 'left' | 'right' | 'up'

type MotionRevealProps = {
  asChild?: boolean
  children: ReactNode
  className?: string
  delay?: number
  direction?: MotionDirection
}

type MotionState = 'idle' | 'pending' | 'visible'

export function MotionReveal({
  asChild = false,
  children,
  className,
  delay = 0,
  direction = 'up',
}: MotionRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [state, setState] = useState<MotionState>('idle')

  useEffect(() => {
    const element = ref.current

    if (
      !element ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setState('visible')
      return
    }

    const rect = element.getBoundingClientRect()

    // 이미 보이는 콘텐츠는 숨겼다가 다시 나타내지 않는다. 초기 화면과 LCP는
    // 별도의 CSS entrance가 담당하고, 이 컴포넌트는 화면 아래 콘텐츠만 향상한다.
    if (rect.top <= window.innerHeight * 0.92) {
      setState('visible')
      return
    }

    setState('pending')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return

        setState('visible')
        observer.disconnect()
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.08,
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const Component = asChild ? Slot : 'div'
  const setRef = (element: HTMLElement | null) => {
    ref.current = element
  }
  const style = {
    '--motion-delay': `${Math.max(0, delay)}ms`,
  } as CSSProperties

  return (
    <Component
      ref={setRef}
      className={cn('motion-reveal', className)}
      data-motion-direction={direction}
      data-motion-state={state}
      style={style}
    >
      {children}
    </Component>
  )
}
