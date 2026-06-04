import type { ServiceLeafContent } from '@/app/(frontend)/services/_data/service-leaf'

import { FAQ_ITEMS } from './faq'
import { PROPERTY_CRIME_SUBS } from './sub-categories'
import { ATTORNEY_PROFILE, WHY_ATTORNEY_ITEMS } from './why-attorney'

export const propertyCrimeLeafContent = {
  title: '재산범죄',
  route: '/services/property-crime',
  subCategories: {
    title: '사건 유형',
    lead: '재산범죄는 돈이 오간 경위, 당시 설명, 계좌 흐름, 피해 회복 가능성에 따라 고소와 방어의 방향이 달라집니다.',
    items: PROPERTY_CRIME_SUBS,
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
    title: '돈이 오간 기록부터 사건의 방향을 정리해야 합니다',
    lead: '대표변호사 류남경이 사건 구조를 직접 검토합니다.',
    phoneHref: 'tel:01075520301',
    buttonLabel: '전화 상담',
  },
} satisfies ServiceLeafContent
