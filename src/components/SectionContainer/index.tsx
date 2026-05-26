import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react'

import { cn } from '@/utilities/ui'

type SectionContainerProps = Omit<
  ComponentPropsWithoutRef<'section'>,
  'children'
> & {
  children: ReactNode
  innerClassName?: string
  backgroundImage?: CSSProperties['backgroundImage']
  background?: ReactNode
  padded?: boolean
}

export function SectionContainer({
  children,
  className,
  innerClassName,
  backgroundImage,
  background,
  padded = true,
  style,
  ...props
}: SectionContainerProps) {
  return (
    <section
      className={cn(
        'relative',
        backgroundImage && 'bg-cover bg-center bg-no-repeat',
        className,
      )}
      style={backgroundImage ? { ...style, backgroundImage } : style}
      {...props}
    >
      {background}
      <div
        className={cn(
          'container relative',
          padded && 'py-section',
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  )
}
