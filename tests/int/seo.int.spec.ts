import robots from '@/app/robots'
import sitemap from '@/app/sitemap'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// sitemap은 `/cases`의 lastmod만 Payload에서 읽는다. 테스트를 DB에서 떼어내
// 결정적으로 유지하기 위해 조회 결과를 고정한다.
const { findMock } = vi.hoisted(() => ({ findMock: vi.fn() }))

vi.mock('payload', () => ({
  getPayload: vi.fn(async () => ({ find: findMock })),
}))

vi.mock('@payload-config', () => ({ default: {} }))

const LATEST_CASE_UPDATED_AT = '2026-08-25T12:00:50.847Z'

const setEnvironment = ({
  nodeEnv,
  vercelEnv = '',
  productionURL = '',
  serverURL = '',
}: {
  nodeEnv: 'development' | 'production'
  vercelEnv?: string
  productionURL?: string
  serverURL?: string
}) => {
  vi.stubEnv('NODE_ENV', nodeEnv)
  vi.stubEnv('VERCEL_ENV', vercelEnv)
  vi.stubEnv('VERCEL_TARGET_ENV', '')
  vi.stubEnv('VERCEL_PROJECT_PRODUCTION_URL', productionURL)
  vi.stubEnv('NEXT_PUBLIC_SERVER_URL', serverURL)
}

describe('검색엔진 노출 정책', () => {
  beforeEach(() => {
    findMock.mockResolvedValue({ docs: [{ updatedAt: LATEST_CASE_UPDATED_AT }] })
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.clearAllMocks()
  })

  it('운영 배포에서는 공개 경로와 두 사이트맵을 안내한다', async () => {
    setEnvironment({
      nodeEnv: 'production',
      productionURL: 'lawyer-ryu.test',
      serverURL: 'http://localhost:3000',
      vercelEnv: 'production',
    })

    expect(robots()).toEqual({
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/next/preview', '/next/exit-preview', '/search'],
      },
      sitemap: [
        'https://lawyer-ryu.test/sitemap.xml',
        'https://lawyer-ryu.test/cases-sitemap.xml',
      ],
      host: 'https://lawyer-ryu.test',
    })

    const entries = await sitemap()

    expect(entries).toHaveLength(14)
    expect(entries[0]?.url).toBe('https://lawyer-ryu.test/')
    expect(entries.some(({ url }) => url.includes('example.com'))).toBe(false)
  })

  it('Preview 배포에서는 전체 크롤링을 차단하고 사이트맵을 비운다', async () => {
    setEnvironment({
      nodeEnv: 'production',
      productionURL: 'lawyer-ryu.test',
      vercelEnv: 'preview',
    })

    expect(robots()).toEqual({
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    })
    expect(await sitemap()).toEqual([])
  })

  it('운영 URL이 없으면 전체 크롤링을 차단하고 사이트맵을 비운다', async () => {
    setEnvironment({ nodeEnv: 'production', vercelEnv: 'production' })

    expect(robots()).toEqual({
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    })
    expect(await sitemap()).toEqual([])
  })

  describe('사이트맵 lastmod', () => {
    beforeEach(() => {
      setEnvironment({
        nodeEnv: 'production',
        productionURL: 'lawyer-ryu.test',
        vercelEnv: 'production',
      })
    })

    it('모든 URL에 lastmod를 넣는다', async () => {
      const entries = await sitemap()

      expect(entries.filter(({ lastModified }) => !lastModified)).toEqual([])
    })

    it('정적 페이지는 배포 시각이 아니라 고정된 콘텐츠 변경일을 쓴다', async () => {
      const first = await sitemap()
      const second = await sitemap()

      const lastModifiedOf = (entries: Awaited<ReturnType<typeof sitemap>>, path: string) =>
        entries.find(({ url }) => url === `https://lawyer-ryu.test${path}`)?.lastModified

      // 호출할 때마다 달라지면 `new Date()`가 섞여 들어간 것이다.
      expect(lastModifiedOf(first, '/')).toBe(lastModifiedOf(second, '/'))
      expect(lastModifiedOf(first, '/services/sex-crime')).toBe('2026-07-15')
    })

    it('`/cases`는 가장 최근 발행 사례의 updatedAt을 쓴다', async () => {
      const entries = await sitemap()

      expect(
        entries.find(({ url }) => url === 'https://lawyer-ryu.test/cases')?.lastModified,
      ).toBe(LATEST_CASE_UPDATED_AT)
    })

    it('사례 조회가 실패해도 나머지 사이트맵은 그대로 생성한다', async () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
      findMock.mockRejectedValue(new Error('DB unreachable'))

      const entries = await sitemap()

      expect(entries).toHaveLength(14)
      expect(
        entries.find(({ url }) => url === 'https://lawyer-ryu.test/cases')?.lastModified,
      ).toBeUndefined()
      expect(consoleError).toHaveBeenCalled()

      consoleError.mockRestore()
    })
  })

  it('로컬 개발에서는 색인을 차단하되 localhost 사이트맵을 제공한다', async () => {
    setEnvironment({ nodeEnv: 'development' })

    expect(robots()).toEqual({
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    })
    expect((await sitemap())[0]?.url).toBe('http://localhost:3000/')
  })
})
