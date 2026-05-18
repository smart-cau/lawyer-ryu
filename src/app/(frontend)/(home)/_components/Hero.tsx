import Image from 'next/image'
import { Check, Phone } from 'lucide-react'
import type { FC } from 'react'

import { Button } from '@/components/ui/button'
import { CONTACT } from '@/lib/constants'

const HERO_CREDENTIALS = [
  '대한변협 등록 형사법 전문 변호사',
  '부산지검·창원지검·부산지검 서부지청 등 총 19년 검사 재직, 부부장 검사로 퇴직',
  '성폭력전담 합의부 공판 경력 (부산 2015–2017, 창원 2019–2021)',
  '사법시험 44회 / 사법연수원 35기',
]

const PHONE_DISPLAY = CONTACT.office
const PHONE_HREF = `tel:${PHONE_DISPLAY.replace(/-/g, '')}`

export const HeroSection: FC = () => {
  return (
    <section
      id="hero"
      aria-label="대표변호사 류남경 소개"
      className="relative -mt-[6rem] isolate overflow-hidden bg-brand-deep text-white"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,hsl(221.25_43.64%_18%)_0%,hsl(221.25_43.64%_21.57%)_54%,hsl(221.25_43.64%_16%)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-[linear-gradient(180deg,rgba(25,47,82,0)_0%,rgba(8,14,28,0.38)_100%)]"
      />

      <div className="container grid gap-7 pt-[7.75rem] pb-12 md:gap-8 md:pt-[9rem] md:pb-16 lg:grid-cols-[minmax(0,0.98fr)_minmax(20rem,0.62fr)] lg:items-center lg:gap-x-16 lg:gap-y-8 lg:pt-[10.75rem] lg:pb-20 xl:gap-x-20">
        <div className="max-w-2xl">
          <p className="text-body-2 font-medium text-brand-gold">
            법무법인 인유 창원사무소
          </p>

          <h1 className="mt-3 text-display-1 font-bold text-balance">
            검사 19년 경력으로 수사하고
            <br />
            증거를 찾아주는 변호사
          </h1>

          <p className="mt-5 max-w-[34rem] text-headline-1 font-medium text-white/82">
            수사기관을 대신하여 억울함을 풀어드리겠습니다
          </p>

          <div className="mt-7 flex items-center gap-4">
            <span aria-hidden className="h-px w-8 bg-white/30" />
            <span className="text-headline-1 text-white/80">
              류남경 대표변호사
            </span>
          </div>
        </div>

        <figure className="relative mx-auto w-full max-w-[23rem] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:w-full lg:max-w-[34rem] lg:self-end">
          <div
            aria-hidden
            className="absolute inset-x-2 top-10 bottom-0 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.055)_38%,rgba(255,255,255,0)_70%)]"
          />
          <div className="relative h-[23rem] overflow-hidden md:h-[28rem] lg:h-[40rem]">
            <Image
              src="/ryu-profile/1.png"
              alt="대표변호사 류남경 프로필 사진"
              fill
              priority
              sizes="(min-width: 1280px) 34rem, (min-width: 1024px) 38vw, (min-width: 768px) 23rem, 92vw"
              className="object-contain object-bottom drop-shadow-[0_24px_38px_rgba(0,0,0,0.36)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,rgba(31,54,91,0)_0%,rgba(19,36,66,0.34)_58%,hsl(221.25_43.64%_16%)_100%)]"
            />
          </div>
          <figcaption className="sr-only">류남경 대표변호사</figcaption>
        </figure>

        <div className="max-w-2xl lg:col-start-1">
          <ul className="space-y-3">
            {HERO_CREDENTIALS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-body-1 text-white/82"
              >
                <Check
                  aria-hidden
                  className="mt-1 h-4 w-4 shrink-0 text-brand-gold"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="bg-brand-gold text-brand-gold-foreground shadow-[0_14px_34px_-20px_rgba(215,157,62,0.72)] transition-[background-color,color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-brand-gold/90 active:translate-y-px"
            >
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
