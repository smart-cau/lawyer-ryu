import type { ReactNode } from 'react'

import { PageTitleBar } from '@/components/PageTitleBar'
import {
  getBgImageFromRoute,
  getBreadcrumbsFromRoute,
} from '@/utilities/page-title-bar'

import {
  FaqSection,
  FooterCtaSection,
  SubCategoriesSection,
  WhyAttorneySection,
} from './_components'

type ServiceBandProps = {
  children: ReactNode
  patterned?: boolean
}

function ServiceBand({ children, patterned = false }: ServiceBandProps) {
  return (
    <div className="relative overflow-hidden border-t border-border/60 bg-white first:border-t-0">
      {patterned && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[#f7f8f8] bg-[repeating-linear-gradient(116deg,transparent_0,transparent_34px,rgba(16,20,38,0.025)_35px,transparent_38px)]"
        />
      )}
      <div className="container relative py-section">{children}</div>
    </div>
  )
}

export default function SexCrimeLeafPage() {
  const title = '성범죄'
  const route = '/services/sex-crime'

  return (
    <>
      <PageTitleBar
        title={title}
        breadcrumbs={getBreadcrumbsFromRoute(route, title)}
        bgImage={getBgImageFromRoute(route)}
      />
      <main className="bg-white">
        <ServiceBand>
          <SubCategoriesSection />
        </ServiceBand>
        <ServiceBand patterned>
          <WhyAttorneySection />
        </ServiceBand>
        <ServiceBand>
          <FaqSection />
        </ServiceBand>
        <ServiceBand patterned>
          <FooterCtaSection />
        </ServiceBand>
      </main>
    </>
  )
}
