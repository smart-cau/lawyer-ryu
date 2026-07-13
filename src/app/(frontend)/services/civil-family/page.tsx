import type { Metadata } from 'next'

import { ServiceLeafPage } from '@/app/(frontend)/services/_components'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import { civilFamilyLeafContent } from './_data'

const title = '창원 민사·가사 변호사 | 류남경 변호사'
const description =
  '손해배상·채권, 부동산·계약, 이혼·재산분할, 상속·후견 분쟁에서 확인할 자료와 진행 절차를 안내합니다. 법무법인 인유 창원사무소가 사실관계와 청구 범위를 검토합니다.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/services/civil-family',
  },
  openGraph: mergeOpenGraph({
    title,
    description,
    siteName: '법무법인 인유 창원사무소',
    url: '/services/civil-family',
    images: ['/services/title-bars/civil-family.png'],
  }),
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/services/title-bars/civil-family.png'],
  },
}

export default function CivilFamilyLeafPage() {
  return <ServiceLeafPage content={civilFamilyLeafContent} />
}
