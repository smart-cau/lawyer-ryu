import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import { SectionContainer } from '@/components/SectionContainer'

import type { ServiceLeafContent } from '../_data/service-leaf'

type WhyAttorneySectionProps = {
  data: ServiceLeafContent['whyAttorney']
  serviceTitle: string
}

export const WhyAttorneySection: FC<WhyAttorneySectionProps> = ({ data, serviceTitle }) => {
  const title = (
    <>
      {serviceTitle} 변호,
      <br />
      류남경 변호사의 강점
    </>
  )

  return (
    <SectionContainer
      id="why-attorney"
      aria-labelledby="why-attorney-title"
      className="scroll-mt-24 overflow-hidden bg-[#f7f8f8]"
      innerClassName="space-y-12 lg:space-y-16"
      background={
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(116deg,transparent_0,transparent_34px,rgba(16,20,38,0.025)_35px,transparent_38px)]"
        />
      }
    >
      <header className="mx-auto max-w-3xl text-center">
        <h2 id="why-attorney-title" className="text-title-1 font-semibold md:text-display-3">
          {title}
        </h2>
      </header>

      <div className="relative mx-auto max-w-8xl overflow-hidden rounded-lg border border-border/70 bg-white shadow-[0_18px_55px_-42px_rgba(17,20,38,0.55)]">
        <ol className="relative divide-y divide-border/70 xl:pr-[29rem]">
          {data.items.map((item, idx) => (
            <li key={item.heading} className="px-6 py-9 md:px-10 md:py-10 lg:px-12 lg:py-11">
              <div className="max-w-2xl space-y-4">
                <p className="font-sans text-body-1 font-semibold uppercase tracking-[0.12em] text-brand-gold">
                  Strength {String(idx + 1).padStart(2, '0')}
                </p>
                <h3 className="text-heading-1 font-semibold md:text-title-3">{item.heading}</h3>
                <div className="space-y-3 break-keep text-body-1-reading text-muted-foreground [overflow-wrap:anywhere]">
                  {item.body.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[27rem] xl:block"
        >
          <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-white via-white/82 to-transparent" />
          <div className="absolute right-0 bottom-0 h-[88%] w-full">
            <Image
              src="/ryu-profile/2.webp"
              alt=""
              fill
              quality={90}
              sizes="(min-width: 1280px) 27rem, 22rem"
              className="origin-bottom-right scale-[1.22] object-contain object-right-bottom drop-shadow-[0_20px_35px_rgba(17,20,38,0.16)]"
              priority={false}
            />
          </div>
        </div>

        <div className="relative border-t border-border/70 px-6 py-5 md:px-10 lg:px-12 xl:pr-[29rem]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p className="text-heading-2 font-semibold">{data.profile.name}</p>
              <p className="text-label-1 text-muted-foreground">{data.profile.affiliation}</p>
            </div>
            <Link
              href={data.detailHref ?? '/about/lawyer'}
              className="inline-flex min-h-10 w-fit items-center rounded-sm text-body-1 font-medium underline-offset-4 transition-[color,transform] duration-200 hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring active:translate-y-px"
            >
              {data.detailLabel ?? '변호사 소개 자세히 보기 →'}
            </Link>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
