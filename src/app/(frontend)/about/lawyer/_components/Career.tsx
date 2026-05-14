import type { FC } from 'react'

import {
  CAREER_ENTRIES,
  CAREER_QUALIFICATIONS,
} from '../_data/career'
import { SectionHeader } from '@/components/SectionHeader'

const formatPeriod = (from: number, to?: number) =>
  to ? `${from}–${to}` : String(from)

export const CareerSection: FC = () => {
  return (
    <section
      id="career"
      aria-labelledby="career-title"
      className="mx-auto max-w-3xl"
    >
      <SectionHeader title="주요 경력" />

      <div className="mt-12 space-y-12">
        {/* 자격 */}
        <div>
          <p className="text-label-1 text-brand-gold">자격</p>
          <dl className="mt-4 space-y-3 text-body-1">
            {CAREER_QUALIFICATIONS.map((q) => (
              <div key={q.year} className="flex gap-6">
                <dt className="w-24 shrink-0 font-medium tabular-nums">
                  {q.year}
                </dt>
                <dd>{q.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 검사 경력 */}
        <div>
          <p className="text-label-1 text-brand-gold">검사 경력</p>
          <dl className="mt-4 space-y-3 text-body-1">
            {CAREER_ENTRIES.map((entry) => (
              <div
                key={`${entry.from}-${entry.office}`}
                className="flex gap-6"
              >
                <dt className="w-24 shrink-0 font-medium tabular-nums">
                  {formatPeriod(entry.from, entry.to)}
                </dt>
                <dd>{entry.office}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
