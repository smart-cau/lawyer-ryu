import Image from 'next/image'
import { Mail, Phone, UserPlus } from 'lucide-react'
import type { FC } from 'react'

import { CONTACT } from '@/lib/constants'

const PHONE_HREF = `tel:${CONTACT.office.replace(/-/g, '')}`
const MAIL_HREF = `mailto:${CONTACT.email}`
// vCard 자산 미확보 — wireframe 단계 placeholder (자산 확보 시 href 교체)
const VCARD_HREF = '#'

export const HeroSection: FC = () => {
  return (
    <section
      id="hero"
      aria-label="대표변호사 류남경"
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
        <div className="absolute inset-0 bg-gradient-to-r from-brand-deep via-brand-deep/40 to-transparent" />
      </div>

      {/* 좌측 텍스트 */}
      <div className="container relative z-10 pt-[10rem] pb-[6rem] lg:pt-[12rem] lg:pb-[8rem]">
        <div className="max-w-2xl">
          <p className="text-caption font-medium tracking-wide text-brand-gold">
            법무법인 인유 창원사무소
          </p>

          <h1 className="mt-4 text-display">대표 변호사 류남경</h1>

          <p className="mt-6 text-body-lg text-white/80">
            변호사를 설명하는 인상적인 한마디
          </p>

          <ul className="mt-10 space-y-3">
            <li>
              <a
                href={PHONE_HREF}
                aria-label={`사무소 전화 ${CONTACT.office}`}
                className="inline-flex items-center gap-3 text-body text-white/90 transition-colors hover:text-brand-gold hover:underline hover:underline-offset-4"
              >
                <Phone aria-hidden className="h-5 w-5 shrink-0 text-brand-gold" />
                <span>{CONTACT.office}</span>
              </a>
            </li>
            <li>
              <a
                href={MAIL_HREF}
                aria-label={`이메일 ${CONTACT.email}`}
                className="inline-flex items-center gap-3 text-body text-white/90 transition-colors hover:text-brand-gold hover:underline hover:underline-offset-4"
              >
                <Mail aria-hidden className="h-5 w-5 shrink-0 text-brand-gold" />
                <span>{CONTACT.email}</span>
              </a>
            </li>
            <li>
              <a
                href={VCARD_HREF}
                aria-label="대표변호사 연락처 저장 (vCard)"
                className="inline-flex items-center gap-3 text-body text-white/90 transition-colors hover:text-brand-gold hover:underline hover:underline-offset-4"
              >
                <UserPlus aria-hidden className="h-5 w-5 shrink-0 text-brand-gold" />
                <span>연락처 저장</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
