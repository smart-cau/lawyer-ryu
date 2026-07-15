import type { Metadata } from 'next'

import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'
import { Noto_Serif_KR } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { StickyCtaBar } from '@/components/StickyCtaBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { BRAND_OPEN_GRAPH_IMAGE, mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const notoSerifKR = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-serif-kr',
  display: 'swap',
  preload: false,
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html lang="ko" suppressHydrationWarning className={notoSerifKR.variable}>
      <head>
        <meta name="naver-site-verification" content="1e99ad4b3980f317b77d53f0254a70f5d665376c" />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <AdminBar
          adminBarProps={{
            preview: isEnabled,
          }}
        />

        <Header />
        {children}
        <Footer />
        <StickyCtaBar />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    images: [BRAND_OPEN_GRAPH_IMAGE.url],
  },
}
