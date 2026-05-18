import {
  CasesSection,
  ContactSection,
  HeroSection,
  InvestigationSection,
  ProcessSection,
  ServicesSection,
  UspSection,
} from './_components'

import type { ReactNode } from 'react'

type HomeBandProps = {
  children: ReactNode
  patterned?: boolean
}

function HomeBand({ children, patterned = false }: HomeBandProps) {
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

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <main className="bg-white">
        <HomeBand>
          <UspSection />
        </HomeBand>
        <HomeBand patterned>
          <CasesSection />
        </HomeBand>
        <HomeBand>
          <ServicesSection />
        </HomeBand>
        <HomeBand patterned>
          <ProcessSection />
        </HomeBand>
        <InvestigationSection />
        <HomeBand>
          <ContactSection />
        </HomeBand>
      </main>
    </>
  )
}
