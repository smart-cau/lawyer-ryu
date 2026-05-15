import Link from 'next/link'
import type { FC } from 'react'

import { SectionHeader } from '@/components/SectionHeader'
import { Card } from '@/components/ui/card'

const MOCK_CASES = [
  {
    id: 'sample-1',
    category: '특수·경제',
    title: '준사기 혐의 — 수사단계 무혐의',
    description:
      '의뢰인 측 계좌·거래내역과 디지털 증거를 직접 분석해 사기 고의 부재를 입증한 사례.',
  },
  {
    id: 'sample-2',
    category: '강력·성',
    title: '성폭력 혐의 — 검찰 단계 불기소',
    description:
      '참고인을 사무소로 불러 신문하고 사건 현장을 직접 검증해 사실관계를 재구성한 사례.',
  },
  {
    id: 'sample-3',
    category: '기업 재산범죄',
    title: '업무상 배임 — 기소유예',
    description:
      '구성요건을 정밀 분해해 가장 약한 한 점을 식별하고 사실 단서로 흠결을 입증한 사례.',
  },
]

export const CasesSection: FC = () => {
  const items = MOCK_CASES
  const isMock = true

  if (items.length === 0) return null

  return (
    <section id="cases" aria-label="대표 사례" className="mx-auto max-w-5xl">
      <SectionHeader
        title="대표 사례"
        lead="수임 사건의 상당수가 수사단계에서 해결됩니다"
      >
        {isMock && (
          <p className="mt-3 text-caption-1 italic text-muted-foreground">
            ※ 아래는 wireframe sample. 실 데이터 등록 시 자동 교체됩니다.
          </p>
        )}
      </SectionHeader>

      <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
        {items.map((item) => (
          <li key={item.id}>
            <Card className="flex h-full flex-col overflow-hidden">
              <div
                className="aspect-[4/3] w-full bg-muted"
                aria-label="사례 이미지 placeholder"
              />
              <div className="flex flex-1 flex-col p-6">
                <p className="text-label-1 text-muted-foreground">{item.category}</p>
                <h3 className="mt-2 text-heading-2 font-semibold">{item.title}</h3>
                <p className="mt-3 text-body-1 text-muted-foreground">{item.description}</p>
              </div>
            </Card>
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center lg:mt-12">
        <Link
          href="/cases"
          className="text-body-1 font-medium underline-offset-4 hover:underline"
        >
          전체 사례 보기 →
        </Link>
      </div>
    </section>
  )
}
