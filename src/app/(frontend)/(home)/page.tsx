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
    <main className="container py-16 space-y-16">
      <HeroSection />
      <UspSection />
      <CasesSection />
      <ServicesSection />
      <ProcessSection />
      <InvestigationSection />
      <ContactSection />
    </main>
  )
}
