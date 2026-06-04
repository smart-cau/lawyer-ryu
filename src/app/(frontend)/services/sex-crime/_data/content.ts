import type { ServiceLeafContent } from '@/app/(frontend)/services/_data/service-leaf'

import { FAQ_ITEMS } from './faq'
import { SEX_CRIME_SUBS } from './sub-categories'
import { ATTORNEY_PROFILE, WHY_ATTORNEY_ITEMS } from './why-attorney'

export const sexCrimeLeafContent = {
  title: '성범죄',
  route: '/services/sex-crime',
  subCategories: {
    title: '사건 유형',
    lead: '성범죄 사건은 죄명보다 접촉 경위, 동의 여부, 디지털 증거, 피해자와의 관계에 따라 대응 방향이 달라집니다.',
    items: SEX_CRIME_SUBS,
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
    title: '성범죄 수사, 혼자 대응하지 마세요',
    lead: '대표변호사 류남경이 직접 상담합니다.',
    phoneHref: 'tel:01075520301',
    buttonLabel: '전화 상담',
  },
} satisfies ServiceLeafContent
