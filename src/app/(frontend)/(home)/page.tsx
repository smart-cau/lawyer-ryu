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
      <main className="bg-white">
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
