import { ServiceLeafPage } from '@/app/(frontend)/services/_components'

import { schoolViolenceLeafContent } from './_data'
import { createServiceMetadata } from '../_data/metadata'

const title = '창원 교사 아동학대 변호사 | 19년 검사 경력 류남경'
const description =
  '수업과 생활지도 과정에서 아동학대 신고를 받은 교사의 진술·자료 정리와 학교폭력 사안 대응을 안내합니다. 19년간 검사로 근무한 류남경 대표변호사가 직접 상담합니다.'

export const metadata = createServiceMetadata({ slug: 'school-violence', title, description })

export default function SchoolViolenceLeafPage() {
  return <ServiceLeafPage content={schoolViolenceLeafContent} />
}
