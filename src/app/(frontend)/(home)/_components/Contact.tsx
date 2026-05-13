import { Info, Navigation } from 'lucide-react'
import type { FC, ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CONTACT, NAVER_MAP_URL } from '@/lib/constants'

import NaverMap from './NaverMap'

const PHONE_HREF = `tel:${CONTACT.phone.replace(/-/g, '')}`
const EMAIL_HREF = `mailto:${CONTACT.email}`

type InfoRowProps = {
  label: string
  children: ReactNode
}

const InfoRow: FC<InfoRowProps> = ({ label, children }) => (
  <div className="grid grid-cols-[64px_1fr] items-baseline gap-x-6 py-2 sm:grid-cols-[80px_1fr]">
    <dt className="text-caption text-muted-foreground">{label}</dt>
    <dd className="text-body">{children}</dd>
  </div>
)

export const ContactSection: FC = () => {
  return (
    <section id="contact" aria-label="오시는 길">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <h2 className="text-h2">오시는 길</h2>

          <Separator className="mt-8" />

          <dl className="mt-2">
            <InfoRow label="주소">{CONTACT.address}</InfoRow>
            <InfoRow label="건물">사파동 더원2빌딩 504호</InfoRow>
            <InfoRow label="전화">
              <a
                href={PHONE_HREF}
                className="underline-offset-4 hover:underline"
                aria-label={`대표 전화 ${CONTACT.phone}`}
              >
                {CONTACT.phone}
              </a>
            </InfoRow>
            <InfoRow label="이메일">
              <a
                href={EMAIL_HREF}
                className="underline-offset-4 hover:underline"
              >
                {CONTACT.email}
              </a>
            </InfoRow>
          </dl>

          <Separator className="mt-6" />

          <dl className="mt-2">
            <InfoRow label="평일">09:00 ~ 22:00</InfoRow>
            <InfoRow label="토/일/공휴일">휴무</InfoRow>
          </dl>

          <div className="mt-8 flex items-start gap-3 rounded-md border border-border bg-muted/40 px-4 py-3 text-caption text-muted-foreground">
            <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{CONTACT.hoursWarning.replace(/^\*\s*/, '')}</span>
          </div>
        </div>

        <div className="flex flex-col">
          <NaverMap className="aspect-[4/3] w-full overflow-hidden rounded-md border border-border bg-muted lg:aspect-auto lg:flex-1" />
          <Button asChild variant="outline" size="lg" className="mt-3">
            <a
              href={NAVER_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="네이버 지도에서 길찾기 열기"
            >
              <Navigation data-icon="inline-start" />
              길찾기
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
