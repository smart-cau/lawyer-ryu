import type { FC } from 'react'

export const HeroSection: FC = () => {
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="border border-dashed border-border rounded-md p-8"
    >
      <p className="text-xs uppercase tracking-widest text-muted-foreground">M-01</p>
      <h2 className="mt-2 text-2xl font-semibold">Hero</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        공식 헤드라인 + 보조 카피 + 핵심 자격(변협 등록 형사법 전문 / 19년 검사 / 부부장) + 대표변호사 사진. CTA 버튼·지역성 노출 형태는 v1에서 보류
      </p>
    </section>
  )
}
