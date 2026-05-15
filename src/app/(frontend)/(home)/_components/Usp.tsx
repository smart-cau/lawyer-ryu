import type { FC } from 'react'

import { SectionHeader } from '@/components/SectionHeader'

// 채택본: docs/03-firm/usp-copy-candidates-2026-05-14.md (2026-05-15)
// 4번째 항목은 변호사 피드백 받아 보완 예정 — 임시 placeholder
const USP_ITEMS = [
  {
    heading: '수사기관의 다음 단계를 예측해 대응합니다',
    body: '형사사건은 절차마다 수사기관이 다음에 무엇을 할지가 대체로 정해져 있습니다. 그 흐름을 모르면 의뢰인의 대응은 한 발 늦어지기 쉽습니다. 수사기관이 어떤 증거를 노리는지 미리 짚어, 의뢰인에게 필요한 진술과 자료를 안내합니다.',
  },
  {
    heading: '의뢰인에게 유리한 사실과 증거를 직접 찾아냅니다',
    body: '수사기관이 모은 자료만으로는 의뢰인에게 유리한 사실이 누락될 수 있습니다. 참고인을 직접 만나 묻고, 계좌·SNS·현장 자료까지 폭넓게 살펴 사실관계를 확인합니다. 이를 통해 의뢰인도 모르는 본인에게 유리한 사실과 증거를 찾아냅니다.',
  },
  {
    heading: '영장·체포·압수수색 단계에 직접 대응합니다',
    body: '영장 청구·체포·압수수색은 의뢰인의 자유와 일상에 가장 큰 영향을 주는 단계입니다. 영장 기각 사유와 강제수사 시점의 권리를 검사 시절 실무에 비춰 단계마다 살핍니다. 의뢰인이 부당한 대우나 권리 침해를 겪지 않도록 입회와 조언으로 조력합니다.',
  },
  {
    heading: '준비 중',
    body: '추가 항목은 변호사 피드백을 받아 보완할 예정입니다.',
  },
]

export const UspSection: FC = () => {
  return (
    <section id="usp" aria-label="왜 류남경 변호사인가" className="mx-auto max-w-5xl">
      <SectionHeader
        title="왜 류남경 변호사인가"
        lead="검사로서 직접 수사한 시점으로 변론합니다."
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
