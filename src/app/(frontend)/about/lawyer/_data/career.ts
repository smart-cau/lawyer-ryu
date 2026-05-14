export type CareerEntry = {
  from: number
  to?: number
  office: string
  fields?: readonly string[]
}

// 최근 → 과거 역순. 출처: docs/01-profile/career-timeline.md
// 2013–2014 공백 기간은 wireframe 단계에서 일단 생략 (IA 보류)
export const CAREER_ENTRIES: readonly CareerEntry[] = [
  {
    from: 2023,
    to: 2024,
    office: '대구지방검찰청',
    fields: ['조세', '공정거래', '명예훼손', '다중피해범죄'],
  },
  {
    from: 2022,
    to: 2023,
    office: '부산지방검찰청',
    fields: ['기술유출', '전세사기', '명예훼손', '다중피해범죄', '지적재산권'],
  },
  {
    from: 2021,
    to: 2022,
    office: '부산지방검찰청 서부지청',
    fields: ['기술유출', '서민생활침해', '명예훼손', '지적재산권'],
  },
  {
    from: 2019,
    to: 2021,
    office: '창원지방검찰청',
    fields: [
      '성폭력 합의부 공판',
      '조세',
      '관세',
      '금융',
      '기술유출',
      '다중피해범죄',
      '국민참여재판',
    ],
  },
  {
    from: 2017,
    to: 2019,
    office: '부산지방검찰청 서부지청',
    fields: [
      '성폭력',
      '가정폭력',
      '아동·청소년보호',
      '금융',
      '조세',
      '기술유출',
      '영장',
    ],
  },
  {
    from: 2015,
    to: 2017,
    office: '부산지방검찰청',
    fields: [
      '성폭력 합의부 공판',
      '국민참여재판',
      '조세',
      '금융',
      '다중피해범죄',
      '영장',
    ],
  },
  { from: 2012, office: '전주지방검찰청' },
  {
    from: 2010,
    to: 2012,
    office: '창원지방검찰청',
    fields: ['성폭력', '아동·청소년보호', '조세', '보험'],
  },
  { from: 2008, office: '순천지청' },
  { from: 2006, office: '광주지방검찰청' },
] as const

// 표 밑 별도 1행
export const CAREER_QUALIFICATIONS = [
  { year: 2006, text: '사법연수원 35기 수료' },
  { year: 2002, text: '사법시험 제44회 합격' },
] as const
