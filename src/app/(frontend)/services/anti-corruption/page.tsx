import { ServiceLeafPage } from '@/app/(frontend)/services/_components'

import { antiCorruptionLeafContent } from './_data'
import { createServiceMetadata } from '../_data/metadata'

const title = '창원 공직선거법·뇌물 사건 변호사 | 류남경'
const description =
  '공직선거법 위반과 뇌물·수뢰 사건을 중심으로 청탁금지법, 정치자금법, 직권남용 사건의 조사 대응을 안내합니다. 류남경 대표변호사가 답변과 제출 자료, 징계·자격 문제를 함께 검토합니다.'

export const metadata = createServiceMetadata({ slug: 'anti-corruption', title, description })

export default function AntiCorruptionLeafPage() {
  return <ServiceLeafPage content={antiCorruptionLeafContent} />
}
