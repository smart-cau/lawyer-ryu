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
      className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12"
    >
      <div className="lg:col-span-7">
        <h1 className="text-display">
          19년 검사 경력으로 수사하고
          <br />
          증거를 찾아주는 변호사
        </h1>

        <p className="mt-6 text-body-lg text-muted-foreground">
          수사기관을 대신하여
          <br />
          억울함을 풀어드립니다
        </p>

        <div className="mt-10 flex items-center gap-4">
          <span aria-hidden className="h-px w-8 bg-border" />
          <span className="text-caption font-medium tracking-wide">
            류남경 대표변호사
          </span>
        </div>

        <ul className="mt-6 space-y-3">
          {HERO_CREDENTIALS.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-body text-muted-foreground"
            >
              <Check
                aria-hidden
                className="mt-1 h-4 w-4 shrink-0 text-foreground"
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

      <div className="lg:col-span-5">
        <div className="relative mx-auto aspect-[5/7] w-full max-w-md overflow-hidden rounded-lg bg-muted">
          <Image
            src="/ryu-profile/1.png"
            alt="대표변호사 류남경"
            fill
            priority
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
