import type { FC } from 'react'

import { NARRATIVES } from '../_data/narratives'

export const NarrativeSection: FC = () => {
  return (
    <>
      {NARRATIVES.map((narrative) => {
        const titleId = `${narrative.id}-title`
        return (
          <section
            key={narrative.id}
            id={narrative.id}
            aria-labelledby={titleId}
            className="mx-auto max-w-3xl"
          >
            <p className="text-label-1 text-brand-gold">{narrative.overline}</p>

            <h2 id={titleId} className="mt-4 text-title-2 font-semibold">
              {narrative.title}
            </h2>

            <div className="mt-10 space-y-6 text-body-1-reading">
              {narrative.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>
        )
      })}
    </>
  )
}
