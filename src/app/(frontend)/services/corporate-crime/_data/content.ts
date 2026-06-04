import type { ServiceLeafContent } from '@/app/(frontend)/services/_data/service-leaf'

import { FAQ_ITEMS } from './faq'
import { CORPORATE_CRIME_SUBS } from './sub-categories'
import { ATTORNEY_PROFILE, WHY_ATTORNEY_ITEMS } from './why-attorney'

export const corporateCrimeLeafContent = {
  title: '기업 관련 범죄',
  route: '/services/corporate-crime',
  subCategories: {
    title: '사건 유형',
    lead: '기업 형사 사건은 대표 개인의 책임과 회사의 자료 제출, 행정기관 대응, 임직원 조사가 동시에 움직입니다.',
    items: CORPORATE_CRIME_SUBS,
  },
  whyAttorney: {
    title: '변호사 소개',
    profile: ATTORNEY_PROFILE,
    items: WHY_ATTORNEY_ITEMS,
    detailHref: '/about/lawyer',
    detailLabel: '변호사 소개 자세히 보기 →',
  },
  faq: {
    title: '자주 묻는 질문',
    items: FAQ_ITEMS,
  },
  footerCta: {
    title: '회사와 임원의 대응 방향을 함께 정리해야 합니다',
    lead: '대표변호사 류남경이 사건 구조를 직접 검토합니다.',
    phoneHref: 'tel:01075520301',
    buttonLabel: '전화 상담',
  },
} satisfies ServiceLeafContent
