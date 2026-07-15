import { ServiceLeafPage } from '@/app/(frontend)/services/_components'

import { antiCorruptionLeafContent } from './_data'
import { createServiceMetadata } from '../_data/metadata'

const title = '창원·부산 반부패·선거범죄 변호사 | 류남경 대표변호사'
const description =
  '공직선거법, 뇌물·수뢰, 청탁금지법, 정치자금법과 직권남용 사건에서 형사책임과 징계·자격 문제를 함께 검토합니다. 류남경 대표변호사가 조사 초기부터 직접 상담합니다.'

export const metadata = createServiceMetadata({ slug: 'anti-corruption', title, description })

export default function AntiCorruptionLeafPage() {
  return <ServiceLeafPage content={antiCorruptionLeafContent} />
}
