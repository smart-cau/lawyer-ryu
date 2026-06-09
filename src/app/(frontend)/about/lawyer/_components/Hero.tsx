import Image from 'next/image'
import { Mail, Phone, UserPlus } from 'lucide-react'
import type { FC } from 'react'

import { SectionContainer } from '@/components/SectionContainer'
import { CONTACT } from '@/lib/constants'

const PHONE_HREF = `tel:${CONTACT.office.replace(/-/g, '')}`
const MAIL_HREF = `mailto:${CONTACT.email}`
// vCard 자산 미확보 — wireframe 단계 placeholder (자산 확보 시 href 교체)
const VCARD_HREF = `data:text/vcard;charset=utf-8,${encodeURIComponent(
  [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:류;남경;;;',
    'FN:류남경',
    'ORG:법무법인 인유 창원사무소',
    'TITLE:대표변호사',
    `TEL;TYPE=WORK,VOICE:${CONTACT.office}`,
    `EMAIL;TYPE=WORK:${CONTACT.email}`,
    `ADR;TYPE=WORK:;;${CONTACT.address} ${CONTACT.addressSub};창원시;경상남도;;;대한민국`,
    'END:VCARD',
  ].join('\n'),
)}`

const INTRO = {
  title: '자리는 바뀌었지만, 억울함을 외면하지 않는 마음은 같습니다',
  paragraphs: [
    '검사로 일하는 동안 많은 피해자들의 이야기를 들었습니다. 누군가에게는 한 번의 사건이 평생의 상처가 되기도 하고, 말로 다 설명하지 못한 억울함이 기록 몇 장 안에 담기기도 했습니다. 그 억울함을 법의 절차 안에서 살피고, 필요한 책임을 묻는 일이 제 역할이었습니다.',
    '하지만 사건을 오래 마주할수록 알게 된 것도 있습니다. 피의자나 피고인의 자리에도 억울함이 있을 수 있다는 사실입니다. 혐의가 먼저 앞서면 미처 설명되지 못한 사정이 묻히고, 한 사람의 삶이 사건명 하나로만 판단되는 순간도 생깁니다.',
    '이제 저는 변호사의 자리에서 사건을 봅니다. 피해자의 억울함도, 피의자와 피고인의 억울함도 가볍게 넘기지 않겠습니다. 기록에 남은 사실과 기록에 다 담기지 못한 사정까지 함께 살피며, 의뢰인이 자신의 이야기를 제대로 전할 수 있도록 돕겠습니다.',
  ],
} as const

export const HeroSection: FC = () => {
  return (
    <SectionContainer
      id="banner"
      aria-label="대표변호사 류남경"
      className="relative isolate -mt-[6rem] overflow-hidden bg-[#070b11] text-brand-deep-foreground"
      innerClassName="grid gap-12 pt-36 pb-28 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:items-end md:gap-10 md:pt-40 md:pb-36 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:max-w-[calc(71.25rem+4rem)] lg:gap-24 lg:pt-44 lg:pb-44"
      padded={false}
      background={
        <>
          <Image
            src="/backgrounds/justice.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-[1.035] object-cover object-left-center blur-[2px] brightness-[0.78] contrast-[1.04] saturate-[0.88]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,11,17,0.68)_0%,rgba(7,11,17,0.5)_34%,rgba(7,11,17,0.76)_62%,rgba(7,11,17,0.9)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_22%_58%,rgba(7,11,17,0.18)_0%,rgba(7,11,17,0.44)_58%,rgba(7,11,17,0.7)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(180deg,rgba(7,11,17,0)_0%,#070b11_100%)]" />
        </>
      }
    >
      <div className="flex flex-col items-center md:items-start">
        <div className="relative h-[25rem] w-full max-w-[21rem] overflow-hidden md:h-[27rem] md:w-[18rem] md:max-w-none lg:h-[34rem] lg:w-[24rem]">
          <Image
            src="/ryu-profile/2-crop.webp"
            alt="대표변호사 류남경"
            fill
            priority
            quality={90}
            sizes="(min-width: 1024px) 24rem, (min-width: 768px) 18rem, 21rem"
            className="object-contain object-bottom mask-b-from-72% md:object-left-bottom"
          />
        </div>

        <div className="relative z-10 -mt-14 w-full text-center md:-mt-14 md:text-left lg:-mt-20">
          <h1 className="text-display-1 font-medium">류남경</h1>
          <p className="mt-5 text-label-1 font-medium text-brand-gold md:text-headline-2">
            대표변호사
          </p>

          <ul className="text-body-1 mx-auto mt-7 w-fit space-y-4 text-left font-light text-brand-deep-foreground/90 md:mx-0 md:text-headline-1">
            <li>
              <a
                href={PHONE_HREF}
                aria-label={`사무소 전화 ${CONTACT.office}`}
                className="inline-flex items-center justify-start gap-3 transition-colors hover:text-brand-gold hover:underline hover:underline-offset-4"
              >
                <Phone aria-hidden className="h-4 w-4 shrink-0 text-brand-gold" />
                <span>{CONTACT.office}</span>
              </a>
            </li>
            <li>
              <a
                href={MAIL_HREF}
                aria-label={`이메일 ${CONTACT.email}`}
                className="inline-flex items-center justify-start gap-3 transition-colors hover:text-brand-gold hover:underline hover:underline-offset-4"
              >
                <Mail aria-hidden className="h-4 w-4 shrink-0 text-brand-gold" />
                <span>{CONTACT.email}</span>
              </a>
            </li>
            <li>
              <a
                href={VCARD_HREF}
                aria-label="대표변호사 연락처 저장 (vCard)"
                className="inline-flex items-center justify-start gap-3 transition-colors hover:text-brand-gold hover:underline hover:underline-offset-4"
              >
                <UserPlus aria-hidden className="h-4 w-4 shrink-0 text-brand-gold" />
                <span>연락처 저장</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-6 text-body-1-reading font-light text-brand-deep-foreground/90 md:self-center md:text-body-2-reading lg:space-y-7 lg:pl-2 lg:text-headline-1">
        <h2 className="break-keep text-headline-1 font-medium text-brand-deep-foreground before:mb-5 before:block before:h-1 before:w-16 before:bg-brand-gold before:content-[''] md:text-display-3">
          {INTRO.title}
        </h2>

        {INTRO.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </SectionContainer>
  )
}
