import type { FC } from 'react'

export const CasesSection: FC = () => {
  return (
    <section
      id="cases"
      aria-label="대표 사례"
      className="border border-dashed border-border rounded-md p-8"
    >
      <p className="text-xs uppercase tracking-widest text-muted-foreground">M-03</p>
      <h2 className="mt-2 text-2xl font-semibold">대표 사례</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Cases 컬렉션 데이터. 시드 0건이면 섹션 hidden, 등록 후 자동 노출
      </p>
    </section>
  )
}
