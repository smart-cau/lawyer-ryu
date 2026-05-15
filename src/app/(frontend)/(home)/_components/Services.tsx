import Link from 'next/link'
import type { FC } from 'react'

import { CRIMINAL_LEAVES } from '@/app/(frontend)/services/_data/leaves'
import { SectionHeader } from '@/components/SectionHeader'
import { cn } from '@/utilities/ui'

export const ServicesSection: FC = () => {
  return (
    <section id="services" aria-label="업무분야" className="mx-auto max-w-5xl">
      <SectionHeader
        title="업무분야"
        lead="성폭력·기업·재산·교통·학교·반부패까지 — 형사 전 범위"
      />

      <ul className="mt-12 grid grid-cols-1 border-x border-t lg:mt-16 lg:grid-cols-2">
        {CRIMINAL_LEAVES.map((leaf, idx) => (
          <li
            key={leaf.slug}
            className={cn('border-b', idx % 2 === 0 && 'lg:border-r')}
          >
            <Link
              href={`/services/${leaf.slug}`}
              className="flex h-full flex-col p-6 transition-colors hover:bg-accent/30"
            >
              <h3 className="text-heading-2 font-semibold">{leaf.label}</h3>
              <p className="mt-2 text-body-1 text-muted-foreground">
                {leaf.description}
              </p>
              <ul className="mt-4 flex-1 space-y-1.5">
                {leaf.subs.map((sub) => (
                  <li
                    key={sub}
                    className="flex gap-2 text-label-1 text-muted-foreground"
                  >
                    <span aria-hidden>•</span>
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
              <span className="mt-6 text-label-1 font-medium">자세히 보기 →</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center lg:mt-12">
        <Link
          href="/services"
          className="text-body-1 font-medium underline-offset-4 hover:underline"
        >
          전체 업무분야 보기 →
        </Link>
      </div>
    </section>
  )
}
