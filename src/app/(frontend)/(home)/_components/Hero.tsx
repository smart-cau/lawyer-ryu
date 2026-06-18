import Image from 'next/image'
import { Phone } from 'lucide-react'
import type { FC } from 'react'

import { Button } from '@/components/ui/button'
import { CONTACT } from '@/lib/constants'

const HERO_CREDENTIALS = [
  '대한변협 형사전문 변호사',
  '사법시험 44회 / 사법연수원 35기',
  '창원지검(2011년, 2021년)',
  '부산지검(2015년, 2023년)',
  '부산지검 서부지청(2018년, 2022년)',
  '대구지검(2024년)',
]

// 핵심 경력은 사진 캡션으로 강조하되, 캡션이 숨는 lg 미만에서는 bullet로 보존한다.
const MOBILE_ONLY_CREDENTIAL = '창원지검·부산지검 등 총 19년 검사 재직, 2024년 부부장 검사 퇴직'

const PHONE_DISPLAY = CONTACT.office
const PHONE_HREF = `tel:${PHONE_DISPLAY.replace(/-/g, '')}`

export const HeroSection: FC = () => {
  return (
    <section
      id="hero"
      aria-label="대표변호사 류남경 소개"
      className="relative -mt-24 isolate overflow-hidden bg-[#0b111d] text-white"
    >
      {/* Full-bleed office library backdrop */}
      <Image
        src="/backgrounds/office-library-desk-blur.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="scale-[1.006] object-cover object-center blur-[1px] brightness-[0.9] contrast-[1.02] saturate-[0.94]"
      />

      {/* Legibility overlays — darkest on the left where the copy sits */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,8,15,0.64)_0%,rgba(4,8,15,0.46)_34%,rgba(4,8,15,0.16)_58%,rgba(4,8,15,0.04)_76%,rgba(4,8,15,0.1)_100%),radial-gradient(ellipse_at_82%_42%,rgba(8,10,13,0)_0%,rgba(8,10,13,0.08)_62%,rgba(8,10,13,0.2)_100%),linear-gradient(180deg,rgba(3,6,12,0)_0%,rgba(3,6,12,0.16)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[32%] bg-[linear-gradient(180deg,transparent_0%,rgba(18,13,10,0.12)_52%,rgba(8,7,6,0.34)_100%)]"
      />

      {/* Inner container — block stack on mobile, row split on lg */}
      <div className="relative mx-auto min-h-144 w-full max-w-7xl px-6 pt-32 pb-16 sm:px-8 lg:flex lg:min-h-176 lg:items-center lg:px-12 lg:pt-40 lg:pb-24 xl:px-16">
        {/* Portrait — bottom-right corner accent (bleeds off the edge) on mobile,
            absolute right on lg. Sits behind the copy so text/CTA stay legible. */}
        <div className="pointer-events-none absolute bottom-5 -right-4 z-0 h-[60%] w-[50%] max-w-72 sm:-right-6 lg:right-0 lg:top-24 lg:h-auto lg:w-[46%] lg:max-w-130">
          <Image
            src="/ryu-profile/1.webp"
            alt="대표변호사 류남경 프로필 사진"
            fill
            priority
            quality={90}
            sizes="(min-width: 1024px) 46vw, 50vw"
            className="object-contain object-bottom-right drop-shadow-[0_28px_48px_rgba(0,0,0,0.45)] mask-b-from-88% lg:object-bottom"
          />

          {/* 핵심 경력 캡션 — 인물 발치에 스크림(좌우 fade)과 함께 얹어
              "이 사람의 경력"으로 읽히게 한다. lg 미만은 bullet로 대체. */}
          <div className="absolute inset-x-0 bottom-0 hidden pt-20 pb-7 lg:block">
            {/* 스크림만 좌우 fade — 텍스트에는 마스크가 걸리지 않게 분리 */}
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(4,7,13,0.5)_42%,rgba(4,7,13,0.85)_100%)] [mask-image:linear-gradient(90deg,transparent_0%,black_16%,black_84%,transparent_100%)]"
            />
            <div className="relative flex flex-col items-center gap-1.5 text-center">
              <span aria-hidden className="h-px w-12 bg-brand-gold/75" />
              <p className="font-serif-kr text-title-2 font-semibold text-brand-gold">
                검사 재직 19년 · 부부장검사
              </p>
              <p className="text-heading-2 font-medium text-white/70">
                창원지검·부산지검·부산서부지청 각 2회 씩 근무
              </p>
            </div>
          </div>
        </div>

        {/* Copy — fills the surface; lower items kept left of the portrait on mobile */}
        <div className="relative z-10 w-full max-w-160 lg:w-[52%]">
          {/* Cluster 1 — 헤드라인 메시지 (eyebrow · h1 · 보조 설명) */}
          <div>
            <p className="text-title-3 font-bold tracking-[0.04em] text-brand-gold">
              창원·부산 검사 출신 형사 전문 변호사
            </p>

            <h1 className="mt-3.5 text-display-1 font-bold text-white [text-shadow:0_3px_20px_rgba(0,0,0,0.62)]">
              <span className="text-success underline">19년 검사 경력</span>으로
              <br />
              수사하고 증거를 찾아
              <br />
              억울함을 해결해드립니다
            </h1>

            <p className="mt-5 max-w-lg text-headline-2 font-medium text-white/80 [text-shadow:0_2px_16px_rgba(0,0,0,0.5)]">
              다년간의 수사와 공판수행으로 판사 · 검사의 심리를 꿰뚫는 변호사
              <br />
              <span className="text-brand-gold">검사출신 대표변호사가 직접 상담 및 변론수행</span>
            </p>
          </div>

          {/* Cluster 2 — 변호사 신원·약력·CTA (이름 · credentials · 상담 버튼) */}
          <div>
            <div className="mt-6 flex w-fit max-w-full items-baseline gap-2.5 border-t border-brand-gold/55 pt-4">
              <strong className="font-sans text-title-3 font-extrabold text-white">류남경</strong>
              <span className="text-body-1 font-semibold text-white/75">대표변호사</span>
            </div>

            <ul className="mt-5 space-y-2 pr-[44%] sm:pr-[40%] lg:pr-0">
              <li className="flex items-start gap-2 text-body-1-reading text-white/85 [text-shadow:0_2px_16px_rgba(0,0,0,0.5)] lg:hidden">
                <span
                  aria-hidden
                  className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold"
                />
                <span>{MOBILE_ONLY_CREDENTIAL}</span>
              </li>
              {HERO_CREDENTIALS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-body-1-reading text-white/85 [text-shadow:0_2px_16px_rgba(0,0,0,0.5)]"
                >
                  <span
                    aria-hidden
                    className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Button
                asChild
                size="lg"
                className="rounded-md bg-brand-gold text-brand-gold-foreground shadow-[0_14px_34px_-20px_rgba(215,157,62,0.72)] transition-[background-color,color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-brand-gold/90 active:translate-y-px"
              >
                <a href={PHONE_HREF} aria-label={`대표변호사 즉시상담 ${PHONE_DISPLAY}`}>
                  <Phone data-icon="inline-start" />
                  대표변호사 즉시상담
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
