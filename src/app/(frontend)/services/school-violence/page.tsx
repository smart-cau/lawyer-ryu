import type { Metadata } from 'next'

import { ServiceLeafPage } from '@/app/(frontend)/services/_components'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import { schoolViolenceLeafContent } from './_data'

const title = '창원 교사 아동학대 변호사 | 19년 검사 경력 류남경'
const description =
  '수업과 생활지도 과정에서 아동학대 신고를 받은 교사의 진술·자료 정리와 학교폭력 사안 대응을 안내합니다. 19년간 검사로 근무한 류남경 대표변호사가 직접 상담합니다.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/services/school-violence',
  },
  openGraph: mergeOpenGraph({
    title,
    description,
    siteName: '법무법인 인유 창원사무소',
    url: '/services/school-violence',
    images: ['/services/title-bars/school-violence.png'],
  }),
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/services/title-bars/school-violence.png'],
  },
}

export default function SchoolViolenceLeafPage() {
  return <ServiceLeafPage content={schoolViolenceLeafContent} />
}
