import { PageTitleBar } from '@/components/PageTitleBar'
import { getBgImageFromRoute, getBreadcrumbsFromRoute } from '@/utilities/page-title-bar'

import { LeafCatalogSection } from './_components'

export default function ServicesHubPage() {
  const title = '업무분야'
  const route = '/services'

  return (
    <>
      <PageTitleBar
        title={title}
        breadcrumbs={getBreadcrumbsFromRoute(route, title)}
        bgImage={getBgImageFromRoute(route)}
      />
      <main className="container py-section space-y-section">
        <LeafCatalogSection />
      </main>
    </>
  )
}
