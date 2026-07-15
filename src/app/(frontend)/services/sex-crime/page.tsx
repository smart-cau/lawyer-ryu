import { ServiceLeafPage } from '@/app/(frontend)/services/_components'

import { sexCrimeLeafContent } from './_data'
import { createServiceMetadata } from '../_data/metadata'

const title = '창원 성범죄 변호사 | 19년 검사 경력 류남경'
const description =
  '강제추행, 준강간, 통매음 등 성범죄 사건에서 접촉 경위와 동의 여부, 대화와 영상 등 증거를 어떻게 정리할지 안내합니다. 19년 검사 경력의 류남경 대표변호사가 직접 상담합니다.'

export const metadata = createServiceMetadata({ slug: 'sex-crime', title, description })

export default function SexCrimeLeafPage() {
  return <ServiceLeafPage content={sexCrimeLeafContent} />
}
