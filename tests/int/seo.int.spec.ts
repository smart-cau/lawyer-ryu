import robots from '@/app/robots'
import sitemap from '@/app/sitemap'

import { afterEach, describe, expect, it, vi } from 'vitest'

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
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('운영 배포에서는 공개 경로와 두 사이트맵을 안내한다', () => {
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

    const entries = sitemap()

    expect(entries).toHaveLength(14)
    expect(entries[0]?.url).toBe('https://lawyer-ryu.test/')
    expect(entries.some(({ url }) => url.includes('example.com'))).toBe(false)
  })

  it('Preview 배포에서는 전체 크롤링을 차단하고 사이트맵을 비운다', () => {
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
    expect(sitemap()).toEqual([])
  })

  it('운영 URL이 없으면 전체 크롤링을 차단하고 사이트맵을 비운다', () => {
    setEnvironment({ nodeEnv: 'production', vercelEnv: 'production' })

    expect(robots()).toEqual({
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    })
    expect(sitemap()).toEqual([])
  })

  it('로컬 개발에서는 색인을 차단하되 localhost 사이트맵을 제공한다', () => {
    setEnvironment({ nodeEnv: 'development' })

    expect(robots()).toEqual({
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    })
    expect(sitemap()[0]?.url).toBe('http://localhost:3000/')
  })
})
