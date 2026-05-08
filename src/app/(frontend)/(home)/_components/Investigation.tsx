import type { FC } from 'react'

export const InvestigationSection: FC = () => {
  return (
    <section
      id="investigation"
      aria-label="시급성 후크 (Contact 브릿지)"
      className="border border-dashed border-border rounded-md p-8"
    >
      <p className="text-xs uppercase tracking-widest text-muted-foreground">M-06</p>
      <h2 className="mt-2 text-2xl font-semibold">시급성 후크 (Contact 브릿지)</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        USP-D 흡수 — &ldquo;지금 조사 앞두고 있다면&rdquo; 후크 + 1차 대응 가이드. &ldquo;조사·구속 대응&rdquo; leaf 연계는 추후 결정
      </p>
    </section>
  )
}
