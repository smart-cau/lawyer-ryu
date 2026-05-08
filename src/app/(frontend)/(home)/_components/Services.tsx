import type { FC } from 'react'

export const ServicesSection: FC = () => {
  return (
    <section
      id="services"
      aria-label="업무분야"
      className="border border-dashed border-border rounded-md p-8"
    >
      <p className="text-xs uppercase tracking-widest text-muted-foreground">M-04</p>
      <h2 className="mt-2 text-2xl font-semibold">업무분야</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        services IA 10 leaf 그리드 (형사 8 + 비형사 2). 모든 leaf 균질 노출
      </p>
    </section>
  )
}
