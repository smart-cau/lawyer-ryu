import type { ServiceLeafContent } from '@/app/(frontend)/services/_data/service-leaf'

import { FAQ_ITEMS } from './faq'
import { SCHOOL_VIOLENCE_SUBS } from './sub-categories'
import { ATTORNEY_PROFILE, WHY_ATTORNEY_ITEMS } from './why-attorney'

export const schoolViolenceLeafContent = {
  title: '아동학대·학교폭력',
  route: '/services/school-violence',
  subCategories: {
    title: '사건 유형',
    lead: '수업이나 생활지도 중의 행위가 아동학대로 신고되면 교사는 수사와 학교·교육청 절차를 함께 겪을 수 있습니다. 초기 진술이 서로 어긋나지 않도록 지도 경위와 근거 자료를 먼저 정리해야 합니다.',
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
    title: '첫 진술서를 내기 전, 지도 경위와 자료부터 확인합니다',
    lead: '대표변호사 류남경이 직접 상담합니다.',
    phoneHref: 'tel:01075520301',
    buttonLabel: '전화 상담',
  },
} satisfies ServiceLeafContent
