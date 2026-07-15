import type { ServiceLeafContent } from '@/app/(frontend)/services/_data/service-leaf'

import { FAQ_ITEMS } from './faq'
import { CORPORATE_CRIME_SUBS } from './sub-categories'
import { ATTORNEY_PROFILE, WHY_ATTORNEY_ITEMS } from './why-attorney'

export const corporateCrimeLeafContent = {
  title: '기업 관련 범죄',
  route: '/services/corporate-crime',
  subCategories: {
    title: '사건 유형',
    lead: '기관의 연락이나 사고 발생 직후부터 회사의 자료 제출과 임직원 진술이 기록됩니다. 법인과 대표·임원의 책임 범위를 나누고, 행정조사와 형사절차를 함께 살펴야 합니다.',
    items: CORPORATE_CRIME_SUBS,
  },
  whyAttorney: {
    title: '변호사 소개',
    profile: ATTORNEY_PROFILE,
    items: WHY_ATTORNEY_ITEMS,
    detailHref: '/about/lawyer',
    detailLabel: '류남경 대표변호사 경력 확인하기 →',
  },
  faq: {
    title: '자주 묻는 질문',
    items: FAQ_ITEMS,
  },
  footerCta: {
    title: '회사나 임원이 조사기관의 자료 제출을 요청받았다면 상담하세요',
    lead: '류남경 대표변호사가 연락 내용과 제출 기한, 보유 자료를 살펴 직접 상담합니다.',
  },
} satisfies ServiceLeafContent
