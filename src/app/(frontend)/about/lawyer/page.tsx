import type { Metadata } from 'next'

import { JsonLd } from '@/components/JsonLd'
import { NAVER_BLOG_URL } from '@/lib/contact-links'
import { CONTACT } from '@/lib/constants'
import { getServerSideURL } from '@/utilities/getURL'
import { BRAND_OPEN_GRAPH_IMAGE, mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import { HeaderLightTone, HeroSection, MessageSection, NarrativeSection } from './_components'

const title = '류남경 변호사 소개 | 창원·부산 19년 검사 출신 형사전문변호사'
const description =
  '창원지검·부산지검 등에서 19년간 검사로 수사와 공판을 담당한 류남경 대표변호사입니다. 대한변협 등록 형사법 전문 변호사로서 창원·부산 형사사건을 직접 상담하고 변론합니다.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/about/lawyer',
  },
  openGraph: mergeOpenGraph({
    type: 'profile',
    title,
    description,
    siteName: '법무법인 인유 창원분사무소',
    locale: 'ko_KR',
    url: '/about/lawyer',
  }),
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [BRAND_OPEN_GRAPH_IMAGE.url],
  },
}

export default function LawyerAboutPage() {
  const siteUrl = getServerSideURL()
  const homeUrl = new URL('/', siteUrl).toString()
  const lawyerUrl = new URL('/about/lawyer', siteUrl).toString()
  const personId = `${lawyerUrl}#person`
  const organizationId = `${homeUrl}#organization`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${lawyerUrl}#webpage`,
        url: lawyerUrl,
        name: title,
        description,
        inLanguage: 'ko-KR',
        mainEntity: { '@id': personId },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: '류남경',
        jobTitle: '대표변호사',
        description:
          '창원지검·부산지검 등에서 19년간 근무한 검사 출신 대한변협 등록 형사법 전문 변호사',
        url: lawyerUrl,
        image: new URL('/ryu-profile/1.webp', siteUrl).toString(),
        telephone: CONTACT.office.replace(/^0/, '+82-'),
        email: CONTACT.email,
        worksFor: { '@id': organizationId },
        knowsAbout: ['형사법', '경찰·검찰 수사 대응', '재산범죄', '성범죄', '기업범죄', '금융범죄'],
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: '대한변호사협회 등록 형사법 전문 변호사',
        },
        sameAs: [NAVER_BLOG_URL],
      },
      {
        '@type': 'LegalService',
        '@id': organizationId,
        name: '법무법인 인유 창원분사무소',
        url: homeUrl,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: '홈',
            item: homeUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: '변호사 소개',
            item: lawyerUrl,
          },
        ],
      },
    ],
  }

  return (
    <>
      <JsonLd id="lawyer-profile-structured-data" data={jsonLd} />
      <HeaderLightTone />
      <HeroSection />
      <main id="main" className="overflow-visible">
        <NarrativeSection />
        <MessageSection />
      </main>
    </>
  )
}
