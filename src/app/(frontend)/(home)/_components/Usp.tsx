import type { FC } from 'react'

import Image from 'next/image'

import { SectionContainer } from '@/components/SectionContainer'
import { SectionHeader } from '@/components/SectionHeader'
import { cn } from '@/utilities/ui'

// 채택본: docs/03-firm/usp-copy-candidates-2026-05-14.md (2026-05-15)
const USP_ITEMS = [
  {
    eyebrow: '수사 흐름 예측',
    heading: '수사기관의 다음 단계를 예측해 대응합니다',
    body: '형사사건은 절차마다 수사기관이 다음에 무엇을 할지가 대체로 정해져 있습니다. 그 흐름을 모르면 의뢰인의 대응은 한 발 늦어지기 쉽습니다. 수사기관이 어떤 증거를 노리는지 미리 짚어, 의뢰인에게 필요한 진술과 자료를 안내합니다.',
    image: {
      src: '/home/usp/usp01.png',
      alt: '법률 문서를 검토하는 변호사',
    },
  },
  {
    eyebrow: '유리한 증거 발굴',
    heading: '의뢰인에게 유리한 사실과 증거를 직접 찾습니다',
    body: '수사기관이 모은 자료만으로는 의뢰인에게 유리한 사실이 누락될 수 있습니다. 참고인을 직접 만나 묻고, 계좌·SNS·현장 자료까지 폭넓게 살펴 사실관계를 확인합니다. 이를 통해 의뢰인도 모르는 본인에게 유리한 사실과 증거를 찾아냅니다.',
    image: {
      src: '/home/usp/usp02.png',
      alt: '수사 자료와 녹취 장비가 놓인 회의 테이블',
    },
  },
  {
    eyebrow: '강제수사 단계 대응',
    heading: '영장·체포·압수수색 단계에 직접 대응합니다',
    body: '영장 청구·체포·압수수색은 의뢰인의 자유와 일상에 가장 큰 영향을 주는 단계입니다. 창원지검과 부산지검 등에서 검사로 근무하며 강제수사 절차를 직접 다뤄 온 경험을 바탕으로, 요건과 한계를 정확히 검토합니다. 의뢰인의 권리를 보호할 수 있도록 필요한 대응을 진행합니다.',
    image: {
      src: '/backgrounds/interrogation-room-handcuffs.png',
      alt: '조사실 테이블 위 수갑',
    },
  },
  {
    eyebrow: '검사 시각의 전략',
    heading: '형사사건에 대한 깊은 이해를 바탕으로 전략을 세웁니다',
    body: '형사사건에서는 경찰·검사·판사가 각 단계에서 무엇을 확인하는지 알아야 합니다. 류남경 대표변호사는 창원과 부산의 수사 현장에서 검사로 사건을 처리해 왔습니다. 수사기관이 어떤 증거를 중시하고 어떤 진술을 확인하려는지 먼저 짚어, 사건 단계에 맞는 대응 방향을 세웁니다.',
    image: {
      src: '/home/usp/usp04.png',
      alt: '상담 중 문서를 함께 확인하는 장면',
    },
  },
]

export const UspSection: FC = () => {
  return (
    <SectionContainer
      id="usp"
      aria-label="류남경 변호사를 믿을 수 있는 이유"
      innerClassName="max-w-6xl"
    >
      <SectionHeader
        title={
          <>
            류남경 변호사를
            <br />
            믿을 수 있는 이유
          </>
        }
        lead="19년 검사 경력을 의뢰인의 편에서 사용합니다"
      />

      <ol className="mt-16 space-y-20 lg:mt-24 lg:space-y-32">
        {USP_ITEMS.map((item, idx) => {
          const isReversed = idx % 2 === 0

          return (
            <li
              key={item.heading}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16"
            >
              <div
                className={cn(
                  'lg:col-span-6',
                  isReversed && 'lg:col-start-7',
                )}
              >
                <div
                  className="relative aspect-[3/2] w-full overflow-hidden bg-muted"
                >
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority={idx === 0}
                  />
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
    </SectionContainer>
  )
}
