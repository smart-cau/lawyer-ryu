import type { FC } from 'react'

import { SectionHeader } from '@/components/SectionHeader'
import { cn } from '@/utilities/ui'

// 채택본: docs/03-firm/usp-copy-candidates-2026-05-14.md (2026-05-15)
const USP_ITEMS = [
  {
    eyebrow: '수사 흐름 예측',
    heading: '수사기관의 다음 단계를 예측해 대응합니다',
    body: '형사사건은 절차마다 수사기관이 다음에 무엇을 할지가 대체로 정해져 있습니다. 그 흐름을 모르면 의뢰인의 대응은 한 발 늦어지기 쉽습니다. 수사기관이 어떤 증거를 노리는지 미리 짚어, 의뢰인에게 필요한 진술과 자료를 안내합니다.',
  },
  {
    eyebrow: '유리한 증거 발굴',
    heading: '의뢰인에게 유리한 사실과 증거를 직접 찾습니다',
    body: '수사기관이 모은 자료만으로는 의뢰인에게 유리한 사실이 누락될 수 있습니다. 참고인을 직접 만나 묻고, 계좌·SNS·현장 자료까지 폭넓게 살펴 사실관계를 확인합니다. 이를 통해 의뢰인도 모르는 본인에게 유리한 사실과 증거를 찾아냅니다.',
  },
  {
    eyebrow: '강제수사 단계 대응',
    heading: '영장·체포·압수수색 단계에 직접 대응합니다',
    body: '영장 청구·체포·압수수색은 의뢰인의 자유와 일상에 가장 큰 영향을 주는 단계입니다. 강제수사 절차의 요건과 한계를 정확히 검토합니다. 의뢰인의 권리를 보호할 수 있도록 최적의 대응을 진행합니다.',
  },
  {
    eyebrow: '검사 시각의 전략',
    heading: '형사사건에 대한 깊은 이해를 바탕으로 전략을 세웁니다',
    body: '형사사건에서는 경찰·검사·판사가 각 단계에서 무엇을 확인하는지 알아야 합니다. 어떤 증거가 확보됐고 고소인·피의자에게 어떤 권리가 인정되는지 모르면 대응이 흔들릴 수 있습니다. 검사로서 절차를 직접 겪은 시각으로 쟁점과 자료, 의뢰인의 권리를 보호할 수 있도록 전략을 세웁니다.',
  },
]

export const UspSection: FC = () => {
  return (
    <section
      id="usp"
      aria-label="류남경 변호사를 믿을 수 있는 이유"
      className="mx-auto max-w-6xl"
    >
      <SectionHeader
        title={
          <>
            류남경 변호사를
            <br />
            믿을 수 있는 이유
          </>
        }
        lead="19년 검사 경력으로 의뢰인의 권리를 보호합니다."
      />

      <ol className="mt-16 space-y-20 lg:mt-24 lg:space-y-32">
        {USP_ITEMS.map((item, idx) => {
          const isReversed = idx % 2 === 0
          const indexLabel = String(idx + 1).padStart(2, '0')

          return (
            <li
              key={item.heading}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16"
            >
              {/* Image placeholder — stock image 예정 */}
              <div
                className={cn(
                  'lg:col-span-6',
                  isReversed && 'lg:col-start-7',
                )}
              >
                <div
                  aria-hidden
                  className="relative flex aspect-[3/2] w-full items-center justify-center bg-muted text-muted-foreground"
                >
                  <span className="text-label-2 uppercase tracking-[0.2em]">
                    Image {indexLabel}
                  </span>
                </div>
              </div>

              {/* Text */}
              <div
                className={cn(
                  'lg:col-span-5',
                  isReversed ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-8',
                )}
              >
                <p className="text-label-1 font-medium uppercase tracking-[0.18em] text-brand-gold">
                  {item.eyebrow}
                </p>
                <h3 className="mt-4 text-title-2 font-semibold">
                  {item.heading}
                </h3>
                <p className="mt-6 text-body-1-reading text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
