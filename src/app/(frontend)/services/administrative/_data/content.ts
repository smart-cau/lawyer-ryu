import type { ServiceLeafContent } from '@/app/(frontend)/services/_data/service-leaf'

import { ADMINISTRATIVE_SUBS } from './sub-categories'
import { FAQ_ITEMS } from './faq'
import { ATTORNEY_PROFILE, WHY_ATTORNEY_ITEMS } from './why-attorney'

export const administrativeLeafContent = {
  title: '행정',
  route: '/services/administrative',
  subCategories: {
    title: '사건 유형',
    lead: '운전면허 취소·정지, 공무원 징계, 영업정지와 인허가 처분은 통지를 받은 시점부터 확인할 기한과 절차가 다릅니다. 처분서에 적힌 사실과 법적 근거, 통지일, 제출했던 자료를 먼저 살펴 불복 방법과 집행정지 필요성을 구분합니다.',
    detailLabels: {
      keyIssues: '처분에서 확인할 쟁점',
      firstResponse: '지금 준비할 일',
      attorneyRole: '변호사가 하는 일',
    },
    items: ADMINISTRATIVE_SUBS,
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
    title: '처분 통지일과 불복기한부터 확인합니다',
    lead: '처분서와 사전통지서, 제출한 의견과 관련 기록을 준비해 현재 가능한 절차를 검토해 주세요.',
    buttonLabel: '전화 상담',
  },
} satisfies ServiceLeafContent
