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
      <main className="container py-section space-y-section">
        <SubCategoriesSection />
        <WhyAttorneySection />
        <FaqSection />
        <FooterCtaSection />
      </main>
    </>
  )
}
