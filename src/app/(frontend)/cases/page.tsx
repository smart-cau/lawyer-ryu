import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { PageTitleBar } from '@/components/PageTitleBar'
import { getBgImageFromRoute, getBreadcrumbsFromRoute } from '@/utilities/page-title-bar'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const cases = await payload.find({
    collection: 'cases',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  const title = '성공사례'
  const route = '/cases'

  return (
    <>
      <PageTitleBar
        title={title}
        breadcrumbs={getBreadcrumbsFromRoute(route, title)}
        bgImage={getBgImageFromRoute(route)}
      />

      <div className="py-section">
        <div className="container mb-8">
          <PageRange
            collection="cases"
            currentPage={cases.page}
            limit={12}
            totalDocs={cases.totalDocs}
          />
        </div>

        <CollectionArchive posts={cases.docs} />

        <div className="container">
          {cases.totalPages > 1 && cases.page && (
            <Pagination page={cases.page} totalPages={cases.totalPages} />
          )}
        </div>
      </div>
    </>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `법무법인 인유 창원사무소 | 성공사례`,
  }
}
