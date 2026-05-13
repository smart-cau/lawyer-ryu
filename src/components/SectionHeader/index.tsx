import type { FC, ReactNode } from 'react'

import { cn } from '@/utilities/ui'

type SectionHeaderProps = {
  overline?: string
  title: string
  lead?: string
  children?: ReactNode
}

export const SectionHeader: FC<SectionHeaderProps> = ({
  overline,
  title,
  lead,
  children,
}) => {
  return (
    <header className="mx-auto max-w-2xl text-center">
      {overline && (
        <p className="text-overline text-muted-foreground">{overline}</p>
      )}
      <h2 className={cn('text-h2', overline && 'mt-3')}>{title}</h2>
      {lead && (
        <p className="mt-4 text-body-lg text-muted-foreground">{lead}</p>
      )}
      {children}
    </header>
  )
}
