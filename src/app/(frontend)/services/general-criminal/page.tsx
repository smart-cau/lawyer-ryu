import { ServiceLeafPage } from '@/app/(frontend)/services/_components'

import { generalCriminalLeafContent } from './_data'
import { createServiceMetadata } from '../_data/metadata'

const title = '창원/부산 형사전문 변호사 | 19년 검사 경력 류남경'
const description =
  '명예훼손·모욕, 폭행·상해, 무고, 사이버 범죄로 고소되었거나 경찰 조사를 앞둔 분을 위해 증거 보존과 진술 준비를 안내합니다. 19년 검사 경력의 류남경 대표변호사가 창원과 부산 사건을 직접 상담합니다.'

export const metadata = createServiceMetadata({ slug: 'general-criminal', title, description })

export default function GeneralCriminalLeafPage() {
  return <ServiceLeafPage content={generalCriminalLeafContent} />
}
