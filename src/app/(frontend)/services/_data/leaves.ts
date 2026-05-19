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
      '동의 여부, 디지털 증거, 관계의 특수성이 수사 쟁점이 되는 성범죄 사건.',
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
    description: '회사 운영 과정에서 대표·임원 책임으로 번질 수 있는 형사 리스크.',
    subs: ['중대산업재해', '기업 사기·금융 범죄', '지적재산권·기술유출', '규제·행정 형사'],
  },
  {
    slug: 'property-crime',
    label: '재산범죄',
    description: '투자·금융·거래 과정에서 발생한 피해 회복과 혐의 방어가 필요한 사건.',
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
    description:
      '사고 경위, 음주 수치, 현장 조치가 형사처벌과 행정처분에 함께 영향을 주는 사건.',
    subs: ['음주운전', '교통사고', '뺑소니'],
  },
  {
    slug: 'school-violence',
    label: '아동학대·학교폭력',
    description: '교사·학부모·학생의 진술과 학교 절차가 함께 문제 되는 사건.',
    subs: ['아동학대', '학교폭력'],
  },
  {
    slug: 'general-criminal',
    label: '일반 형사',
    description: '일상 분쟁이 고소·수사로 이어진 폭행, 명예훼손, 문서·사이버 사건.',
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
    description:
      '공직·선거·직무 관련 행위가 형사책임과 신분상 불이익으로 이어질 수 있는 사건.',
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
    description:
      '경찰·검찰 조사, 체포, 구속영장 단계에서 진술과 자료 제출을 정리해야 하는 절차 대응.',
    subs: ['경찰 조사 대응', '검찰 조사 대응', '체포·구속영장 대응'],
  },
]

export const NON_CRIMINAL_LEAVES: Leaf[] = [
  {
    slug: 'civil-family',
    label: '민사·가사',
    description: '손해배상, 부동산, 이혼, 상속처럼 생활관계의 권리관계를 정리하는 분쟁.',
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
    description: '형사사건과 맞물린 면허, 징계, 영업정지 등 행정처분 대응.',
    subs: ['운전면허 행정처분', '공무원 징계', '영업·인허가 행정처분'],
  },
]
