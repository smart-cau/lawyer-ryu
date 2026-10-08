import { JsonLd } from '@/components/JsonLd'
import { PageTitleBar } from '@/components/PageTitleBar'
import { MotionReveal } from '@/components/MotionReveal'
import { CONTACT } from '@/lib/constants'
import { getServerSideURL } from '@/utilities/getURL'
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
  const siteUrl = getServerSideURL()
  const homeUrl = new URL('/', siteUrl).toString()
  const pageUrl = new URL(content.route, siteUrl).toString()
  const organizationId = `${homeUrl}#organization`

  // 사무소(LegalService)가 제공하는 하나의 업무분야. provider·serviceType은 schema.org에서
  // Service 계열에만 쓰는 속성이라 노드를 Service로 두고, 사무소는 홈의 @id로 가리킨다.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: content.title,
        serviceType: content.title,
        url: pageUrl,
        provider: { '@id': organizationId },
        areaServed: [
          { '@type': 'City', name: '창원시' },
          { '@type': 'City', name: '부산광역시' },
        ],
      },
      {
        '@type': 'LegalService',
        '@id': organizationId,
        name: CONTACT.firmName,
        url: homeUrl,
      },
    ],
  }

  return (
    <>
      <JsonLd id="service-leaf-structured-data" data={jsonLd} />
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
