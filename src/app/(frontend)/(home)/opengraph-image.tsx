import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'

export const alt =
  '법무법인 인유 창원분사무소 — 19년 검사 경력의 류남경 형사전문변호사'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

const toDataUrl = (data: Buffer, mimeType: string) =>
  `data:${mimeType};base64,${data.toString('base64')}`

export default async function OpenGraphImage() {
  const [font, logo] = await Promise.all([
    readFile(
      join(
        process.cwd(),
        'node_modules/pretendard/dist/web/static/woff-subset/Pretendard-SemiBold.subset.woff',
      ),
    ),
    readFile(join(process.cwd(), 'public/brand/inyou-logo.png')),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: '#f6f4ef',
          color: '#142033',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Pretendard',
          fontWeight: 600,
          height: '100%',
          justifyContent: 'center',
          position: 'relative',
          width: '100%',
        }}
      >
        <div
          style={{
            background: '#142033',
            display: 'flex',
            height: 14,
            left: 0,
            position: 'absolute',
            top: 0,
            width: 1200,
          }}
        />
        <div
          style={{
            background: '#d79d3e',
            display: 'flex',
            height: 4,
            left: 0,
            position: 'absolute',
            top: 14,
            width: 1200,
          }}
        />

        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            marginTop: -12,
          }}
        >
          <img
            alt=""
            src={toDataUrl(logo, 'image/png')}
            style={{ height: 104, objectFit: 'contain', width: 99 }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: 30,
            }}
          >
            <span
              style={{
                color: '#9a6c25',
                fontSize: 20,
                letterSpacing: '0.12em',
                lineHeight: 1,
              }}
            >
              [창원분사무소]
            </span>
            <span
              style={{
                fontSize: 58,
                letterSpacing: '-0.045em',
                lineHeight: 1.35,
              }}
            >
              법무법인 인유
            </span>
            <span
              style={{
                color: '#69717d',
                fontSize: 18,
                letterSpacing: '0.18em',
                lineHeight: 1,
              }}
            >
              LAWFIRM IN-YOU
            </span>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(20,32,51,0.18)',
            display: 'flex',
            height: 1,
            marginTop: 50,
            width: 700,
          }}
        />

        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            marginTop: 36,
          }}
        >
          <span
            style={{
              fontSize: 28,
              letterSpacing: '-0.025em',
            }}
          >
            류남경 대표변호사
          </span>
          <span
            style={{
              color: '#606975',
              fontSize: 22,
              letterSpacing: '-0.025em',
              marginTop: 12,
            }}
          >
            19년 검사 경력 · 대한변협 등록 형사법 전문
          </span>
        </div>

        <div
          style={{
            background: '#142033',
            bottom: 0,
            display: 'flex',
            height: 14,
            left: 0,
            position: 'absolute',
            width: 1200,
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          data: font,
          name: 'Pretendard',
          style: 'normal',
          weight: 600,
        },
      ],
    },
  )
}
