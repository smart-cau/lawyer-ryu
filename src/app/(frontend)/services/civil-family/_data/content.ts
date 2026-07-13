import type { ServiceLeafContent } from '@/app/(frontend)/services/_data/service-leaf'

import { FAQ_ITEMS } from './faq'
import { CIVIL_FAMILY_SUBS } from './sub-categories'
import { ATTORNEY_PROFILE, WHY_ATTORNEY_ITEMS } from './why-attorney'

export const civilFamilyLeafContent = {
  title: '민사·가사',
  route: '/services/civil-family',
  subCategories: {
    title: '사건 유형',
    lead: '돈을 받지 못한 문제부터 부동산 계약, 이혼과 상속까지 민사·가사 분쟁은 확인해야 할 자료와 진행 절차가 서로 다릅니다. 계약서와 금전 기록, 재산 자료, 가족관계 자료를 살펴 현재 다툴 쟁점과 먼저 준비할 일을 구분합니다.',
    detailLabels: {
      keyIssues: '확인할 쟁점',
      firstResponse: '먼저 준비할 일',
      attorneyRole: '변호사가 하는 일',
    },
    items: CIVIL_FAMILY_SUBS,
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
    title: '계약서와 재산 자료에서 분쟁의 실마리를 확인합니다',
    lead: '현재 가지고 있는 문서와 상대방의 요구 내용을 바탕으로 청구 범위와 다음 절차를 검토합니다.',
    phoneHref: 'tel:01075520301',
    buttonLabel: '전화 상담',
  },
} satisfies ServiceLeafContent
