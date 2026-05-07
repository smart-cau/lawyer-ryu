import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

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

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>성공사례</h1>
        </div>
      </div>

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
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `법무법인 인유 창원사무소 | 성공사례`,
  }
}
