import type { FC } from 'react'

import { SectionHeader } from '@/components/SectionHeader'

const USP_ITEMS = [
  {
    heading: '재판까지 가기 전에 끝낸다',
    body: '수사단계 무혐의·기소유예를 1순위 목표로 합니다. 경찰 단계에서는 불송치, 검찰 단계에서는 불기소 또는 기소유예. 재판으로 가지 않으면 의뢰인의 부담·시간·비용뿐 아니라 직장·가족·사회적 평판까지 보호됩니다.',
  },
  {
    heading: '수사기관을 대신해 증거를 찾는다',
    body: '단순 변론이 아니라 수사기관과 동일한 강도로 의뢰인 측 사실관계와 증거를 직접 조사합니다. 참고인을 사무소로 불러 신문하고, 계좌·거래내역과 카카오톡·문자·사진을 분석하며, 필요하다면 현장에 직접 가서 사실관계를 검증합니다.',
  },
  {
    heading: '다음 수사 단계를 예측한다',
    body: '검사로서 19년간 수사를 직접 수행한 경험으로, 수사관이 어떤 질문을 던지고 어떤 증거를 확보하려 할지 사전에 예측합니다. 경찰 조사 출석 전 답변 포인트와 주의사항을 구체적으로 시뮬레이션하고, 수사 진행에 따라 단계별로 취해야 할 조치를 적시에 안내합니다.',
  },
  {
    heading: '구성요건 한 점을 파고든다',
    body: '형사 범죄는 구성요건 전부가 충족되어야 성립합니다. 단 하나의 구성요건만 흠결되어도 무혐의가 됩니다. 사건의 구성요건을 정밀 분해해 가장 약한 한 점을 식별하고, 직접 수집한 사실 단서로 그 한 점을 무너뜨립니다.',
  },
]

export const UspSection: FC = () => {
  return (
    <section id="usp" aria-label="왜 류남경 변호사인가" className="mx-auto max-w-5xl">
      <SectionHeader
        overline="원칙"
        title="왜 류남경 변호사인가"
        lead="검사 19년 경력이 만드는 변호사 실력의 차이"
      />

      <ol className="mt-12 space-y-10 lg:mt-16 lg:space-y-14">
        {USP_ITEMS.map((item, idx) => (
          <li
            key={item.heading}
            className="grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-8"
          >
            <div className="lg:col-span-2">
              <span
                aria-hidden
                className="text-4xl font-light text-muted-foreground lg:text-5xl"
              >
                {String(idx + 1).padStart(2, '0')}
              </span>
            </div>
            <div className="lg:col-span-10">
              <h3 className="text-title-3 font-semibold">{item.heading}</h3>
              <p className="mt-3 text-body-1 text-muted-foreground">{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
