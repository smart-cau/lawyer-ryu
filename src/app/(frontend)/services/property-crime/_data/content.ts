import type { ServiceLeafContent } from '@/app/(frontend)/services/_data/service-leaf'

import { FAQ_ITEMS } from './faq'
import { PROPERTY_CRIME_SUBS } from './sub-categories'
import { ATTORNEY_PROFILE, WHY_ATTORNEY_ITEMS } from './why-attorney'

export const propertyCrimeLeafContent = {
  title: '재산범죄',
  route: '/services/property-crime',
  subCategories: {
    title: '사건 유형',
    lead: '투자사기와 금융사기 같은 재산범죄는 돈을 보내기 전 어떤 설명을 들었는지, 이후 자금이 어디로 이동했는지를 함께 살펴야 합니다. 피해를 입은 경우와 혐의를 받는 경우에 따라 준비할 자료도 달라집니다.',
    items: PROPERTY_CRIME_SUBS,
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
    title: '투자사기나 금융사기로 피해를 입었거나 조사를 앞두고 있다면 상담하세요',
    lead: '류남경 대표변호사가 피해 자료와 자금 흐름, 현재 조사 상황을 확인해 직접 상담합니다.',
  },
} satisfies ServiceLeafContent
