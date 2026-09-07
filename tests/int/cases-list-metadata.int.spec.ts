import { generateMetadata } from '@/app/(frontend)/cases/page'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// 목록 메타는 분야 목록만 Payload에서 읽는다. 조회 결과를 고정해 DB 없이 결정적으로 검증한다.
const { findMock } = vi.hoisted(() => ({ findMock: vi.fn() }))

vi.mock('payload', () => ({
  getPayload: vi.fn(async () => ({ find: findMock })),
}))

vi.mock('@payload-config', () => ({ default: {} }))

const withSearchParams = (params: Record<string, string>) => ({
  searchParams: Promise.resolve(params),
})

describe('성공사례 목록 메타데이터', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_SERVER_URL', 'https://lawyer-ryu.test')
    findMock.mockResolvedValue({
      docs: [
        { id: 2, title: '성범죄', slug: 'sex-crime' },
        { id: 4, title: '재산범죄', slug: 'property-crime' },
      ],
    })
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.clearAllMocks()
  })

  it('필터가 없으면 기본 제목과 /cases canonical을 쓴다', async () => {
    const meta = await generateMetadata(withSearchParams({}))

    expect(meta.title).toBe('성공사례 | 법무법인 인유 창원분사무소')
    expect(meta.alternates?.canonical).toBe('/cases')
    expect(meta.robots).toBeUndefined()
  })

  it('분야 필터 URL마다 분야명이 들어간 고유한 제목·설명·canonical을 만든다', async () => {
    const meta = await generateMetadata(withSearchParams({ category: 'sex-crime' }))

    expect(meta.title).toBe('성범죄 성공사례 | 법무법인 인유 창원분사무소')
    expect(meta.description).toContain('성범죄 분야 성공사례')
    expect(meta.alternates?.canonical).toBe('/cases?category=sex-crime')
  })

  it('2페이지 이상은 제목·설명·canonical에 페이지 번호를 붙인다', async () => {
    const meta = await generateMetadata(withSearchParams({ category: 'property-crime', page: '2' }))

    expect(meta.title).toBe('재산범죄 성공사례 2페이지 | 법무법인 인유 창원분사무소')
    expect(meta.description).toContain('2페이지')
    expect(meta.alternates?.canonical).toBe('/cases?category=property-crime&page=2')
  })

  it('존재하지 않는 분야 slug는 기본 목록 메타로 돌아간다', async () => {
    const meta = await generateMetadata(withSearchParams({ category: 'unknown' }))

    expect(meta.title).toBe('성공사례 | 법무법인 인유 창원분사무소')
    expect(meta.alternates?.canonical).toBe('/cases')
  })

  it('검색어 결과 페이지는 색인에서 제외하고 /cases를 canonical로 둔다', async () => {
    const meta = await generateMetadata(withSearchParams({ q: '사기', category: 'sex-crime' }))

    expect(meta.robots).toEqual({ index: false, follow: true })
    expect(meta.alternates?.canonical).toBe('/cases?category=sex-crime')
  })
})
