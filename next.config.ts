import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)
import { redirects } from './redirects'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

const nextConfig: NextConfig = {
  // Temporarily required on Windows until Next.js fixes Turbopack Sass resolution.
  // See: https://github.com/vercel/next.js/issues/86431
  sassOptions: {
    loadPaths: ['./node_modules/@payloadcms/ui/dist/scss/'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85, 90, 100],
    // 로컬(자기 오리진) 이미지는 전부 허용. 폴더 추가할 때마다 allowlist를
    // 갱신할 필요가 없도록 catch-all. SSRF 방어는 아래 remotePatterns가 담당.
    localPatterns: [
      {
        pathname: '/**',
      },
    ],
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', '') as 'http' | 'https',
        }
      }),
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  // 기술 스택을 드러내는 `X-Powered-By` 헤더를 제거한다.
  poweredByHeader: false,
  redirects,
  // 전역 보안 응답 헤더. CSP는 네이버 지도 SDK·관리자 패널과의 호환성
  // 검증이 필요해 별도로 다룬다(여기서는 파괴 위험이 없는 헤더만 적용).
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // 관리자 라이브 프리뷰는 동일 출처 iframe이라 SAMEORIGIN으로 허용된다.
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
        ],
      },
    ]
  },
  turbopack: {
    root: path.resolve(dirname),
  },
  allowedDevOrigins: ['127.0.0.1'],
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
