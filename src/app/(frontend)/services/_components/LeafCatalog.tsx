import Link from 'next/link'
import type { FC } from 'react'

import {
  CRIMINAL_LEAVES,
  NON_CRIMINAL_LEAVES,
  type Leaf,
} from '@/app/(frontend)/services/_data/leaves'
import { cn } from '@/utilities/ui'

const LeafCard: FC<{ leaf: Leaf }> = ({ leaf }) => (
  <Link
    href={`/services/${leaf.slug}`}
    className="flex h-full flex-col p-6 transition-colors hover:bg-accent/30"
  >
    <h3 className="text-h3">{leaf.label}</h3>
    <p className="mt-2 text-body text-muted-foreground">{leaf.description}</p>
    <ul className="mt-4 flex-1 space-y-1.5">
      {leaf.subs.map((sub) => (
        <li key={sub} className="flex gap-2 text-caption text-muted-foreground">
          <span aria-hidden>•</span>
          <span>{sub}</span>
        </li>
      ))}
    </ul>
    <span className="mt-6 text-caption font-medium">자세히 보기 →</span>
  </Link>
)

const LeafGrid: FC<{ leaves: Leaf[] }> = ({ leaves }) => (
  <ul className="grid grid-cols-1 border-x border-t lg:grid-cols-2">
    {leaves.map((leaf, idx) => (
      <li
        key={leaf.slug}
        className={cn('border-b', idx % 2 === 0 && 'lg:border-r')}
      >
        <LeafCard leaf={leaf} />
      </li>
    ))}
  </ul>
)

export const LeafCatalogSection: FC = () => {
  return (
    <section
      id="leaf-catalog"
      aria-label="업무분야 카탈로그"
      className="space-y-16"
    >
      <div className="space-y-6">
        <h2 className="text-h2">형사전문</h2>
        <LeafGrid leaves={CRIMINAL_LEAVES} />
      </div>

      <div className="space-y-6">
        <h2 className="text-h2">민사·가사·행정</h2>
        <LeafGrid leaves={NON_CRIMINAL_LEAVES} />
      </div>
    </section>
  )
}
