import type { Metadata } from 'next'

import { RelatedCases } from '@/blocks/RelatedCases/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import RichText from '@/components/RichText'

import { PageTitleBar } from '@/components/PageTitleBar'
import { Badge } from '@/components/ui/badge'
import { getBgImageFromRoute, getBreadcrumbsFromRoute } from '@/utilities/page-title-bar'
import { formatAuthors } from '@/utilities/formatAuthors'
import { resolveCaseResultLabel } from '@/collections/Cases/resultOptions'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'

// 게시일 — 한국식 표기(2026. 3. 22.). card의 표기와 톤 통일.
const formatKoreanDate = (iso?: string | null): string | null => {
  if (!iso) return null
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return null
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`
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

  return (
    <article className="pb-section">
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PageTitleBar
        title={sectionTitle}
        breadcrumbs={getBreadcrumbsFromRoute('/cases/' + decodedSlug, title)}
        bgImage={getBgImageFromRoute('/cases')}
      />

      <div className="container py-section">
        <header className="max-w-[48rem] mx-auto mb-12">
          {/* 핵심 결과 + 분류 — 카드와 동일한 배지 패턴으로 통일 */}
          {(resultLabel || hasCategories) && (
            <div className="mb-5 flex flex-wrap items-center gap-1.5">
              {resultLabel && (
                <Badge className="bg-brand-deep text-brand-deep-foreground hover:bg-brand-deep text-label-1 font-semibold">
                  {resultLabel}
                </Badge>
              )}
              {categories?.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  return (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-brand-deep/20 text-brand-deep bg-brand-deep/5 text-label-2 font-medium"
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
                  <dt className="text-label-2 text-muted-foreground">작성자</dt>
                  <dd className="text-label-1 text-foreground font-medium">
                    {formatAuthors(populatedAuthors)}
                  </dd>
                </div>
              )}
              {publishedLabel && (
                <div className="flex items-center gap-2">
                  <dt className="text-label-2 text-muted-foreground">게시일</dt>
                  <dd className="text-label-1 text-foreground font-medium">
                    <time dateTime={publishedAt ?? undefined}>{publishedLabel}</time>
                  </dd>
                </div>
              )}
            </dl>
          )}
        </header>

        <RichText className="max-w-[48rem] mx-auto" data={caseDoc.content} enableGutter={false} />

        {caseDoc.relatedCases && caseDoc.relatedCases.length > 0 && (
          <RelatedCases
            className="mt-16 max-w-[52rem] mx-auto"
            docs={caseDoc.relatedCases.filter((c) => typeof c === 'object')}
          />
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
