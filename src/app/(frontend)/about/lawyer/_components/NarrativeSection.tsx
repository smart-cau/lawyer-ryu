import Image from 'next/image'
import type { FC } from 'react'

import { NARRATIVE_SECTION } from '../_data/narratives'

export const NarrativeSection: FC = () => {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative overflow-visible bg-[#f7f8f8] py-section text-foreground before:absolute before:inset-0 before:bg-[repeating-linear-gradient(116deg,transparent_0,transparent_34px,rgba(16,20,38,0.025)_35px,transparent_38px)] before:content-['']"
    >
      <div className="container relative z-10 lg:max-w-[calc(71.25rem+4rem)]">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.84fr)] md:items-end md:gap-x-16 md:gap-y-12 lg:gap-x-24">
          <div className="md:col-start-1 md:row-start-1 md:pb-2">
            <h2
              id="experience-title"
              className="text-display-2 before:mb-6 before:block before:h-1 before:w-20 before:bg-brand-gold before:content-['']"
            >
              {NARRATIVE_SECTION.title}
            </h2>
          </div>

          <div className="relative mx-auto aspect-[0.842] w-full max-w-[24rem] overflow-hidden md:col-start-2 md:row-span-2 md:row-start-1 md:max-w-none md:self-center">
            <Image
              src="/ryu-profile/4.png"
              alt="류남경 대표변호사"
              fill
              sizes="(min-width: 1024px) 30rem, (min-width: 768px) 38vw, 100vw"
              className="object-contain object-bottom"
            />
          </div>

          <div className="space-y-6 break-keep text-body-1-reading text-foreground/90 md:col-start-1 md:row-start-2 lg:text-headline-2">
            {NARRATIVE_SECTION.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
