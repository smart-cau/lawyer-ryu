import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import { SectionContainer } from '@/components/SectionContainer'
import { SectionHeader } from '@/components/SectionHeader'

import type { ServiceLeafContent } from '../_data/service-leaf'

type WhyAttorneySectionProps = {
  data: ServiceLeafContent['whyAttorney']
}

export const WhyAttorneySection: FC<WhyAttorneySectionProps> = ({ data }) => {
  return (
    <SectionContainer
      id="why-attorney"
      aria-label={data.title}
      className="overflow-hidden bg-[#f7f8f8]"
      innerClassName="space-y-12"
      background={
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(116deg,transparent_0,transparent_34px,rgba(16,20,38,0.025)_35px,transparent_38px)]"
        />
      }
    >
      <SectionHeader title={data.title} />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-5 lg:col-span-4">
          <div className="aspect-[5/7] w-full overflow-hidden bg-muted">
            <Image
              src={data.profile.photo.src}
              alt={data.profile.photo.alt}
              width={data.profile.photo.width}
              height={data.profile.photo.height}
              quality={90}
              sizes="(min-width: 1024px) 22rem, (min-width: 640px) 28rem, 100vw"
              className="h-full w-full object-cover"
              priority={false}
            />
          </div>
          <div className="space-y-1">
            <h3 className="text-title-3 font-semibold">{data.profile.name}</h3>
            <p className="text-label-1 text-muted-foreground">
              {data.profile.affiliation}
            </p>
          </div>
        </div>

        <ol className="space-y-10 lg:col-span-8 lg:space-y-14">
          {data.items.map((item, idx) => (
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
          href={data.detailHref ?? '/about/lawyer'}
          className="text-body-1 font-medium underline-offset-4 hover:underline"
        >
          {data.detailLabel ?? '변호사 소개 자세히 보기 →'}
        </Link>
      </div>
    </SectionContainer>
  )
}
