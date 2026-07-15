import { ServiceLeafPage } from '@/app/(frontend)/services/_components'

import { civilFamilyLeafContent } from './_data'
import { createServiceMetadata } from '../_data/metadata'

const title = '창원 민사·가사 변호사 | 류남경 변호사'
const description =
  '손해배상·채권, 부동산·계약, 이혼·재산분할, 상속·후견 분쟁에서 확인할 자료와 진행 절차를 안내합니다. 법무법인 인유 창원분사무소가 사실관계와 청구 범위를 검토합니다.'

export const metadata = createServiceMetadata({ slug: 'civil-family', title, description })

export default function CivilFamilyLeafPage() {
  return <ServiceLeafPage content={civilFamilyLeafContent} />
}
