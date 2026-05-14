import Image from 'next/image'
import { Check, Phone } from 'lucide-react'
import type { FC } from 'react'

import { Button } from '@/components/ui/button'

const HERO_CREDENTIALS = [
  '대한변협 등록 형사법 전문 변호사',
  '부산지검·창원지검·부산지검 서부지청 등 총 19년 검사 재직, 부부장 검사로 퇴직',
  '성폭력전담 합의부 공판 경력 (부산 2015–2017, 창원 2019–2021)',
  '사법시험 44회 / 사법연수원 35기',
]

const PHONE_DISPLAY = '010-7552-0301'
const PHONE_HREF = `tel:${PHONE_DISPLAY.replace(/-/g, '')}`

export const HeroSection: FC = () => {
  return (
    <section
      id="hero"
      aria-label="대표변호사 류남경 소개"
      className="relative -mt-[6rem] overflow-hidden bg-brand-deep text-white"
    >
      {/* 우측 사진 — 배경처럼 처리 */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 hidden w-1/2 lg:block"
      >
        <Image
          src="/ryu-profile/1.png"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover object-center"
        />
        {/* 좌측 fade — 사진을 배경에 자연 블렌드 */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-deep via-brand-deep/40 to-transparent" />
      </div>

      {/* 좌측 텍스트 */}
      <div className="container relative z-10 pt-[10rem] pb-[6rem] lg:pt-[12rem] lg:pb-[8rem]">
        <div className="max-w-2xl">
          <h1 className="text-display-1 font-bold">
            19년 검사 경력으로 수사하고
            <br />
            증거를 찾아주는 변호사
          </h1>

          <p className="mt-6 text-headline-1 font-medium text-white/80">
            수사기관을 대신하여
            <br />
            억울함을 풀어드립니다
          </p>

          <div className="mt-10 flex items-center gap-4">
            <span aria-hidden className="h-px w-8 bg-white/30" />
            <span className="text-label-1 text-white/80">
              법무법인 인유 창원사무소 | 류남경 대표변호사
            </span>
          </div>

          <ul className="mt-6 space-y-3">
            {HERO_CREDENTIALS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-body-1 text-white/80"
              >
                <Check
                  aria-hidden
                  className="mt-1 h-4 w-4 shrink-0 text-brand-gold"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Button asChild size="lg">
              <a
                href={PHONE_HREF}
                aria-label={`대표변호사 즉시상담 ${PHONE_DISPLAY}`}
              >
                <Phone data-icon="inline-start" />
                대표변호사 즉시상담
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
