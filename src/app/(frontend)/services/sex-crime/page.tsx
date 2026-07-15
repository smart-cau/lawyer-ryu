import { ServiceLeafPage } from '@/app/(frontend)/services/_components'

import { sexCrimeLeafContent } from './_data'
import { createServiceMetadata } from '../_data/metadata'

const title = '창원·부산 성범죄 변호사 | 19년 검사 경력 류남경'
const description =
  '강제추행·강간·디지털 성범죄와 스토킹 사건에서 접촉 경위, 동의 여부, 디지털 증거를 중심으로 대응 방향을 안내합니다. 19년 검사 경력의 류남경 대표변호사가 직접 상담합니다.'

export const metadata = createServiceMetadata({ slug: 'sex-crime', title, description })

export default function SexCrimeLeafPage() {
  return <ServiceLeafPage content={sexCrimeLeafContent} />
}
