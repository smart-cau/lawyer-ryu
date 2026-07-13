import { PageTitleBar } from '@/components/PageTitleBar'
import { MotionReveal } from '@/components/MotionReveal'
import { getBgImageFromRoute, getBreadcrumbsFromRoute } from '@/utilities/page-title-bar'

import type { ServiceLeafContent } from '../_data/service-leaf'
import { FaqSection } from './FaqSection'
import { FooterCtaSection } from './FooterCtaSection'
import { ImmediateActionsSection } from './ImmediateActionsSection'
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
        className="motion-entrance-fade"
      />
      <main className="bg-white">
        {content.immediateActions ? (
          <MotionReveal>
            <ImmediateActionsSection data={content.immediateActions} />
          </MotionReveal>
        ) : null}
        <MotionReveal>
          <SubCategoriesSection data={content.subCategories} />
        </MotionReveal>
        <MotionReveal direction="left">
          <WhyAttorneySection data={content.whyAttorney} serviceTitle={content.title} />
        </MotionReveal>
        <MotionReveal direction="right">
          <FaqSection data={content.faq} />
        </MotionReveal>
        <MotionReveal>
          <FooterCtaSection data={content.footerCta} />
        </MotionReveal>
      </main>
    </>
  )
}
