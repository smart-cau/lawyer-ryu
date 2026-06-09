'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'

import type { Case } from '@/payload-types'

import { Card as UICard } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { resolveCaseResultLabel } from '@/collections/Cases/resultOptions'

// categories·result는 Cases에선 필수지만, search 컬렉션 등 다른 소스에는 없을 수 있어
// 카드 표시용 타입에서는 optional로 둔다 (카드가 부재를 런타임에 처리).
export type CardPostData = Pick<Case, 'slug' | 'meta' | 'title' | 'publishedAt'> &
  Partial<Pick<Case, 'categories' | 'result' | 'resultCustom'>>

const formatCardDate = (iso?: string | null): string | null => {
  if (!iso) return null
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return null
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}.${mm}.${dd}`
}

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'cases'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { cardRef, linkRef } = useClickableCard<HTMLElement>({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, publishedAt, result, resultCustom } = doc || {}
  const { description } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`
  const formattedDate = formatCardDate(publishedAt)
  const resultLabel = resolveCaseResultLabel(result, resultCustom)

  return (
    <article ref={cardRef} className={cn('group h-full hover:cursor-pointer', className)}>
      <UICard className="hover:border-brand-deep/30 relative flex h-full flex-col p-6 transition-[border-color,box-shadow] hover:shadow-md">
        {(resultLabel || (showCategories && hasCategories)) && (
          <div className="mb-4 flex flex-wrap items-center gap-1.5">
            {resultLabel && (
              <Badge className="bg-brand-deep text-brand-deep-foreground hover:bg-brand-deep text-label-1 font-semibold">
                {resultLabel}
              </Badge>
            )}
            {showCategories &&
              categories?.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const categoryTitle = category.title || '미분류'
                  return (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-brand-deep/20 text-brand-deep bg-brand-deep/5 text-label-2 font-medium"
                    >
                      {categoryTitle}
                    </Badge>
                  )
                }
                return null
              })}
          </div>
        )}

        {titleToUse && (
          <h3 className="text-heading-2 font-semibold">
            <Link
              className="after:absolute after:inset-0 hover:underline"
              href={href}
              ref={linkRef}
            >
              {titleToUse}
            </Link>
          </h3>
        )}

        {sanitizedDescription && (
          <p className="text-body-2 text-muted-foreground mt-3 line-clamp-3">
            {sanitizedDescription}
          </p>
        )}

        <div className="text-label-1 text-muted-foreground mt-auto flex items-center justify-between pt-6">
          {formattedDate ? <time dateTime={publishedAt ?? undefined}>{formattedDate}</time> : <span />}
          <ArrowUpRight
            aria-hidden
            className="text-brand-deep/60 group-hover:text-brand-deep size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </UICard>
    </article>
  )
}
