import type { ServiceLeafContent } from '@/app/(frontend)/services/_data/service-leaf'
import { PHONE_HREF } from '@/lib/contact-links'

import { FAQ_ITEMS } from './faq'
import { INVESTIGATION_SUBS } from './sub-categories'
import { ATTORNEY_PROFILE, WHY_ATTORNEY_ITEMS } from './why-attorney'

export const investigationLeafContent = {
  title: '조사·구속 대응',
  route: '/services/investigation',
  immediateActions: {
    title: '수사기관의 연락을 받았다면 먼저 확인할 사항',
    lead: '갑작스러운 연락을 받으면 기억나는 대로 설명하기 쉽습니다. 통화할 때는 사건 정보를 묻고, 출석 전에는 사실관계와 자료를 차분히 살펴야 합니다.',
    items: [
      {
        heading: '연락한 기관 확인',
        body: '경찰서나 검찰청의 부서, 담당자 이름과 연락처를 적어 둡니다.',
      },
      {
        heading: '사건 정보 확인',
        body: '사건번호와 죄명, 피의자·참고인 중 어떤 신분으로 출석하는지 확인합니다.',
      },
      {
        heading: '조사 일정 확인',
        body: '출석 일시와 장소를 확인하고 준비 시간이 부족하면 담당자와 일정 조정 가능 여부를 상의합니다.',
      },
      {
        heading: '자료 원본 보존',
        body: '메신저 대화와 통화 기록, 계좌 내역, 사진·영상 등 관련 자료를 삭제하거나 편집하지 않습니다.',
      },
      {
        heading: '경위를 시간순으로 기록',
        body: '기억에 의존한 내용과 자료로 확인되는 사실을 나눠 적고, 불분명한 부분은 억지로 채우지 않습니다.',
      },
    ],
    note: '진술거부권 행사나 자료 제출 범위는 사건마다 판단이 달라질 수 있습니다. 일률적으로 답변을 거부하거나 모든 자료를 제출하기보다 자신의 신분과 조사 범위를 먼저 확인해야 합니다.',
  },
  subCategories: {
    title: '현재 단계에 맞는 대응',
    lead: '경찰 조사와 검찰 조사, 체포·구속영장 단계는 준비할 내용과 대응 시간이 다릅니다. 현재 절차를 확인한 뒤 진술, 자료 제출, 변호인 참여가 필요한 지점을 나눠 살펴야 합니다.',
    detailLabels: {
      commonSituations: '이런 상황이라면',
      keyIssues: '확인할 쟁점',
      firstResponse: '지금 준비할 사항',
      attorneyRole: '변호사가 하는 일',
    },
    items: INVESTIGATION_SUBS,
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
    title: '조사 일정이 정해졌다면 출석 전에 준비해야 합니다',
    lead: '류남경 대표변호사가 창원·부산 사건의 조사 단계와 준비 자료를 직접 살펴봅니다.',
    phoneHref: PHONE_HREF,
    buttonLabel: '전화 상담',
  },
} satisfies ServiceLeafContent
