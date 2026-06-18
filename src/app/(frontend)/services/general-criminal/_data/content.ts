import type { ServiceLeafContent } from '@/app/(frontend)/services/_data/service-leaf'

import { FAQ_ITEMS } from './faq'
import { GENERAL_CRIMINAL_SUBS } from './sub-categories'
import { ATTORNEY_PROFILE, WHY_ATTORNEY_ITEMS } from './why-attorney'

export const generalCriminalLeafContent = {
  title: '일반 형사',
  route: '/services/general-criminal',
  subCategories: {
    title: '사건 유형',
    lead: '죄명은 달라도 고소·신고 접수, 경찰 조사, 송치 여부 결정으로 이어지는 절차는 같습니다. 유형별로 쟁점과 첫 대응이 다릅니다.',
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
    lead: '대표변호사 류남경이 직접 상담합니다.',
    phoneHref: 'tel:01075520301',
    buttonLabel: '전화 상담',
  },
} satisfies ServiceLeafContent
