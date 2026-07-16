import type { FC } from 'react'

import { SectionContainer } from '@/components/SectionContainer'

import type { ServiceLeafContent } from '../_data/service-leaf'

type ImmediateActionsSectionProps = {
  data: NonNullable<ServiceLeafContent['immediateActions']>
}

export const ImmediateActionsSection: FC<ImmediateActionsSectionProps> = ({ data }) => {
  return (
    <SectionContainer
      id="immediate-actions"
      aria-label={data.title}
      className="bg-[#f7f8f8]"
      innerClassName="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20"
    >
      <div>
        <header className="max-w-xl">
          <h2 className="text-title-1 text-balance font-semibold">{data.title}</h2>
          <p className="mt-5 max-w-lg break-keep text-headline-2 font-medium text-muted-foreground">
            {data.lead}
          </p>
        </header>

        {data.note ? (
          <aside className="mt-9 max-w-lg border-l-2 border-brand-gold pl-5" aria-label="유의사항">
            <p className="text-body-1 font-semibold tracking-[0.08em] text-foreground">유의사항</p>
            <p className="mt-2 break-keep text-body-2-reading text-muted-foreground">
              {data.note}
            </p>
          </aside>
        ) : null}
      </div>

      <ol className="border-y border-foreground/15">
        {data.items.map((item, index) => (
          <li
            key={item.heading}
            className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-b border-border py-6 last:border-b-0 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-6 sm:py-7"
          >
            <span
              className="pt-0.5 text-body-1 font-semibold tabular-nums tracking-[0.08em] text-primary"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="text-headline-1 font-semibold">{item.heading}</h3>
              <p className="mt-2 max-w-xl break-keep text-body-2-reading text-muted-foreground">
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </SectionContainer>
  )
}
