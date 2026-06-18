import type { Metadata } from 'next'

import { ServiceLeafPage } from '@/app/(frontend)/services/_components'

import { trafficCrimeLeafContent } from './_data'

export const metadata: Metadata = {
  title: '음주운전·교통사고·뺑소니 변호사 | 법무법인 인유 창원사무소',
  description:
    '음주운전, 음주측정거부, 12대 중과실 교통사고, 뺑소니 사건의 형사 대응부터 운전면허 행정처분까지. 19년 검사 경력의 형사법 전문 변호사 류남경이 창원에서 직접 상담합니다.',
}

export default function TrafficCrimeLeafPage() {
  return <ServiceLeafPage content={trafficCrimeLeafContent} />
}
