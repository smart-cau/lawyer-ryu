import Link from 'next/link'
import type { FC } from 'react'

export const InvestigationSection: FC = () => {
  return (
    <section
      id="investigation"
      aria-label="시급성 후크 — 첫 경찰 조사 대응"
      className="text-center"
    >
      <h2 className="mx-auto mt-3 max-w-3xl text-title-1 font-semibold">
        경찰 조사를 앞두고 계신가요?
        <br />
        첫 진술 전, 형사 전문 변호사와 상의하세요.
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-headline-1 font-medium text-muted-foreground">
        첫 조사 단계가 사건 전체 방향을 좌우합니다. 혼자 진술하지 말고, 사전 자문과 현장 동석으로 진술을 보호하세요.
      </p>

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
