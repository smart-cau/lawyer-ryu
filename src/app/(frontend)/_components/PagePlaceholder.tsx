import type { FC, ReactNode } from 'react'

type Props = {
  route: string
  title: string
  description?: ReactNode
}

export const PagePlaceholder: FC<Props> = ({ route, title, description }) => {
  return (
    <main className="container py-16">
      <section
        aria-label={title}
        className="border border-dashed border-border rounded-md p-8"
      >
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{route}</p>
        <h1 className="mt-2 text-3xl font-semibold">{title}</h1>
        {description ? (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </section>
    </main>
  )
}
