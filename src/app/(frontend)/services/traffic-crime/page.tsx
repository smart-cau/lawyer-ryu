import { ServiceLeafPage } from '@/app/(frontend)/services/_components'

import { trafficCrimeLeafContent } from './_data'
import { createServiceMetadata } from '../_data/metadata'

const title = '음주운전·교통사고·뺑소니 변호사 | 법무법인 인유 창원분사무소'
const description =
  '음주운전, 음주측정거부, 12대 중과실 교통사고, 뺑소니 사건의 형사 대응부터 운전면허 행정처분까지. 19년 검사 경력의 형사법 전문 변호사 류남경이 창원에서 직접 상담합니다.'

export const metadata = createServiceMetadata({ slug: 'traffic-crime', title, description })

export default function TrafficCrimeLeafPage() {
  return <ServiceLeafPage content={trafficCrimeLeafContent} />
}
