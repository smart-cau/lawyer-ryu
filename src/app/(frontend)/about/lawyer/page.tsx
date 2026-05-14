import { CareerSection, HeroSection, NarrativeSection } from './_components'
import { NARRATIVES } from './_data/narratives'

export default function LawyerAboutPage() {
  return (
    <>
      <HeroSection />
      <main className="container py-section space-y-section">
        {NARRATIVES.map((narrative) => (
          <NarrativeSection key={narrative.id} {...narrative} />
        ))}
        <CareerSection />
      </main>
    </>
  )
}
