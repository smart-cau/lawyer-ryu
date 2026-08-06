import type { Metadata } from 'next'

import type { Case } from '@/payload-types'

import { RelatedCases } from '@/blocks/RelatedCases/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import RichText from '@/components/RichText'

import { PageTitleBar } from '@/components/PageTitleBar'
import { MotionReveal } from '@/components/MotionReveal'
import { Badge } from '@/components/ui/badge'
import { JsonLd } from '@/components/JsonLd'
import { CONTACT } from '@/lib/constants'
import { getBgImageFromRoute, getBreadcrumbsFromRoute } from '@/utilities/page-title-bar'
import { formatAuthors } from '@/utilities/formatAuthors'
import { resolveCaseResultLabel } from '@/collections/Cases/resultOptions'
import { resolveCaseShareImage } from '@/utilities/caseShareImage'
import { generateMeta } from '@/utilities/generateMeta'
import { getServerSideURL } from '@/utilities/getURL'
import { BRAND_OPEN_GRAPH_IMAGE } from '@/utilities/mergeOpenGraph'
import { LivePreviewListener } from '@/components/LivePreviewListener'

// 게시일 — 한국식 표기(2026. 3. 22.). card의 표기와 톤 통일.
const formatKoreanDate = (iso?: string | null): string | null => {
  if (!iso) return null
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return null
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`
}

/**
 * 성공사례 한 건의 구조화 데이터(Article).
 *
 * author·publisher는 `@id`만 두지 않고 최소 정의를 함께 인라인한다 — 검색엔진은 다른
 * 페이지에 정의된 `@id`를 따라가지 않으므로, 참조만 남기면 빈 노드가 된다.
 * `@id` 값은 홈(`#organization`)·변호사 소개(`#person`)와 동일해 엔티티 그래프로 이어진다.
 *
 * BreadcrumbList는 `PageTitleBar`가 이미 출력하므로 여기서 중복 생성하지 않는다.
 * 승소율·평가로 읽힐 수 있는 `aggregateRating`·`review`는 변호사업무광고규정상 넣지 않는다.
 */
const buildCaseJsonLd = (caseDoc: Case, caseUrl: string) => {
  const siteUrl = getServerSideURL()
  const homeUrl = new URL('/', siteUrl).toString()
  const lawyerUrl = new URL('/about/lawyer', siteUrl).toString()
  const personId = `${lawyerUrl}#person`
  const organizationId = `${homeUrl}#organization`

  const shareImage = resolveCaseShareImage(caseDoc)

  // 분류명은 문서에 채워진 관계에서만 얻는다 (depth가 낮으면 id(number)로 들어온다).
  const articleSection = (caseDoc.categories ?? [])
    .map((category) => (typeof category === 'object' && category !== null ? category.title : null))
    .filter((title): title is string => Boolean(title))

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${caseUrl}#article`,
        mainEntityOfPage: caseUrl,
        url: caseUrl,
        headline: caseDoc.title,
        ...(caseDoc.meta?.description ? { description: caseDoc.meta.description } : {}),
        inLanguage: 'ko-KR',
        image: shareImage?.url ?? BRAND_OPEN_GRAPH_IMAGE.url,
        // publishedAt은 게시 시점에 채워지지만, 미리보기 등 미게시 상태에서는 비어 있다.
        datePublished: caseDoc.publishedAt ?? caseDoc.createdAt,
        dateModified: caseDoc.updatedAt,
        ...(articleSection.length > 0 ? { articleSection } : {}),
        author: { '@id': personId },
        publisher: { '@id': organizationId },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: CONTACT.representative,
        jobTitle: '대표변호사',
        url: lawyerUrl,
        worksFor: { '@id': organizationId },
      },
      {
        '@type': 'LegalService',
        '@id': organizationId,
        name: CONTACT.firmName,
        url: homeUrl,
      },
    ],
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const cases = await payload.find({
    collection: 'cases',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = cases.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Case({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/cases/' + decodedSlug
  const caseDoc = await queryCaseBySlug({ slug: decodedSlug })

  if (!caseDoc) return <PayloadRedirects url={url} />

  const { categories, populatedAuthors, publishedAt, result, resultCustom, title } = caseDoc

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''
  const hasCategories = Array.isArray(categories) && categories.length > 0
  const resultLabel = resolveCaseResultLabel(result, resultCustom)
  const publishedLabel = formatKoreanDate(publishedAt)

  const sectionTitle = '성공사례'
  const jsonLd = buildCaseJsonLd(caseDoc, new URL(url, getServerSideURL()).toString())

  return (
    <article className="pb-section">
      <PayloadRedirects disableNotFound url={url} />

      <JsonLd id="case-structured-data" data={jsonLd} />

      {draft && <LivePreviewListener />}

      <PageTitleBar
        title={sectionTitle}
        breadcrumbs={getBreadcrumbsFromRoute('/cases/' + decodedSlug, title)}
        bgImage={getBgImageFromRoute('/cases')}
        className="motion-entrance-fade"
      />

      <div className="container py-section">
        <MotionReveal asChild>
          <header className="max-w-[48rem] mx-auto mb-12">
            {/* 핵심 결과 + 분류 — 카드와 동일한 배지 패턴으로 통일 */}
            {(resultLabel || hasCategories) && (
              <div className="mb-5 flex flex-wrap items-center gap-1.5">
                {resultLabel && (
                  <Badge className="bg-brand-deep text-brand-deep-foreground hover:bg-brand-deep text-body-1 font-semibold">
                    {resultLabel}
                  </Badge>
                )}
                {categories?.map((category, index) => {
                  if (typeof category === 'object' && category !== null) {
                    return (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-brand-deep/20 text-brand-deep bg-brand-deep/5 text-body-1 font-medium"
                      >
                        {category.title || '미분류'}
                      </Badge>
                    )
                  }
                  return null
                })}
              </div>
            )}

            <h1 className="text-title-1 font-bold text-foreground">{title}</h1>

            {/* 작성자·게시일 — 라벨을 명시해 어떤 항목인지 분명히 */}
            {(hasAuthors || publishedLabel) && (
              <dl className="border-border mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 border-t pt-6">
                {hasAuthors && (
                  <div className="flex items-center gap-2">
                    <dt className="text-body-1 text-muted-foreground">작성자</dt>
                    <dd className="text-body-1 text-foreground font-medium">
                      {formatAuthors(populatedAuthors)}
                    </dd>
                  </div>
                )}
                {publishedLabel && (
                  <div className="flex items-center gap-2">
                    <dt className="text-body-1 text-muted-foreground">게시일</dt>
                    <dd className="text-body-1 text-foreground font-medium">
                      <time dateTime={publishedAt ?? undefined}>{publishedLabel}</time>
                    </dd>
                  </div>
                )}
              </dl>
            )}
          </header>
        </MotionReveal>

        <MotionReveal>
          <RichText className="max-w-[48rem] mx-auto" data={caseDoc.content} enableGutter={false} />
        </MotionReveal>

        {caseDoc.relatedCases && caseDoc.relatedCases.length > 0 && (
          <MotionReveal>
            <RelatedCases
              className="mt-16 max-w-[52rem] mx-auto"
              docs={caseDoc.relatedCases.filter((c) => typeof c === 'object')}
            />
          </MotionReveal>
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const caseDoc = await queryCaseBySlug({ slug: decodedSlug })

  return generateMeta({ doc: caseDoc })
}

const queryCaseBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'cases',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
