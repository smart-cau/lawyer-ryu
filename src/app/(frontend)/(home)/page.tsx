import {
  CasesSection,
  ContactSection,
  HeroSection,
  InvestigationSection,
  ProcessSection,
  ServicesSection,
  UspSection,
} from './_components'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <main className="container py-16 space-y-16">
        <UspSection />
        <CasesSection />
        <ServicesSection />
        <ProcessSection />
        <InvestigationSection />
        <ContactSection />
      </main>
    </>
  )
}
