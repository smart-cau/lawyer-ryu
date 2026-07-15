import { ServiceLeafPage } from '@/app/(frontend)/services/_components'

import { investigationLeafContent } from './_data'
import { createServiceMetadata } from '../_data/metadata'

const title = '창원·부산 경찰조사 변호사 | 구속영장 대응 류남경'
const description =
  '경찰 출석 요구를 받았거나 검찰 조사, 체포·구속영장 대응이 필요한 분을 위한 안내입니다. 법무법인 인유 창원분사무소의 류남경 대표변호사가 창원·부산 사건을 직접 상담합니다.'

export const metadata = createServiceMetadata({ slug: 'investigation', title, description })

export default function InvestigationLeafPage() {
  return <ServiceLeafPage content={investigationLeafContent} />
}
