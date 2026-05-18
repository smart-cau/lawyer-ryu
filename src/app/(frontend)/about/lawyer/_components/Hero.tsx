import Image from 'next/image'
import { Mail, Phone, UserPlus } from 'lucide-react'
import type { FC } from 'react'

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

const INTRO_PARAGRAPHS = [
  '검사가 되겠다고 마음먹은 이유는 단순했습니다. 억울한 사람이 죄를 뒤집어쓰지 않게 하고, 죄가 있는 일에는 그에 맞는 책임이 따르도록 기록과 증거를 끝까지 살피는 사람이 필요하다고 믿었습니다.',
  '검사로 19년을 일하며 수사의 흐름과 공판의 기준을 배웠습니다. 동시에 사건의 한가운데 선 사람에게는 기소 여부가 정해지기 전, 첫 조사와 첫 진술의 순간부터 곁에서 함께 판단해 줄 변호인이 필요하다는 사실도 보았습니다.',
  '검사 출신 변호사로서의 제 원칙은 분명합니다. 수사기관의 시선으로 쟁점을 읽되, 의뢰인의 자리에서 말과 기록을 다시 정리합니다. 사건마다 다른 사실관계를 차분히 살피고, 다툴 지점과 설명할 지점을 구분해 변론합니다.',
] as const

export const HeroSection: FC = () => {
  return (
    <section
      id="banner"
      aria-label="대표변호사 류남경"
      className="relative -mt-[6rem] overflow-hidden bg-[#111426] text-brand-deep-foreground"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,12,22,0.12)_0%,rgba(17,20,38,0)_36%,#111426_100%)]" />
      <div className="absolute inset-y-0 left-0 hidden w-1/2 bg-[linear-gradient(90deg,rgba(17,20,38,0.34)_0%,rgba(17,20,38,0)_100%)] md:block" />

      <div className="container relative z-10 grid gap-12 pt-36 pb-28 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:items-end md:gap-10 md:pt-40 md:pb-36 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:max-w-[calc(71.25rem+4rem)] lg:gap-24 lg:pt-44 lg:pb-44">
        <div className="flex flex-col items-center md:items-start">
          <div className="relative h-[25rem] w-full max-w-[21rem] overflow-hidden md:h-[27rem] md:w-[18rem] md:max-w-none lg:h-[34rem] lg:w-[24rem]">
            <Image
              src="/ryu-profile/2-crop.png"
              alt="대표변호사 류남경"
              fill
              priority
              sizes="(min-width: 1024px) 24rem, (min-width: 768px) 18rem, 21rem"
              className="object-contain object-bottom md:object-left-bottom"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,rgba(17,20,38,0)_0%,rgba(17,20,38,0.68)_56%,#111426_100%)] md:h-32 lg:h-40"
            />
          </div>

          <div className="relative z-10 -mt-14 w-full text-center md:-mt-14 md:text-left lg:-mt-20">
            <h1 className="text-display-1 font-medium">
              류남경
            </h1>
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
          {INTRO_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
