import type { Metadata } from 'next'

import { JsonLd } from '@/components/JsonLd'
import { KOREAN_BAR_PROFILE_URL, NAVER_BLOG_URL } from '@/lib/contact-links'
import { CONTACT } from '@/lib/constants'
import { PAGE_UPDATED_AT } from '@/lib/page-updated-at'
import { getServerSideURL } from '@/utilities/getURL'
import { BRAND_OPEN_GRAPH_IMAGE, mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import { HeaderLightTone, HeroSection, MessageSection, NarrativeSection } from './_components'

const title = '창원 검사 출신 변호사 류남경 | 형사전문변호사'
const description =
  '창원 검사 출신 변호사 류남경 대표변호사입니다. 창원지검·부산지검 등에서 19년간 수사와 공판을 담당했으며, 대한변협 등록 형사법 전문 변호사로서 창원 형사사건을 직접 상담하고 변론합니다.'

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
        // Google ProfilePage 권장 속성. 사이트맵 lastmod와 같은 값을 쓴다.
        dateModified: PAGE_UPDATED_AT['/about/lawyer'],
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
        // 페이지 경력란에 보이는 자격만 적는다. 연도는 경력란의 표기를 따른다.
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            name: '대한변호사협회 등록 형사법 전문 변호사',
            credentialCategory: '전문분야 등록',
            recognizedBy: {
              '@type': 'Organization',
              name: '대한변호사협회',
              url: 'https://www.koreanbar.or.kr',
            },
            // 등록 사실을 확인할 수 있는 협회 프로필. 등록증 전용 페이지는 없다.
            url: KOREAN_BAR_PROFILE_URL,
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: '제44회 사법시험 합격',
            credentialCategory: '국가시험 합격',
            recognizedBy: { '@type': 'GovernmentOrganization', name: '법무부' },
            datePublished: '2002',
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: '사법연수원 제35기 수료',
            credentialCategory: '수료',
            recognizedBy: { '@type': 'EducationalOrganization', name: '사법연수원' },
            datePublished: '2006',
          },
        ],
        // 변호사 개인을 가리키는 외부 프로필. 사무소의 sameAs(블로그·지도)와 구분한다.
        sameAs: [KOREAN_BAR_PROFILE_URL, NAVER_BLOG_URL],
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
