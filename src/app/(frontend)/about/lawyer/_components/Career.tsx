import type { FC } from 'react'

import {
  CAREER_ENTRIES,
  CAREER_HEAD_STATS,
  CAREER_QUALIFICATIONS,
} from '../_data/career'

const formatPeriod = (from: number, to?: number) =>
  to ? `${from}–${to}` : String(from)

export const CareerSection: FC = () => {
  return (
    <section
      id="career"
      aria-labelledby="career-title"
      className="mx-auto max-w-3xl"
    >
      <p className="text-caption font-medium tracking-wide text-brand-gold">
        검사 19년 경력
      </p>

      <h2 id="career-title" className="mt-4 text-h2">
        검찰청에서 무엇을 다뤘는가
      </h2>

      {/* 헤드 stats */}
      <dl className="mt-10 grid grid-cols-3 gap-4 border-y border-border py-6">
        {CAREER_HEAD_STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <dt className="text-caption text-muted-foreground">{stat.label}</dt>
            <dd className="mt-1 text-h2 font-semibold">{stat.value}</dd>
          </div>
        ))}
      </dl>

      {/* 시계열 표 */}
      <table className="mt-10 w-full text-body">
        <thead>
          <tr className="border-b border-border text-left text-caption text-muted-foreground">
            <th className="py-3 font-medium">연도</th>
            <th className="py-3 font-medium">소속</th>
            <th className="py-3 font-medium">담당 분야</th>
          </tr>
        </thead>
        <tbody>
          {CAREER_ENTRIES.map((entry) => (
            <tr
              key={`${entry.from}-${entry.office}`}
              className="border-b border-border/50 align-top"
            >
              <td className="py-4 pr-4 whitespace-nowrap">
                {formatPeriod(entry.from, entry.to)}
              </td>
              <td className="py-4 pr-4">{entry.office}</td>
              <td className="py-4 text-muted-foreground">
                {entry.fields ? entry.fields.join(' · ') : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 자격 (사시·연수원) */}
      <dl className="mt-6 space-y-2 text-caption text-muted-foreground">
        {CAREER_QUALIFICATIONS.map((q) => (
          <div key={q.year} className="flex gap-3">
            <dt className="font-medium text-foreground">{q.year}</dt>
            <dd>{q.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
