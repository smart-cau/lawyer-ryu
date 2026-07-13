import type { Metadata } from 'next'

import { ServiceLeafPage } from '@/app/(frontend)/services/_components'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import { administrativeLeafContent } from './_data'

const title = '창원 행정심판·행정소송 변호사 | 류남경 변호사'
const description =
  '운전면허 취소·정지, 공무원 징계, 영업정지·인허가 처분에서 불복기한과 처분 사유, 제출 자료를 안내합니다. 법무법인 인유 창원사무소가 행정심판·행정소송 절차를 검토합니다.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/services/administrative',
  },
  openGraph: mergeOpenGraph({
    title,
    description,
    siteName: '법무법인 인유 창원사무소',
    url: '/services/administrative',
    images: ['/services/title-bars/administrative.png'],
  }),
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/services/title-bars/administrative.png'],
  },
}

export default function AdministrativeLeafPage() {
  return <ServiceLeafPage content={administrativeLeafContent} />
}
