import type { FC } from 'react'

import { SectionContainer } from '@/components/SectionContainer'

import {
  CAREER_ENTRIES,
  CAREER_QUALIFICATIONS,
} from '../_data/career'

const formatPeriod = (from: number, to?: number) => (to ? `${from}~${to}` : String(from))

export const CareerSection: FC = () => {
  return (
    <SectionContainer
      id="career"
      aria-labelledby="career-title"
      className="scroll-mt-24 border-t border-border/70 bg-[#f7f8f8] text-foreground"
    >
      <div className="grid gap-8 pb-10">
        <div>
          <h2 id="career-title" className="mt-4 break-keep text-display-2">
            주요 경력
          </h2>
        </div>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(12rem,0.28fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <h3 className="text-title-3">검사 경력</h3>
        </div>

        <ol className="divide-y divide-border border-y border-border">
          {CAREER_ENTRIES.map((entry) => (
            <li
              key={`${entry.from}-${entry.office}`}
              className="grid gap-3 py-5 md:grid-cols-[8.5rem_minmax(0,1fr)] md:gap-8"
            >
              <time className="text-headline-2 tabular-nums">
                {formatPeriod(entry.from, entry.to)}
              </time>
              <div>
                <p className="break-keep text-headline-1">{entry.office}</p>
                {entry.fields && (
                  <p className="mt-2 break-keep text-body-2-reading text-muted-foreground">
                    {entry.fields.join(' · ')}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(12rem,0.28fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <h3 className="text-title-3">학력 및 자격</h3>
        </div>

        <div className="grid gap-8 border-y border-border py-6 md:grid-cols-2">
          <div>
            <p className="text-label-2">자격</p>
            <dl className="mt-4 space-y-3">
              {CAREER_QUALIFICATIONS.map((q) => (
                <div key={q.text} className="grid grid-cols-[5rem_1fr] gap-4">
                  <dt className="text-body-1 tabular-nums">{q.year}</dt>
                  <dd className="break-keep text-body-1 text-muted-foreground">
                    {q.text}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
