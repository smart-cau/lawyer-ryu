import type { Metadata } from 'next/types'
import type { Where } from 'payload'

import { CollectionArchive } from '@/components/CollectionArchive'
import { Pagination } from '@/components/Pagination'
import { PageTitleBar } from '@/components/PageTitleBar'
import { getBgImageFromRoute, getBreadcrumbsFromRoute } from '@/utilities/page-title-bar'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { CasesToolbar, type CategoryOption } from './_components/CasesToolbar'

export const dynamic = 'force-dynamic'

type Args = {
  searchParams: Promise<{
    category?: string
    page?: string
    q?: string
  }>
}

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { category, page: pageParam, q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const parsedPage = Number(pageParam)
  const pageNumber = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1

  const categoriesResult = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 100,
    overrideAccess: false,
    sort: 'createdAt',
    select: {
      title: true,
      slug: true,
    },
  })

  const categories: CategoryOption[] = categoriesResult.docs.map((doc) => ({
    id: doc.id,
    title: doc.title,
    slug: doc.slug ?? '',
  }))

  const filters: Where[] = []
  if (category) {
    filters.push({ 'categories.slug': { equals: category } })
  }
  if (query) {
    filters.push({
      or: [
        { title: { like: query } },
        { 'meta.description': { like: query } },
        { 'meta.title': { like: query } },
      ],
    })
  }
  const isFiltered = filters.length > 0
  const where: Where | undefined = isFiltered ? { and: filters } : undefined

  const cases = await payload.find({
    collection: 'cases',
    depth: 1,
    limit: 12,
    page: pageNumber,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
      result: true,
      resultCustom: true,
    },
    ...(where ? { where } : {}),
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
          <CasesToolbar categories={categories} />
        </div>

        {cases.totalDocs > 0 ? (
          <CollectionArchive posts={cases.docs} />
        ) : (
          <div className="container">
            <p className="text-muted-foreground text-body-1">
              {isFiltered
                ? '조건에 맞는 사례가 없습니다. 다른 분야나 검색어로 다시 시도해 주세요.'
                : '등록된 사례가 아직 없습니다.'}
            </p>
          </div>
        )}

        {/* searchParams 기반 페이지네이션 — 분야·검색어 상태를 보존 */}
        {cases.totalPages > 1 && cases.page && (
          <div className="container">
            <Pagination page={cases.page} totalPages={cases.totalPages} />
          </div>
        )}
      </div>
    </>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `법무법인 인유 창원사무소 | 성공사례`,
  }
}
