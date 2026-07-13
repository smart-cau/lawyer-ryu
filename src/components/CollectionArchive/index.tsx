import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'
import { MotionReveal } from '@/components/MotionReveal'

export type Props = {
  animate?: boolean
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { animate = false, posts } = props

  return (
    <div className={cn('container')}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            const card = <Card className="h-full" doc={result} relationTo="cases" showCategories />

            return animate ? (
              <MotionReveal key={index} delay={(index % 3) * 70}>
                {card}
              </MotionReveal>
            ) : (
              <React.Fragment key={index}>{card}</React.Fragment>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}
