import type { Metadata } from 'next'

import { JsonLd } from '@/components/JsonLd'
import { NAVER_BLOG_URL } from '@/lib/contact-links'
import { CONTACT, GOOGLE_MAP_URL, NAVER_MAP_URL, OFFICE_LOCATION } from '@/lib/constants'
import { getServerSideURL } from '@/utilities/getURL'
import { BRAND_OPEN_GRAPH_IMAGE } from '@/utilities/mergeOpenGraph'

import {
  CasesSection,
  ContactSection,
  HeroSection,
  InvestigationSection,
  ProcessSection,
  ServicesSection,
  UspSection,
} from './_components'

const title = '창원 형사전문변호사 | 법무법인 인유 창원분사무소'
const description =
  '창원 검사 출신 변호사 류남경 대표변호사가 형사사건을 직접 상담하고 변론하는 법무법인 인유 창원분사무소입니다. 창원지검·부산지검 등 19년 검사 경력과 대한변협 등록 형사법 전문 자격을 바탕으로 수사 초기부터 재판까지 대응합니다.'

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
    images: [BRAND_OPEN_GRAPH_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [BRAND_OPEN_GRAPH_IMAGE.url],
  },
}

export default function HomePage() {
  const siteUrl = getServerSideURL()
  const homeUrl = new URL('/', siteUrl).toString()
  const lawyerUrl = new URL('/about/lawyer', siteUrl).toString()
  const organizationId = `${homeUrl}#organization`
  const websiteId = `${homeUrl}#website`
  const personId = `${lawyerUrl}#person`

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
        name: CONTACT.firmName,
        // Google Organization 가이드: alternateName은 name과 다른 통용 이름. 본사 이름으로 검색하는 경우를 받는다.
        alternateName: '법무법인 인유',
        description,
        url: homeUrl,
        // Google 로고 요건: 112px 이상. 헤더용 98px PNG 대신 favicon.svg를 512px로 렌더링한 파일을 쓴다.
        logo: new URL('/brand/inyou-logo-512.png', siteUrl).toString(),
        image: new URL('/backgrounds/office-library-desk.png', siteUrl).toString(),
        telephone: CONTACT.office.replace(/^0/, '+82-'),
        email: CONTACT.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${CONTACT.address} ${CONTACT.addressSub}`,
          addressLocality: '창원시',
          addressRegion: '경상남도',
          postalCode: '51542',
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
          // schema.org Time 예시와 Google 가이드 모두 hh:mm:ss 형식이다.
          opens: '09:00:00',
          closes: '22:00:00',
        },
        sameAs: [NAVER_BLOG_URL, NAVER_MAP_URL, GOOGLE_MAP_URL],
        employee: { '@id': personId },
      },
      {
        // 검색엔진은 다른 페이지에 정의된 @id를 따라가지 않으므로, employee가 가리키는 Person의
        // 최소 정의를 같은 문서에 둔다. 전체 정의는 /about/lawyer의 ProfilePage에 있다.
        '@type': 'Person',
        '@id': personId,
        name: CONTACT.representative,
        jobTitle: '대표변호사',
        url: lawyerUrl,
        worksFor: { '@id': organizationId },
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
