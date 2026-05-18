import type { FC } from 'react'

import {
  SEX_CRIME_SUBS,
  type SexCrimeSubCategory,
} from '@/app/(frontend)/services/sex-crime/_data/sub-categories'
import { SectionHeader } from '@/components/SectionHeader'

const DETAIL_GROUPS = [
  { key: 'commonSituations', title: '주로 문제 되는 상황' },
  { key: 'keyIssues', title: '수사에서 다투는 쟁점' },
  { key: 'firstResponse', title: '초기 대응' },
  { key: 'attorneyRole', title: '변호사 조력' },
] satisfies {
  key: keyof Pick<
    SexCrimeSubCategory,
    'commonSituations' | 'keyIssues' | 'firstResponse' | 'attorneyRole'
  >
  title: string
}[]

export const SubCategoriesSection: FC = () => {
  return (
    <section
      id="sub-categories"
      aria-label="성범죄 사건 유형"
      className="space-y-12"
    >
      <SectionHeader
        title="사건 유형"
        lead="성범죄 사건은 죄명보다 접촉 경위, 동의 여부, 디지털 증거, 피해자와의 관계에 따라 대응 방향이 달라집니다."
      />

      <ol className="mx-auto max-w-6xl divide-y divide-border border-y border-border">
        {SEX_CRIME_SUBS.map((sub) => (
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
    </section>
  )
}
