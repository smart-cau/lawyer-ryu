import type { Metadata } from 'next'

import { ServiceLeafPage } from '@/app/(frontend)/services/_components'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import { investigationLeafContent } from './_data'

const title = '창원·부산 경찰조사 변호사 | 구속영장 대응 류남경'
const description =
  '경찰 출석 요구를 받았거나 검찰 조사, 체포·구속영장 대응이 필요한 분을 위한 안내입니다. 법무법인 인유 창원사무소의 류남경 대표변호사가 창원·부산 사건을 직접 상담합니다.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/services/investigation',
  },
  openGraph: mergeOpenGraph({
    title,
    description,
    siteName: '법무법인 인유 창원사무소',
    url: '/services/investigation',
    images: ['/services/title-bars/investigation.png'],
  }),
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/services/title-bars/investigation.png'],
  },
}

export default function InvestigationLeafPage() {
  return <ServiceLeafPage content={investigationLeafContent} />
}
