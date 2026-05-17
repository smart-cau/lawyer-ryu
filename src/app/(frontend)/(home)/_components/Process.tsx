import type { FC } from 'react'

import { SectionHeader } from '@/components/SectionHeader'

type Stage = {
  title: string
  iconSrc: string
  iconAlt: string
  bullets: string[]
}

const STAGES: Stage[] = [
  {
    title: '상담 단계',
    iconSrc: '/trust/consultation.png',
    iconAlt: '상담 단계 아이콘',
    bullets: [
      '형사전문변호사와 대면·비대면 상담',
      '사건 검토 후 맞춤형 전략 수립',
      '사건 유형 기반 경력 다수 부장급 변호사 배정',
      '형사변호사 및 사안별 특수분야 전문가 TF 구성',
    ],
  },
  {
    title: '경찰조사 단계',
    iconSrc: '/trust/police-ci.svg',
    iconAlt: '경찰 CI',
    bullets: [
      '경찰조사 사전 시뮬레이션',
      '경찰조사 동행 및 입회',
      '조사 이후 수사기관 소통·대응',
      '쟁점별 의견서 및 증거 제출',
    ],
  },
  {
    title: '검찰조사 단계',
    iconSrc: '/trust/prosecution-ci.svg',
    iconAlt: '검찰 CI',
    bullets: [
      '사건 송치 시 검찰조사 동행·입회',
      '증거조사·디지털포렌식 증거분석',
      '법리적 논거 확립 및 의견 제출',
      '기소 시 공판 단계 대비 전략 수립',
    ],
  },
  {
    title: '재판 단계',
    iconSrc: '/trust/court-ci.svg',
    iconAlt: '법원 CI',
    bullets: [
      '구속 시 구속적부심, 보석 전략 수립',
      '수사단계 누락·미진한 내용 파악',
      '증거능력 확인·양형 요소 소명 등 재판 준비',
      '공판 변론 진행·상소심 등 검토',
    ],
  },
]

export const ProcessSection: FC = () => {
  return (
    <section id="process" aria-label="형사변호사의 단계별 조력 시스템">
      <SectionHeader
        title="형사변호사의 단계별 조력 시스템"
        lead="의뢰인이 바라는 결과를 받기까지, 형사전문변호사가 체계적인 밀착 대응을 약속합니다"
      />

      <div className="mt-12 rounded-2xl border border-border bg-card px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        {/* Mobile: vertical timeline (icon left, text right) */}
        <ol aria-label="단계별 조력 항목" className="md:hidden">
          {STAGES.map((stage, idx) => {
            const isLast = idx === STAGES.length - 1
            return (
              <li key={stage.title} className="grid grid-cols-[5rem_1fr] gap-x-5">
                <div className="flex flex-col items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={stage.iconSrc}
                    alt={stage.iconAlt}
                    width={80}
                    height={80}
                    className="h-20 w-20 object-contain"
                  />
                  <div
                    aria-hidden
                    className="relative mt-3 h-2.5 w-2.5 rounded-full bg-brand-deep"
                  />
                  {!isLast && (
                    <div aria-hidden className="mt-1 w-px flex-1 bg-border" />
                  )}
                </div>
                <div className={isLast ? 'pt-2' : 'pb-10 pt-2'}>
                  <h3 className="text-heading-2 font-bold">{stage.title}</h3>
                  <ul className="mt-4 space-y-2">
                    {stage.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-2 text-body-2 text-muted-foreground"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-muted-foreground"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            )
          })}
        </ol>

        {/* Desktop: horizontal timeline */}
        <ol
          aria-label="단계별 조력 항목"
          className="hidden md:grid md:grid-cols-4 md:gap-x-0"
        >
          {STAGES.map((stage, idx) => (
            <li key={stage.title} className="flex flex-col items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={stage.iconSrc}
                alt={stage.iconAlt}
                width={96}
                height={96}
                className="h-24 w-24 object-contain"
              />
              <div className="relative mt-6 h-2.5 w-full">
                {idx > 0 && (
                  <div
                    aria-hidden
                    className="absolute left-0 right-1/2 top-1/2 h-px -translate-y-1/2 bg-border"
                  />
                )}
                {idx < STAGES.length - 1 && (
                  <div
                    aria-hidden
                    className="absolute left-1/2 right-0 top-1/2 h-px -translate-y-1/2 bg-border"
                  />
                )}
                <div
                  aria-hidden
                  className="absolute left-1/2 top-1/2 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-deep"
                />
              </div>
              <h3 className="mt-5 text-heading-2 font-bold">{stage.title}</h3>
              <ul className="mt-5 space-y-2 self-stretch text-left md:px-3 lg:px-4">
                {stage.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2 text-body-2 text-muted-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-muted-foreground"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
