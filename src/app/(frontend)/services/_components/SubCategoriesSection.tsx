import type { FC } from 'react'

import { SectionContainer } from '@/components/SectionContainer'
import { SectionHeader } from '@/components/SectionHeader'

import type { ServiceLeafContent, ServiceSubCategory } from '../_data/service-leaf'

const DETAIL_GROUPS = [
  { key: 'commonSituations', title: '주로 문제 되는 상황' },
  { key: 'keyIssues', title: '수사에서 다투는 쟁점' },
  { key: 'firstResponse', title: '초기 대응' },
  { key: 'attorneyRole', title: '변호사 조력' },
] satisfies {
  key: keyof Pick<
    ServiceSubCategory,
    'commonSituations' | 'keyIssues' | 'firstResponse' | 'attorneyRole'
  >
  title: string
}[]

type SubCategoriesSectionProps = {
  data: ServiceLeafContent['subCategories']
}

export const SubCategoriesSection: FC<SubCategoriesSectionProps> = ({ data }) => {
  return (
    <SectionContainer
      id="sub-categories"
      aria-label={data.title}
      innerClassName="space-y-12"
    >
      <SectionHeader
        title={data.title}
        lead={data.lead}
      />

      <ol className="mx-auto max-w-6xl divide-y divide-border border-y border-border">
        {data.items.map((sub) => (
          <li
            key={sub.slug}
            className="grid grid-cols-12 gap-x-8 gap-y-6 py-12"
          >
            <div className="col-span-12 flex flex-col justify-center space-y-3 lg:col-span-4">
              <h3 className="text-title-3 font-semibold">{sub.label}</h3>
              <div className="space-y-2">
                <p className="text-label-1-reading text-muted-foreground">
                  대표 키워드
                </p>
                <ul className="flex flex-wrap gap-2">
                  {sub.keywords.map((keyword) => (
                    <li
                      key={keyword}
                      className="rounded-md border border-border bg-white px-2.5 py-1 text-label-2 font-medium text-foreground"
                    >
                      {keyword}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-span-12 space-y-7 lg:col-span-8">
              <p className="break-keep text-body-1-reading">
                <strong className="font-semibold text-foreground">
                  {sub.definition}
                </strong>
              </p>

              <div className="grid gap-x-8 gap-y-6 border-t border-border pt-6 md:grid-cols-2">
                {DETAIL_GROUPS.map((group) => (
                  <section key={group.key} className="space-y-3">
                    <h4 className="text-label-1 font-semibold text-foreground">
                      {group.title}
                    </h4>
                    <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
                      {sub[group.key].map((item) => (
                        <li
                          key={item}
                          className="break-keep text-body-2-reading text-muted-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </SectionContainer>
  )
}
