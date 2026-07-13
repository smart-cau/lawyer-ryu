import type { Metadata } from 'next'

import { ServiceLeafPage } from '@/app/(frontend)/services/_components'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import { corporateCrimeLeafContent } from './_data'

const title = '창원 기업범죄 변호사 | 19년 검사 경력 류남경'
const description =
  '중대산업재해, 횡령·배임, 기술유출·영업비밀, 조세·금융 규제 사건에서 회사와 대표·임원의 대응을 안내합니다. 창원지검과 부산지검 등에서 조세·금융·기술유출 사건을 담당한 류남경 대표변호사가 직접 상담합니다.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/services/corporate-crime',
  },
  openGraph: mergeOpenGraph({
    title,
    description,
    siteName: '법무법인 인유 창원사무소',
    url: '/services/corporate-crime',
    images: ['/services/title-bars/corporate-crime.png'],
  }),
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/services/title-bars/corporate-crime.png'],
  },
}

export default function CorporateCrimeLeafPage() {
  return <ServiceLeafPage content={corporateCrimeLeafContent} />
}
