import { ServiceLeafPage } from '@/app/(frontend)/services/_components'

import { propertyCrimeLeafContent } from './_data'
import { createServiceMetadata } from '../_data/metadata'

const title = '창원 투자사기·보이스피싱 변호사 | 19년 검사 경력 류남경'
const description =
  '투자사기·유사수신, 보이스피싱, 리딩방 사기의 피해 회복과 혐의 대응을 안내합니다. 창원지검과 부산지검 등에서 검사로 근무한 류남경 대표변호사가 직접 상담합니다.'

export const metadata = createServiceMetadata({ slug: 'property-crime', title, description })

export default function PropertyCrimeLeafPage() {
  return <ServiceLeafPage content={propertyCrimeLeafContent} />
}
