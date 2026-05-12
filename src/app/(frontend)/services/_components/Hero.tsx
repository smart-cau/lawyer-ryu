import type { FC } from 'react'

export const HeroSection: FC = () => {
  return (
    <section id="hero" aria-label="업무분야" className="text-center">
      <h1 className="text-h1">업무분야</h1>
      <p className="mt-6 text-body-lg text-muted-foreground">
        형사 전문을 중심으로, 의뢰인이 만나는 민사·가사·행정까지
      </p>
    </section>
  )
}
