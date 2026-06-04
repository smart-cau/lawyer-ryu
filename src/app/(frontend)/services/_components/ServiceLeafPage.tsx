import { PageTitleBar } from '@/components/PageTitleBar'
import {
  getBgImageFromRoute,
  getBreadcrumbsFromRoute,
} from '@/utilities/page-title-bar'

import type { ServiceLeafContent } from '../_data/service-leaf'
import { FaqSection } from './FaqSection'
import { FooterCtaSection } from './FooterCtaSection'
import { SubCategoriesSection } from './SubCategoriesSection'
import { WhyAttorneySection } from './WhyAttorneySection'

type ServiceLeafPageProps = {
  content: ServiceLeafContent
}

export function ServiceLeafPage({ content }: ServiceLeafPageProps) {
  return (
    <>
      <PageTitleBar
        title={content.title}
        breadcrumbs={getBreadcrumbsFromRoute(content.route, content.title)}
        bgImage={getBgImageFromRoute(content.route)}
      />
      <main className="bg-white">
        <SubCategoriesSection data={content.subCategories} />
        <WhyAttorneySection data={content.whyAttorney} />
        <FaqSection data={content.faq} />
        <FooterCtaSection data={content.footerCta} />
      </main>
    </>
  )
}
