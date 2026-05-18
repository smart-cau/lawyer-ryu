import { CareerSection, HeroSection, NarrativeSection } from './_components'

export default function LawyerAboutPage() {
  return (
    <>
      <HeroSection />
      <main id="main" className="overflow-visible">
        <NarrativeSection />
        <CareerSection />
      </main>
    </>
  )
}
