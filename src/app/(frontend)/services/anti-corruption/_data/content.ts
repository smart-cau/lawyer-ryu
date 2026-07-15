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
    title: '공직선거법이나 뇌물 사건으로 조사를 앞두고 있다면 상담하세요',
    lead: '류남경 대표변호사가 사건 경위와 제출 자료를 확인해 직접 상담합니다.',
  },
} satisfies ServiceLeafContent
