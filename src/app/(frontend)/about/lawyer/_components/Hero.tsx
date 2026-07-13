import Image from 'next/image'
import type { FC } from 'react'

import { SectionContainer } from '@/components/SectionContainer'

// 주요 경력 — 이미지 원본 순서 그대로 유지 (시간순 재정렬 X)
const CAREER: readonly { title: string; period?: string; fields?: string }[] = [
  { title: '사법고시 44회 합격', period: '2002' },
  { title: '사법연수원 35기 수료', period: '2006' },
  {
    title: '대구지방검찰청 부부장 검사',
    period: '2023 ~ 2024',
    fields: '조세, 공정거래, 명예훼손, 다중피해범죄',
  },
  {
    title: '부산지방검찰청 부부장 검사',
    period: '2022 ~ 2023',
    fields: '기술유출, 전세사기, 명예훼손, 다중피해범죄, 지적재산권',
  },
  {
    title: '부산지방검찰청 서부지청 부부장 검사',
    period: '2021 ~ 2022',
    fields: '기술유출, 서민생활침해, 명예훼손, 지적재산권',
  },
  {
    title: '창원지방검찰청 검사',
    period: '2019 ~ 2021',
    fields: '성폭력전담 합의부 공판, 조세, 관세, 금융, 기술유출, 다중피해범죄, 국민참여재판',
  },
  {
    title: '부산지방검찰청 서부지청 검사',
    period: '2017 ~ 2019',
    fields: '성폭력, 가정폭력, 아동·청소년보호, 금융, 조세, 기술유출, 영장',
  },
  {
    title: '부산지방검찰청 검사',
    period: '2014 ~ 2017',
    fields: '성폭력전담 합의부 공판, 국민참여재판, 조세, 금융, 다중피해범죄, 영장',
  },
  {
    title: '창원지방검찰청 검사',
    period: '2010 ~ 2012',
    fields: '성폭력, 아동·청소년보호, 조세, 보험',
  },
  { title: '광주지검(2006), 순천지청(2008), 전주지검(2012)' },
]

// 주요 어필 포인트 — 1차 가설 (CLAUDE.md 확정 팩트 + 성범죄·재산범죄 형사 전문 메모 기반, 확정 카피 아님)
const APPEAL: readonly string[] = [
  '19년 검사 경력 · 부부장검사 출신',
  // '대한변협 등록 형사법 전문 변호사',
  '재산범죄, 성범죄, 아동학대, 산업재해, 기업범죄, 금융범죄 등 창원/부산 지역 형사전문 변호사',
]

/**
 * about/lawyer 최상단 히어로. 밝은 배경 + 프로필 + 어필 포인트 + 주요 경력을
 * 한눈에 노출한다. 최상단이 밝은 배경이므로 HeaderLightTone 이 헤더를 light 톤으로
 * 고정한다.
 */
export const HeroSection: FC = () => {
  return (
    <SectionContainer
      id="banner"
      aria-label="대표변호사 류남경"
      className="isolate scroll-mt-24 overflow-hidden bg-[#eef2f4] text-[#2f2724]"
      innerClassName="grid gap-12 pt-28 pb-16 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:items-start md:gap-10 md:pt-28 md:pb-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:max-w-[calc(71.25rem+4rem)] lg:gap-24 lg:pt-32 lg:pb-28"
      padded={false}
      background={
        <>
          <Image
            src="/law-office-blur-bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[1.04] saturate-[0.88]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,251,0.86)_0%,rgba(248,250,251,0.72)_34%,rgba(248,250,251,0.38)_58%,rgba(248,250,251,0.2)_100%)]"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(248,250,251,0)_0%,rgba(248,250,251,0.78)_64%,#fff_100%)]"
          />
        </>
      }
    >
      <div className="motion-entrance-fade flex flex-col items-center [--motion-delay:80ms] md:items-start">
        <div className="relative h-[25rem] w-full max-w-[21rem] overflow-hidden md:h-[27rem] md:w-[18rem] md:max-w-none lg:h-[38rem] lg:w-[28rem]">
          <Image
            src="/profile-white-bg-remove.png"
            alt="대표변호사 류남경"
            fill
            priority
            quality={90}
            sizes="(min-width: 1024px) 24rem, (min-width: 768px) 18rem, 21rem"
            className="object-contain object-bottom mask-b-from-72% md:object-left-bottom"
          />
        </div>

        <div className="motion-entrance relative z-10 -mt-14 w-full text-center [--motion-delay:180ms] md:-mt-14 md:text-left lg:-mt-20">
          <div className="flex flex-wrap items-baseline justify-center gap-x-3 md:justify-start">
            <h1 className="text-display-1 font-medium">류남경</h1>
            <p className="text-label-1 font-medium text-brand-gold md:text-headline-2">
              대표변호사
            </p>
          </div>

          <ul className="mx-auto mt-6 w-fit list-disc space-y-2 pl-5 text-left text-body-2 font-medium text-[#2f2724] marker:text-brand-gold md:mx-0 md:text-body-1">
            {APPEAL.map((point) => (
              <li key={point} className="break-keep">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="motion-entrance space-y-6 [--motion-delay:260ms] lg:space-y-7 lg:pl-2">
        <h2 className="break-keep text-headline-1 font-medium before:mb-5 before:block before:h-1 before:w-16 before:bg-brand-gold before:content-[''] md:text-display-3">
          주요 경력
        </h2>

        <ul className="list-disc space-y-4 pl-5 text-black marker:text-brand-gold lg:space-y-5">
          {CAREER.map((item) => (
            <li key={item.title} className="break-keep">
              <span className="text-body-1 font-medium text-black">
                {item.title}
                {item.period ? ` (${item.period})` : ''}
              </span>
              {item.fields ? (
                <span className="mt-1 block text-label-1 font-medium text-black/70">
                  {item.fields}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </SectionContainer>
  )
}
