import { CareerSection, HeroSection, NarrativeSection } from './_components'

export default function LawyerAboutPage() {
  return (
    <>
      <HeroSection />
      <main className="container py-section space-y-section">
        <NarrativeSection />
        <CareerSection />
      </main>
    </>
  )
}
