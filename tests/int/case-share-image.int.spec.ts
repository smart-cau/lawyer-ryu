import type { Case, Media } from '@/payload-types'
import type { NextRequest } from 'next/server'

import { GET as redirectLegacyBrandImage } from '@/app/(frontend)/og-image/route'
import { resolveCaseShareImage } from '@/utilities/caseShareImage'
import { generateMeta } from '@/utilities/generateMeta'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const SERVER_URL = 'https://lawyer-ryu.test'

const media = (overrides: Partial<Media> = {}): Media =>
  ({
    id: 1,
    alt: '법정 앞에 선 변호사',
    updatedAt: '2026-07-01T00:00:00.000Z',
    createdAt: '2026-07-01T00:00:00.000Z',
    url: '/api/media/file/hero.webp',
    width: 1600,
    height: 900,
    ...overrides,
  }) as Media

const caseDoc = (overrides: Partial<Case> = {}): Partial<Case> => ({
  id: 1,
  title: '특수상해 혐의 불송치',
  slug: 'special-injury',
  ...overrides,
})

describe('성공사례 대표 이미지 결정', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_SERVER_URL', SERVER_URL)
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('SEO 탭의 meta 이미지를 최우선으로 쓴다', () => {
    const image = resolveCaseShareImage(
      caseDoc({
        heroImage: media({ id: 2, url: '/api/media/file/hero.webp' }),
        meta: { image: media({ id: 3, url: '/api/media/file/meta.webp' }) },
      }),
    )

    expect(image?.url).toBe(`${SERVER_URL}/api/media/file/meta.webp`)
  })

  it('meta 이미지가 없으면 대표 이미지로 폴백한다', () => {
    const image = resolveCaseShareImage(
      caseDoc({ heroImage: media({ url: '/api/media/file/hero.webp' }) }),
    )

    expect(image?.url).toBe(`${SERVER_URL}/api/media/file/hero.webp`)
  })

  // 성공사례 썸네일은 정사각 도안이라 1200×630 센터 크롭을 태우면 로고·전화번호가 잘린다.
  it('og 파생 크롭이 있어도 원본 이미지를 쓴다', () => {
    const image = resolveCaseShareImage(
      caseDoc({
        heroImage: media({
          url: '/api/media/file/hero.webp',
          width: 700,
          height: 700,
          sizes: { og: { url: '/api/media/file/hero-1200x630.webp', width: 1200, height: 630 } },
        }),
      }),
    )

    expect(image).toMatchObject({
      url: `${SERVER_URL}/api/media/file/hero.webp`,
      width: 700,
      height: 700,
    })
  })

  it('이미 절대 URL이면 서버 주소를 덧붙이지 않는다', () => {
    const image = resolveCaseShareImage(
      caseDoc({ heroImage: media({ url: 'https://blob.example.com/hero.webp' }) }),
    )

    expect(image?.url).toBe('https://blob.example.com/hero.webp')
  })

  it('이미지가 없거나 관계가 채워지지 않았으면 null을 돌려준다', () => {
    expect(resolveCaseShareImage(caseDoc())).toBeNull()
    expect(resolveCaseShareImage(caseDoc({ heroImage: 7, meta: { image: 8 } }))).toBeNull()
    expect(resolveCaseShareImage(null)).toBeNull()
  })
})

describe('성공사례 메타데이터의 공유 이미지', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_SERVER_URL', SERVER_URL)
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('글별 이미지가 있으면 og:image·twitter:image에 절대 URL로 싣는다', async () => {
    const meta = await generateMeta({
      doc: caseDoc({ meta: { image: media({ url: '/api/media/file/meta.webp' }) } }),
    })

    const [ogImage] = meta.openGraph?.images as { url: string; alt?: string }[]

    expect(ogImage?.url).toBe(`${SERVER_URL}/api/media/file/meta.webp`)
    expect(ogImage?.alt).toBe('법정 앞에 선 변호사')
    expect(meta.twitter && 'images' in meta.twitter ? meta.twitter.images : null).toEqual([
      `${SERVER_URL}/api/media/file/meta.webp`,
    ])
  })

  it('meta 이미지가 없으면 대표 이미지가 공유 미리보기에 실린다', async () => {
    const meta = await generateMeta({
      doc: caseDoc({ heroImage: media({ url: '/api/media/file/hero.webp' }) }),
    })

    const [ogImage] = meta.openGraph?.images as { url: string }[]

    expect(ogImage?.url).toBe(`${SERVER_URL}/api/media/file/hero.webp`)
  })

  it('이미지가 없으면 메인과 같은 정적 브랜드 이미지를 쓴다', async () => {
    const meta = await generateMeta({ doc: caseDoc() })

    const [ogImage] = meta.openGraph?.images as { url: string }[]

    expect(ogImage?.url).toMatch(/\/brand\/open-graph\.png$/)
  })
})

describe('기본 OG 이미지 호환성', () => {
  it('기존 동적 URL을 정적 브랜드 이미지로 이동시킨다', () => {
    const response = redirectLegacyBrandImage({
      url: `${SERVER_URL}/og-image`,
    } as NextRequest)

    expect(response.status).toBe(308)
    expect(response.headers.get('location')).toBe(`${SERVER_URL}/brand/open-graph.png`)
  })
})
