import {
  HeaderLightTone,
  HeroSection,
  MessageSection,
  NarrativeSection,
} from './_components'

export default function LawyerAboutPage() {
  return (
    <>
      <HeaderLightTone />
      <HeroSection />
      <main id="main" className="overflow-visible">
        <NarrativeSection />
        <MessageSection />
      </main>
    </>
  )
}
