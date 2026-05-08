import type { FC } from 'react'

export const ContactSection: FC = () => {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="border border-dashed border-border rounded-md p-8"
    >
      <p className="text-xs uppercase tracking-widest text-muted-foreground">M-07</p>
      <h2 className="mt-2 text-2xl font-semibold">Contact</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        약도 + 영업시간 + 010-7552-0301. 폼 없음
      </p>
    </section>
  )
}
