import type { ServiceLeafContent } from '@/app/(frontend)/services/_data/service-leaf'

import { FAQ_ITEMS } from './faq'
import { ANTI_CORRUPTION_SUBS } from './sub-categories'
import { ATTORNEY_PROFILE, WHY_ATTORNEY_ITEMS } from './why-attorney'

export const antiCorruptionLeafContent = {
  title: '반부패 범죄',
  route: '/services/anti-corruption',
  subCategories: {
    title: '사건 유형',
    lead: '반부패 사건은 형사 처분만이 아니라 당선무효, 징계, 자격 문제가 함께 걸리고, 조사기관에 한 답변이 그대로 수사 기록으로 이어집니다.',
    items: ANTI_CORRUPTION_SUBS,
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
    title: '공직 사건은 첫 답변부터 기록으로 남습니다',
    lead: '대표변호사 류남경이 사건 구조를 직접 검토합니다.',
    phoneHref: 'tel:01075520301',
    buttonLabel: '전화 상담',
  },
} satisfies ServiceLeafContent
