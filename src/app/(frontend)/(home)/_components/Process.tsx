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
    title: '상담·사건 파악 단계',
    iconSrc: '/trust/consultation.png',
    iconAlt: '상담 단계 아이콘',
    bullets: [
      '류남경 대표변호사 직접 상담',
      '사건 경위와 조사 일정 확인',
      '의뢰인 진술과 확보 자료 검토',
      '수사 단계별 대응 방향 안내',
    ],
  },
  {
    title: '경찰 조사 단계',
    iconSrc: '/trust/police-ci.svg',
    iconAlt: '경찰 CI',
    bullets: [
      '예상 신문 사항과 답변 방향 정리',
      '조사 출석 전 진술 내용 점검',
      '경찰 조사 동행 및 변호인 참여',
      '조사 후 조서와 추가 자료 검토',
    ],
  },
  {
    title: '검찰 단계',
    iconSrc: '/trust/prosecution-ci.svg',
    iconAlt: '검찰 CI',
    bullets: [
      '송치 후 기록과 보완수사 쟁점 검토',
      '혐의와 증거관계에 대한 의견서 제출',
      '검찰 처분 전 의견 진술 방향 검토',
      '기소 가능성에 대비한 공판 쟁점 정리',
    ],
  },
  {
    title: '재판 단계',
    iconSrc: '/trust/court-ci.svg',
    iconAlt: '법원 CI',
    bullets: [
      '증거기록 검토와 추가 서면 준비',
      '피고인 신문·증인신문 대비',
      '양형자료와 정상관계 자료 정리',
      '공판 출석·변론 및 상소 여부 검토',
    ],
  },
]

export const ProcessSection: FC = () => {
  return (
    <section id="process" aria-label="류남경 변호사의 단계별 조력">
      <SectionHeader
        title="류남경 변호사의 단계별 조력"
        lead="의뢰인의 권익을 보호하기 위해, 형사전문 변호사가 체계적인 전문지원을 제공합니다."
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
