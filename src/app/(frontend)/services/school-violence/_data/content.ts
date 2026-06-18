import type { ServiceLeafContent } from '@/app/(frontend)/services/_data/service-leaf'

import { FAQ_ITEMS } from './faq'
import { SCHOOL_VIOLENCE_SUBS } from './sub-categories'
import { ATTORNEY_PROFILE, WHY_ATTORNEY_ITEMS } from './why-attorney'

export const schoolViolenceLeafContent = {
  title: '아동학대·학교폭력',
  route: '/services/school-violence',
  subCategories: {
    title: '사건 유형',
    lead: '아동학대·학교폭력 사건은 형사 수사와 학교·교육청 절차가 따로 진행되지만, 한쪽에 낸 진술과 자료가 다른 쪽 기록으로 이어집니다.',
    items: SCHOOL_VIOLENCE_SUBS,
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
    title: '첫 진술서를 내기 전에 방향을 정해야 합니다',
    lead: '대표변호사 류남경이 직접 상담합니다.',
    phoneHref: 'tel:01075520301',
    buttonLabel: '전화 상담',
  },
} satisfies ServiceLeafContent
