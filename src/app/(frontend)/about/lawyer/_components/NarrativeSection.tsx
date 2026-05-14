import type { FC } from 'react'

import type { Narrative } from '../_data/narratives'

export const NarrativeSection: FC<Narrative> = ({
  id,
  overline,
  title,
  paragraphs,
}) => {
  const titleId = `${id}-title`

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className="mx-auto max-w-3xl"
    >
      <p className="text-caption font-medium tracking-wide text-brand-gold">
        {overline}
      </p>

      <h2 id={titleId} className="mt-4 text-h2">
        {title}
      </h2>

      <div className="mt-10 space-y-6 text-body">
        {paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </section>
  )
}
