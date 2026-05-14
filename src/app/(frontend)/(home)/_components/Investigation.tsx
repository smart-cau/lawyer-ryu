import Link from 'next/link'
import type { FC } from 'react'

const GUIDE_BULLETS = [
  '신문조서는 검찰·법원이 이후 가장 신뢰하는 1차 기록입니다.',
  '한 번 잘못 기재되면 이후 단계에서 뒤집기가 매우 어렵습니다.',
  '변호사가 진술 전 자문과 조사 현장 동석으로 진술을 보호합니다.',
]

export const InvestigationSection: FC = () => {
  return (
    <section
      id="investigation"
      aria-label="시급성 후크 — 첫 경찰 조사 대응"
      className="text-center"
    >
      <p className="text-label-1 text-muted-foreground">M-06 · 시급성</p>

      <h2 className="mx-auto mt-3 max-w-3xl text-title-1 font-semibold">
        경찰 조사를 앞두고 계신가요?
        <br />
        반드시 형사 전문 변호사와 동행하세요.
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-headline-1 font-medium text-muted-foreground">
        첫 조사 단계가 사건 전체 방향을 좌우합니다. 혼자 진술하지 말고, 사전 자문과 현장 동석으로 진술을 보호하세요.
      </p>

      <ul className="mx-auto mt-8 max-w-2xl space-y-3 text-body-1 text-muted-foreground">
        {GUIDE_BULLETS.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>

      <div className="mt-10">
        <Link
          href="/services/investigation"
          className="text-body-1 font-medium underline-offset-4 hover:underline"
        >
          조사·구속 대응 상세 보기 →
        </Link>
      </div>
    </section>
  )
}
