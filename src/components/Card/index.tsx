'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Case } from '@/payload-types'

import { Card as UICard, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Media } from '@/components/Media'

export type CardPostData = Pick<Case, 'slug' | 'categories' | 'meta' | 'title'>

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

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article ref={cardRef} className={cn('h-full hover:cursor-pointer', className)}>
      <UICard className="h-full gap-0 overflow-hidden p-0">
        <div className="relative w-full">
          {!metaImage && <div className="text-muted-foreground p-4 text-sm">No image</div>}
          {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="33vw" />}
        </div>
        <CardContent className="p-4">
          {showCategories && hasCategories && (
            <div className="text-muted-foreground mb-4 text-sm uppercase tracking-wide">
              {categories?.map((category, index) => {
                if (typeof category === 'object') {
                  const { title: titleFromCategory } = category

                  const categoryTitle = titleFromCategory || 'Untitled category'

                  const isLast = index === categories.length - 1

                  return (
                    <Fragment key={index}>
                      {categoryTitle}
                      {!isLast && <Fragment>, &nbsp;</Fragment>}
                    </Fragment>
                  )
                }

                return null
              })}
            </div>
          )}
          {titleToUse && (
            <CardTitle className="text-lg leading-snug">
              <Link className="hover:underline" href={href} ref={linkRef}>
                {titleToUse}
              </Link>
            </CardTitle>
          )}
          {description && (
            <CardDescription className="mt-2">{sanitizedDescription}</CardDescription>
          )}
        </CardContent>
      </UICard>
    </article>
  )
}
