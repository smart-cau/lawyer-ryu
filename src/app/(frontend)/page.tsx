import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

const sections: { id: string; label: string; title: string; note: string }[] = [
  {
    id: 'hero',
    label: 'F-01',
    title: 'Hero',
    note: '공식 헤드라인 + 대표변호사 사진 + 전화 상담 CTA',
  },
  {
    id: 'about',
    label: 'F-02',
    title: 'About 요약',
    note: '검사 19년·부부장 출신 핵심 카드 + 프로필 상세(P-01)로 연결',
  },
  {
    id: 'practice',
    label: 'F-03',
    title: '전문분야 카드',
    note: 'S-01·S-02·S-03·S-05·S-08·S-09 6장 카드 → 각 허브 페이지로 연결',
  },
  {
    id: 'trust',
    label: 'F-04',
    title: '신뢰지표 / Why us',
    note: '19년·사법시험 44회·연수원 35기·검찰수사관 출신 팀',
  },
  {
    id: 'cases',
    label: 'F-05',
    title: '대표 성공사례',
    note: 'M-01에서 가장 최근/대표 사례 3~4건',
  },
  {
    id: 'process',
    label: 'F-06',
    title: '상담 절차',
    note: '"수사기관을 대신하여 억울함을 풀어드립니다" 워크플로',
  },
  {
    id: 'contact',
    label: 'F-07',
    title: '상담 CTA / 약도 / 푸터',
    note: '010-7552-0301 · 창원 사무소 주소 · 영업시간 (폼 없음)',
  },
]

export default function HomePage() {
  return (
    <main className="container py-16 space-y-16">
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          aria-label={section.title}
          className="border border-dashed border-border rounded-md p-8"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{section.label}</p>
          <h2 className="mt-2 text-2xl font-semibold">{section.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{section.note}</p>
        </section>
      ))}
    </main>
  )
}

export const metadata: Metadata = {
  title: '법무법인 인유 창원사무소 | 대표변호사 류남경',
  description:
    '검사 19년 부부장 출신 류남경 변호사. 형사·기업·민사 전 분야 자문 및 변론. 창원 성산구 위치.',
  openGraph: mergeOpenGraph({
    title: '법무법인 인유 창원사무소 | 대표변호사 류남경',
    description:
      '검사 19년 부부장 출신 류남경 변호사. 형사·기업·민사 전 분야 자문 및 변론. 창원 성산구 위치.',
  }),
}
