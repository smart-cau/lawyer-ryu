import type { ServiceLeafContent } from '@/app/(frontend)/services/_data/service-leaf'

import { FAQ_ITEMS } from './faq'
import { TRAFFIC_CRIME_SUBS } from './sub-categories'
import { ATTORNEY_PROFILE, WHY_ATTORNEY_ITEMS } from './why-attorney'

export const trafficCrimeLeafContent = {
  title: '음주운전·교통범죄',
  route: '/services/traffic-crime',
  subCategories: {
    title: '사건 유형',
    lead: '같은 교통 사건이라도 음주 수치와 측정 절차, 사고 경위와 피해 정도, 현장 조치 여부에 따라 적용 법률과 처벌 수위가 달라지고, 면허 행정처분이 함께 따라옵니다.',
    items: TRAFFIC_CRIME_SUBS,
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
    title: '음주운전·교통사고, 첫 조사 전에 상담하세요',
    lead: '대표변호사 류남경이 직접 상담합니다.',
    phoneHref: 'tel:01075520301',
    buttonLabel: '전화 상담',
  },
} satisfies ServiceLeafContent
