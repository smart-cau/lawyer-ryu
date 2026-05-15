import type { FC, ReactNode } from 'react'

// overline 은 필요 시 추가한다 (title 위 작은 라벨 — text-label-1 + text-muted-foreground 또는 text-brand-gold).

type SectionHeaderProps = {
  title: string
  lead?: string
  children?: ReactNode
}

export const SectionHeader: FC<SectionHeaderProps> = ({ title, lead, children }) => {
  return (
    <header className="mx-auto max-w-2xl text-center">
      <h2 className="text-title-1 font-semibold">{title}</h2>
      {lead && (
        <p className="mt-4 text-headline-1 font-medium text-muted-foreground">{lead}</p>
      )}
      {children}
    </header>
  )
}
