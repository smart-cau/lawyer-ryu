import type { Metadata } from 'next'

import { JsonLd } from '@/components/JsonLd'
import { NAVER_BLOG_URL } from '@/lib/contact-links'
import { CONTACT, OFFICE_LOCATION } from '@/lib/constants'
import { getServerSideURL } from '@/utilities/getURL'

import {
  CasesSection,
  ContactSection,
  HeroSection,
  InvestigationSection,
  ProcessSection,
  ServicesSection,
  UspSection,
} from './_components'

const title = '창원·부산 형사전문변호사 | 검사 출신 류남경'
const description =
  '창원·부산 형사사건을 상담하는 법무법인 인유 창원분사무소입니다. 19년 검사 경력의 류남경 대표변호사가 수사 초기부터 재판까지 직접 상담하고 변론합니다.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title,
    description,
    siteName: '법무법인 인유 창원분사무소',
    locale: 'ko_KR',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default function HomePage() {
  const siteUrl = getServerSideURL()
  const homeUrl = new URL('/', siteUrl).toString()
  const lawyerUrl = new URL('/about/lawyer', siteUrl).toString()
  const organizationId = `${homeUrl}#organization`
  const websiteId = `${homeUrl}#website`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: homeUrl,
        name: '법무법인 인유 창원분사무소',
        inLanguage: 'ko-KR',
        publisher: { '@id': organizationId },
      },
      {
        '@type': 'LegalService',
        '@id': organizationId,
        name: '법무법인 인유 창원분사무소',
        alternateName: CONTACT.firmName,
        description,
        url: homeUrl,
        logo: new URL('/brand/inyou-logo.png', siteUrl).toString(),
        image: new URL('/backgrounds/office-library-desk.png', siteUrl).toString(),
        telephone: CONTACT.office.replace(/^0/, '+82-'),
        email: CONTACT.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${CONTACT.address} ${CONTACT.addressSub}`,
          addressLocality: '창원시',
          addressRegion: '경상남도',
          addressCountry: 'KR',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: OFFICE_LOCATION.lat,
          longitude: OFFICE_LOCATION.lng,
        },
        areaServed: [
          { '@type': 'City', name: '창원시' },
          { '@type': 'City', name: '부산광역시' },
        ],
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '22:00',
        },
        sameAs: [NAVER_BLOG_URL],
        employee: { '@id': `${lawyerUrl}#person` },
      },
      {
        '@type': 'WebPage',
        '@id': `${homeUrl}#webpage`,
        url: homeUrl,
        name: title,
        description,
        inLanguage: 'ko-KR',
        isPartOf: { '@id': websiteId },
        about: { '@id': organizationId },
      },
    ],
  }

  return (
    <>
      <JsonLd id="home-structured-data" data={jsonLd} />
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
