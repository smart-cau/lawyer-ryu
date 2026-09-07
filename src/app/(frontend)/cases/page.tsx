import type { Metadata } from 'next/types'
import type { Where } from 'payload'

import { CollectionArchive } from '@/components/CollectionArchive'
import { MotionReveal } from '@/components/MotionReveal'
import { Pagination } from '@/components/Pagination'
import { PageTitleBar } from '@/components/PageTitleBar'
import { getBgImageFromRoute, getBreadcrumbsFromRoute } from '@/utilities/page-title-bar'
import { BRAND_OPEN_GRAPH_IMAGE, mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import { CasesToolbar, type CategoryOption } from './_components/CasesToolbar'

export const dynamic = 'force-dynamic'

type Args = {
  searchParams: Promise<{
    category?: string
    page?: string
    q?: string
  }>
}

const SITE_NAME = '법무법인 인유 창원분사무소'

// 목록 본문과 generateMetadata가 같은 요청 안에서 한 번만 조회하도록 cache로 묶는다.
const queryCategories = cache(async (): Promise<CategoryOption[]> => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
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

  return result.docs.map((doc) => ({
    id: doc.id,
    title: doc.title,
    slug: doc.slug ?? '',
  }))
})

const parsePage = (pageParam?: string): number => {
  const parsed = Number(pageParam)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1
}

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { category, page: pageParam, q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const pageNumber = parsePage(pageParam)

  const categories = await queryCategories()

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
        className="motion-entrance-fade"
      />

      <div className="py-section">
        <MotionReveal className="container mb-8">
          <CasesToolbar categories={categories} />
        </MotionReveal>

        {cases.totalDocs > 0 ? (
          <CollectionArchive animate posts={cases.docs} />
        ) : (
          <MotionReveal className="container">
            <p className="text-muted-foreground text-body-1">
              {isFiltered
                ? '조건에 맞는 사례가 없습니다. 다른 분야나 검색어로 다시 시도해 주세요.'
                : '등록된 사례가 아직 없습니다.'}
            </p>
          </MotionReveal>
        )}

        {/* searchParams 기반 페이지네이션 — 분야·검색어 상태를 보존 */}
        {cases.totalPages > 1 && cases.page && (
          <MotionReveal className="container">
            <Pagination page={cases.page} totalPages={cases.totalPages} />
          </MotionReveal>
        )}
      </div>
    </>
  )
}

/**
 * 목록 메타는 분야 필터·페이지 번호에 따라 달라져야 한다.
 * `/cases?category=…` URL이 분야 pill 링크로 크롤링되는데, 전부 같은 title·description을
 * 내보내면 검색엔진이 중복 문서로 묶는다. 검색어(q) 결과는 조합이 무한하므로 색인에서 제외한다.
 */
export async function generateMetadata({
  searchParams: searchParamsPromise,
}: Args): Promise<Metadata> {
  const { category, page: pageParam, q: query } = await searchParamsPromise
  const pageNumber = parsePage(pageParam)

  const categories = await queryCategories()
  const activeCategory = category ? categories.find((c) => c.slug === category) : undefined

  const pageSuffix = pageNumber > 1 ? ` ${pageNumber}페이지` : ''
  const canonicalParams = new URLSearchParams()
  if (activeCategory) canonicalParams.set('category', activeCategory.slug)
  if (pageNumber > 1) canonicalParams.set('page', String(pageNumber))
  const canonicalQs = canonicalParams.toString()
  const canonical = canonicalQs ? `/cases?${canonicalQs}` : '/cases'

  const title = activeCategory
    ? `${activeCategory.title} 성공사례${pageSuffix} | ${SITE_NAME}`
    : `성공사례${pageSuffix} | ${SITE_NAME}`
  const description = activeCategory
    ? `${SITE_NAME}의 ${activeCategory.title} 분야 성공사례${pageSuffix}입니다. 사건의 쟁점과 대응 결과를 살펴보고 상담 방향을 검토해 보세요.`
    : `${SITE_NAME}의 주요 성공사례${pageSuffix}를 분야별로 확인할 수 있습니다. 사건의 쟁점과 대응 결과를 살펴보고 상담 방향을 검토해 보세요.`

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    ...(query ? { robots: { index: false, follow: true } } : {}),
    openGraph: mergeOpenGraph({
      title,
      description,
      siteName: SITE_NAME,
      url: canonical,
    }),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [BRAND_OPEN_GRAPH_IMAGE.url],
    },
  }
}
