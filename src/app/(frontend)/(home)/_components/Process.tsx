import type { FC } from 'react'

export const ProcessSection: FC = () => {
  return (
    <section
      id="process"
      aria-label="Process"
      className="border border-dashed border-border rounded-md p-8"
    >
      <p className="text-xs uppercase tracking-widest text-muted-foreground">M-05</p>
      <h2 className="mt-2 text-2xl font-semibold">Process</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        4단계: 의뢰인 1차 조사 → 유리한 사실·증거 발굴 → 증거 10건+ 제출 → 판례 제시. &ldquo;어떻게 진행되는가/행동&rdquo; 톤
      </p>
    </section>
  )
}
