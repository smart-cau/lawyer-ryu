import type { FC, ReactNode } from 'react'

import { PageTitleBar } from '@/components/PageTitleBar'
import { getBgImageFromRoute, getBreadcrumbsFromRoute } from '@/utilities/page-title-bar'

type Props = {
  route: string
  title: string
  description?: ReactNode
}

export const PagePlaceholder: FC<Props> = ({ route, title, description }) => {
  return (
    <>
      <PageTitleBar
        title={title}
        breadcrumbs={getBreadcrumbsFromRoute(route, title)}
        bgImage={getBgImageFromRoute(route)}
      />
      <main className="container py-section">
        <section
          aria-label={title}
          className="border border-dashed border-border rounded-md p-8"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{route}</p>
          <h2 className="mt-2 text-title-1 font-semibold">{title}</h2>
          {description ? (
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </section>
      </main>
    </>
  )
}
