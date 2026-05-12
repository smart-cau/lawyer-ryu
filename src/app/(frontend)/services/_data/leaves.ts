export type Leaf = {
  slug: string
  label: string
  description: string
  subs: string[]
}

export const CRIMINAL_LEAVES: Leaf[] = [
  {
    slug: 'sex-crime',
    label: '성범죄',
    description:
      '성폭력·디지털 성범죄·청소년 성범죄까지 — 성폭력전담 합의부 공판 경력 다수.',
    subs: [
      '강제추행·일반 성범죄',
      '강간·강력 성폭력',
      '디지털 성범죄',
      '청소년 성범죄(아청법)',
      '스토킹·데이트폭력',
      '전문직·공직 성범죄',
      '성범죄 피해자 보호',
    ],
  },
  {
    slug: 'corporate-crime',
    label: '기업 관련 범죄',
    description: '법인 대표·임원의 사기·횡령·기술유출 등 기업 관련 형사.',
    subs: ['중대산업재해', '기업 사기·금융 범죄', '지적재산권·기술유출', '규제·행정 형사'],
  },
  {
    slug: 'property-crime',
    label: '재산범죄',
    description: '개인 의뢰인의 투자사기·금융사기·횡령·배임 등 재산 형사.',
    subs: [
      '투자사기·유사수신',
      '금융사기',
      '가상화폐·리딩방 사기',
      '건축·분양 사기',
      '횡령·배임·절도',
    ],
  },
  {
    slug: 'traffic-crime',
    label: '음주운전·교통범죄',
    description: '음주운전·교통사고·뺑소니 — 형사처벌과 면허 행정처분 동시 대응.',
    subs: ['음주운전', '교통사고', '뺑소니'],
  },
  {
    slug: 'school-violence',
    label: '아동학대·학교폭력',
    description: '교사·학부모·학생 의뢰인의 학교 관련 형사.',
    subs: ['아동학대', '학교폭력'],
  },
  {
    slug: 'general-criminal',
    label: '일반 형사',
    description: '명예훼손·폭행·사기·정보통신망법 등 일반 형사 사건 전 범위.',
    subs: [
      '명예훼손·모욕',
      '폭행·상해',
      '사문서·공문서·위증·무고',
      '사이버·개인정보',
      '성매매·사행성·대부업',
      '업무방해·권리행사방해',
      '피해자 고소·피해구제',
      '전문직 직역법 위반',
    ],
  },
  {
    slug: 'anti-corruption',
    label: '반부패 범죄',
    description: '정치인·공직자의 선거법·뇌물·청탁금지법 형사.',
    subs: [
      '공직선거법 위반',
      '뇌물·수뢰',
      '청탁금지법(김영란법)',
      '정치자금법',
      '직권남용·직무유기',
    ],
  },
  {
    slug: 'investigation',
    label: '조사·구속 대응',
    description: '경찰·검찰 조사 및 체포·구속영장 단계 대응.',
    subs: ['경찰 조사 대응', '검찰 조사 대응', '체포·구속영장 대응'],
  },
]

export const NON_CRIMINAL_LEAVES: Leaf[] = [
  {
    slug: 'civil-family',
    label: '민사·가사',
    description: '비형사 분쟁 — 손해배상·부동산·이혼·상속 등 개인·가족 사건.',
    subs: [
      '민사 — 손해배상·채권',
      '민사 — 부동산·계약',
      '가사 — 이혼·재산분할',
      '가사 — 상속·후견',
    ],
  },
  {
    slug: 'administrative',
    label: '행정',
    description: '형사와 연동되는 행정처분 — 면허·징계·영업.',
    subs: ['운전면허 행정처분', '공무원 징계', '영업·인허가 행정처분'],
  },
]
