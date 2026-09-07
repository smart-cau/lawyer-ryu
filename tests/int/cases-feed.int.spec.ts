import { GET as getCasesFeed } from '@/app/(frontend)/cases/feed.xml/route'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const { findMock } = vi.hoisted(() => ({ findMock: vi.fn() }))

vi.mock('payload', () => ({
  getPayload: vi.fn(async () => ({ find: findMock })),
}))

vi.mock('@payload-config', () => ({ default: {} }))

// unstable_cache는 Next 요청 컨텍스트 밖에서는 쓸 수 없다. 조회 함수를 그대로 실행한다.
vi.mock('next/cache', () => ({
  unstable_cache: (fn: (...args: unknown[]) => unknown) => fn,
}))

const setProductionEnvironment = () => {
  vi.stubEnv('NODE_ENV', 'production')
  vi.stubEnv('VERCEL_ENV', 'production')
  vi.stubEnv('VERCEL_TARGET_ENV', '')
  vi.stubEnv('VERCEL_PROJECT_PRODUCTION_URL', 'lawyer-ryu.test')
  vi.stubEnv('NEXT_PUBLIC_SERVER_URL', '')
}

const publishedCases = [
  {
    title: '사기죄 항소심 벌금형 감형 사례',
    slug: 'fraud-appeal-fine-reduction',
    publishedAt: '2026-08-20T09:00:00.000Z',
    createdAt: '2026-08-19T09:00:00.000Z',
    updatedAt: '2026-08-25T12:00:50.847Z',
    meta: { description: '피해금 전액 변제 & 가정 사정을 소명해 <벌금형>으로 감형된 사례입니다.' },
    categories: [{ id: 4, title: '재산범죄' }],
  },
  {
    title: '음주운전 재범 벌금 400만 원 선고 사례',
    slug: 'dui-repeat-offense-fine',
    publishedAt: null,
    createdAt: '2026-07-01T00:00:00.000Z',
    updatedAt: '2026-07-02T00:00:00.000Z',
    meta: { description: null },
    categories: [5],
  },
  { title: '슬러그 없는 글', slug: null, createdAt: '2026-07-01T00:00:00.000Z' },
]

describe('성공사례 RSS 피드', () => {
  beforeEach(() => {
    setProductionEnvironment()
    findMock.mockResolvedValue({ docs: publishedCases })
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.clearAllMocks()
  })

  it('게시된 사례만 조회하고 최신 글부터 최대 50건을 요청한다', async () => {
    await getCasesFeed()

    expect(findMock).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'cases',
        draft: false,
        limit: 50,
        sort: '-publishedAt',
        where: { _status: { equals: 'published' } },
      }),
    )
  })

  it('RSS 2.0 채널과 self 링크를 절대 URL로 내보낸다', async () => {
    const response = await getCasesFeed()
    const xml = await response.text()

    expect(response.headers.get('Content-Type')).toBe('application/rss+xml; charset=utf-8')
    expect(xml).toContain('<rss version="2.0"')
    expect(xml).toContain('<link>https://lawyer-ryu.test/cases</link>')
    expect(xml).toContain(
      '<atom:link href="https://lawyer-ryu.test/cases/feed.xml" rel="self" type="application/rss+xml"/>',
    )
    expect(xml).toContain('<lastBuildDate>Tue, 25 Aug 2026 12:00:50 GMT</lastBuildDate>')
  })

  it('항목에는 본문 대신 요약만 싣고 XML 특수문자를 이스케이프한다', async () => {
    const xml = await (await getCasesFeed()).text()

    expect(xml).toContain('<link>https://lawyer-ryu.test/cases/fraud-appeal-fine-reduction</link>')
    expect(xml).toContain(
      '<description>피해금 전액 변제 &amp; 가정 사정을 소명해 &lt;벌금형&gt;으로 감형된 사례입니다.</description>',
    )
    expect(xml).toContain('<pubDate>Thu, 20 Aug 2026 09:00:00 GMT</pubDate>')
    expect(xml).toContain('<category>재산범죄</category>')
  })

  it('publishedAt이 비어 있으면 createdAt을 쓰고, 요약이 없으면 description을 생략한다', async () => {
    const xml = await (await getCasesFeed()).text()
    const item = xml.slice(
      xml.indexOf('<item><title>음주운전'),
      xml.indexOf('</item>', xml.indexOf('<item><title>음주운전')),
    )

    expect(item).toContain('<pubDate>Wed, 01 Jul 2026 00:00:00 GMT</pubDate>')
    expect(item).not.toContain('<description>')
    expect(item).not.toContain('<category>')
  })

  it('slug가 없는 글은 피드에서 제외한다', async () => {
    const xml = await (await getCasesFeed()).text()

    expect(xml).not.toContain('슬러그 없는 글')
    expect(xml.match(/<item>/g)).toHaveLength(2)
  })

  it('Preview 배포처럼 공개 URL이 없으면 404를 돌려준다', async () => {
    vi.stubEnv('VERCEL_ENV', 'preview')

    const response = await getCasesFeed()

    expect(response.status).toBe(404)
    expect(findMock).not.toHaveBeenCalled()
  })
})
