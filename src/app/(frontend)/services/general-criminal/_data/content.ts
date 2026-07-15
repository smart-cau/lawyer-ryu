import type { ServiceLeafContent } from '@/app/(frontend)/services/_data/service-leaf'

import { FAQ_ITEMS } from './faq'
import { GENERAL_CRIMINAL_SUBS } from './sub-categories'
import { ATTORNEY_PROFILE, WHY_ATTORNEY_ITEMS } from './why-attorney'

export const generalCriminalLeafContent = {
  title: '일반 형사',
  route: '/services/general-criminal',
  subCategories: {
    title: '사건 유형',
    lead:
      '명예훼손이나 폭행처럼 일상에서 시작된 분쟁도 고소장이 접수되면 형사절차로 이어집니다. 경찰 연락을 받았다면 사건 유형에 맞춰 사실관계와 자료부터 정리해야 합니다.',
    items: GENERAL_CRIMINAL_SUBS,
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
    title: '조사 날짜가 잡혔다면 그 전에 준비해야 합니다',
    lead: '류남경 대표변호사가 사건 경위와 조사 일정을 직접 듣고 상담합니다.',
    buttonLabel: '전화 상담',
  },
} satisfies ServiceLeafContent
