import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import {
  ATTORNEY_PROFILE,
  WHY_ATTORNEY_ITEMS,
} from '@/app/(frontend)/services/sex-crime/_data/why-attorney'
import { SectionHeader } from '@/components/SectionHeader'

export const WhyAttorneySection: FC = () => {
  return (
    <section
      id="why-attorney"
      aria-label="변호사 소개"
      className="space-y-12"
    >
      <SectionHeader title="변호사 소개" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-5 lg:col-span-4">
          <div className="aspect-[5/7] w-full overflow-hidden bg-muted">
            <Image
              src={ATTORNEY_PROFILE.photo.src}
              alt={ATTORNEY_PROFILE.photo.alt}
              width={ATTORNEY_PROFILE.photo.width}
              height={ATTORNEY_PROFILE.photo.height}
              className="h-full w-full object-cover"
              priority={false}
            />
          </div>
          <div className="space-y-1">
            <h3 className="text-title-3 font-semibold">{ATTORNEY_PROFILE.name}</h3>
            <p className="text-label-1 text-muted-foreground">
              {ATTORNEY_PROFILE.affiliation}
            </p>
          </div>
        </div>

        <ol className="space-y-10 lg:col-span-8 lg:space-y-14">
          {WHY_ATTORNEY_ITEMS.map((item, idx) => (
            <li key={item.heading} className="flex gap-5 lg:gap-6">
              <span
                aria-hidden="true"
                className="shrink-0 text-3xl font-light text-muted-foreground lg:text-4xl"
              >
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="space-y-3">
                <h4 className="text-heading-2 font-semibold">{item.heading}</h4>
                <div className="space-y-4 text-body-1 text-muted-foreground">
                  {item.body.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="text-center">
        <Link
          href="/about/lawyer"
          className="text-body-1 font-medium underline-offset-4 hover:underline"
        >
          변호사 소개 자세히 보기 →
        </Link>
      </div>
    </section>
  )
}
