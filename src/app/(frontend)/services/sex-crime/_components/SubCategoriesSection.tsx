import type { FC } from 'react'

import { SEX_CRIME_SUBS } from '@/app/(frontend)/services/sex-crime/_data/sub-categories'
import { SectionHeader } from '@/components/SectionHeader'

export const SubCategoriesSection: FC = () => {
  return (
    <section
      id="sub-categories"
      aria-label="성범죄 사건 유형"
      className="space-y-12"
    >
      <SectionHeader title="사건 유형" />

      <ol className="mx-auto max-w-6xl divide-y divide-border">
        {SEX_CRIME_SUBS.map((sub) => (
          <li
            key={sub.slug}
            className="grid grid-cols-12 gap-x-8 gap-y-4 py-12 first:pt-0 last:pb-0"
          >
            <div className="col-span-12 lg:col-span-4">
              <h3 className="text-title-3 font-semibold">{sub.label}</h3>
            </div>

            <div className="col-span-12 lg:col-span-8">
              <p className="text-body-1">
                <strong className="font-semibold text-foreground">
                  {sub.definition}
                </strong>{' '}
                <span className="text-muted-foreground">{sub.body}</span>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
