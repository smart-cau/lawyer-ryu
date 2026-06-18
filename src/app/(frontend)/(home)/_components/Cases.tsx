import Link from 'next/link'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Card } from '@/components/Card'
import { SectionContainer } from '@/components/SectionContainer'
import { SectionHeader } from '@/components/SectionHeader'

// 홈에 노출할 대표 사례 개수
const HOME_CASE_LIMIT = 3

export const CasesSection = async () => {
  const payload = await getPayload({ config: configPromise })

  // cases/page.tsx 와 동일한 fetch 로직 — overrideAccess:false 로 게시된 사례만 노출
  const cases = await payload.find({
    collection: 'cases',
    depth: 1,
    limit: HOME_CASE_LIMIT,
    overrideAccess: false,
    sort: '-publishedAt',
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
      result: true,
      resultCustom: true,
    },
  })

  if (cases.docs.length === 0) return null

  return (
    <SectionContainer
      id="cases"
      aria-label="대표 사례"
      backgroundImage="url('/texture-bg.jpg')"
      className="isolate overflow-hidden bg-[#071525] text-white"
      innerClassName="max-w-5xl"
      background={
        <>
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#071525]/80 to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#071525]/70 to-transparent"
          />
        </>
      }
    >
      <div className="[&_h2]:text-white [&_p]:text-white/72">
        <SectionHeader
          title="대표 사례"
          lead="의뢰인들의 억울함을 해결해드린 사례입니다."
        />
      </div>

      {/* CollectionArchive 와 동일한 Card 렌더 — SectionContainer 가 이미 container 라 grid 만 인라인 */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
        {cases.docs.map((result, index) => (
          <Card key={index} className="h-full" doc={result} relationTo="cases" showCategories />
        ))}
      </div>

      <div className="mt-10 text-center lg:mt-12">
        <Link
          href="/cases"
          className="text-body-1 font-medium text-white underline-offset-4 hover:underline"
        >
          전체 사례 보기 →
        </Link>
      </div>
    </SectionContainer>
  )
}
