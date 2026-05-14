import { Fragment, type FC } from 'react'

type StepItem = {
  kind: 'step'
  number: number
  title: string
  bullets: string[]
}

type PhaseItem = {
  kind: 'phase'
  badge: string
  label: string
}

type BranchItem = {
  kind: 'branch'
  label: string
}

type TimelineItem = StepItem | PhaseItem | BranchItem

const TIMELINE: TimelineItem[] = [
  { kind: 'phase', badge: '수사', label: '수사 단계' },
  {
    kind: 'step',
    number: 1,
    title: '대표 변호사 직접 상담',
    bullets: [
      '류남경 대표 변호사가 직접 상담 — 어시스턴트·소속 변호사 위임 없음',
      '의뢰인 상황에 맞춘 목표·전략 설정',
    ],
  },
  {
    kind: 'step',
    number: 2,
    title: '의뢰인 1차 조사',
    bullets: [
      '수사관 시점에서 직접 신문하듯 청취·질문 — 검사 19년 노하우',
      '의뢰인이 놓치고 있는 유리한 사실을 짚어냄',
    ],
  },
  {
    kind: 'step',
    number: 3,
    title: '유리한 사실·증거 발굴',
    bullets: [
      '참고인 조사까지 변호사가 직접 진행 — 참고인을 사무소로 불러 신문',
      '참고인의 휴대폰·계좌·디지털 증거 분석 (동의 범위 내)',
    ],
  },
  {
    kind: 'step',
    number: 4,
    title: '경찰·검찰 조사 시뮬레이션',
    bullets: [
      '검사 19년 노하우로 예상 신문 시뮬레이션',
      '답변 포인트·주의사항 사전 코칭',
    ],
  },
  {
    kind: 'step',
    number: 5,
    title: '경찰·검찰 조사 입회',
    bullets: ['변호사가 직접 조사 현장에 동석 — 수사관의 부당한 신문·유도 차단'],
  },
  {
    kind: 'step',
    number: 6,
    title: '법률의견서 작성·제출',
    bullets: [
      '사실 단위 증거 다발 + 유리한 판례를 묶은 통합 의견서',
      '사건 쟁점에 부합하는 판례를 직접 발굴 (검사 시절 법리 운용 노하우)',
    ],
  },
  { kind: 'branch', label: '수사단계에서 종결되는 경우' },
  { kind: 'phase', badge: '재판', label: '재판 단계' },
  {
    kind: 'step',
    number: 7,
    title: '재판 대비 추가 서면 작성',
    bullets: ['증거기록 복사 후 수사 단계 증거 보완', '양형 자료 추가 수집'],
  },
  {
    kind: 'step',
    number: 8,
    title: '재판 대비 시뮬레이션',
    bullets: [
      '검사 출신 관점의 법정 시뮬레이션 — 검사·판사의 예상 질문 점검',
      '의뢰인 증언 대비 코칭 (피고인 신문 대응)',
    ],
  },
  {
    kind: 'step',
    number: 9,
    title: '재판 당일 대표 변호사 함께 변론',
    bullets: [
      '재판 선고까지 류남경 대표 변호사 직접 변론',
      '공판 쟁점에 따른 실시간 대응 — 검사 출신 법리 운용 노하우',
    ],
  },
]

export const ProcessSection: FC = () => {
  return (
    <section
      id="process"
      aria-label="수임 사건 진행 9단계"
      className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-8"
    >
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-24">
          <p className="text-label-1 text-muted-foreground">M-05 · PROCESS</p>
          <h2 className="mt-3 text-title-1 font-semibold">수임하면, 이렇게 진행됩니다.</h2>
          <p className="mt-6 text-headline-1 font-medium text-muted-foreground">
            변호사가 직접 — 사실·증거·법리를 9단계로 — 사건을 풀어갑니다.
          </p>
        </div>
      </div>

      <div
        aria-label="9단계 프로세스 타임라인"
        className="grid grid-cols-[auto_1fr] gap-x-4 lg:col-span-6 lg:col-start-7 lg:gap-x-6"
      >
        {TIMELINE.map((item, idx) => {
          const isLast = idx === TIMELINE.length - 1
          return (
            <Fragment key={`${item.kind}-${idx}`}>
              <div className="flex flex-col items-center">
                {item.kind === 'step' && (
                  <div
                    aria-hidden
                    className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-deep text-sm font-medium text-brand-gold"
                  >
                    {String(item.number).padStart(2, '0')}
                  </div>
                )}
                {item.kind === 'phase' && (
                  <div
                    aria-hidden
                    className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background"
                  >
                    {item.badge}
                  </div>
                )}
                {!isLast && <div aria-hidden className="w-px flex-1 bg-border" />}
              </div>

              <div className={isLast ? '' : 'pb-10'}>
                {item.kind === 'phase' && (
                  <p className="pt-2 text-label-1 text-muted-foreground">
                    {item.label}
                  </p>
                )}
                {item.kind === 'step' && (
                  <>
                    <h3 className="text-heading-2 font-semibold">
                      <span className="sr-only">{`Step ${item.number}: `}</span>
                      {item.title}
                    </h3>
                    {item.bullets.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {item.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="text-body-1 text-muted-foreground"
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
                {item.kind === 'branch' && (
                  <div className="inline-flex rounded-full border border-dashed border-border bg-muted/40 px-4 py-2 text-label-1 text-muted-foreground">
                    {item.label}
                  </div>
                )}
              </div>
            </Fragment>
          )
        })}
      </div>
    </section>
  )
}
