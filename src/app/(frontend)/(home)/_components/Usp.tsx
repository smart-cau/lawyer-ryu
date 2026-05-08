import type { FC } from 'react'

export const UspSection: FC = () => {
  return (
    <section
      id="usp"
      aria-label="USP — 왜 류남경 변호사인가"
      className="border border-dashed border-border rounded-md p-8"
    >
      <p className="text-xs uppercase tracking-widest text-muted-foreground">M-02</p>
      <h2 className="mt-2 text-2xl font-semibold">USP — 왜 류남경 변호사인가</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        USP-A 재판 전 종결 · USP-B 직접 수사 · USP-C 수사 흐름 예측 · USP-E 구성요건 한 점 — 4장 카드. &ldquo;왜 가능한가/원칙&rdquo; 톤
      </p>
    </section>
  )
}
