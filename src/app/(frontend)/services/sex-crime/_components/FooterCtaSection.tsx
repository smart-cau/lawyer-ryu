import { Phone } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'

import { Button } from '@/components/ui/button'

const PHONE_HREF = 'tel:01075520301'

export const FooterCtaSection: FC = () => {
  return (
    <section
      id="footer-cta"
      aria-label="상담 신청"
      className="relative left-1/2 isolate my-[calc(var(--spacing-section)*-1)] w-screen -translate-x-1/2 overflow-hidden bg-[#05090f] px-5 py-[clamp(4rem,6vw,6.25rem)] text-center text-white [--cta-bg-size:cover] sm:px-8 md:[--cta-bg-size:auto_150%] lg:px-12 lg:[--cta-bg-size:auto_185%] xl:[--cta-bg-size:auto_220%] 2xl:[--cta-bg-size:auto_255%] 3xl:[--cta-bg-size:auto_290%]"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(5, 9, 15, 0.42) 0%, rgba(5, 9, 15, 0.58) 48%, rgba(5, 9, 15, 0.76) 100%), url('/cta-bg.png'), url('/cta-bg.png')",
        backgroundPosition: 'center, center 46%, center',
        backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
        backgroundSize: 'auto, var(--cta-bg-size), cover',
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.18),rgba(255,255,255,0)_32%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-[#05090f]/72 via-[#05090f]/20 to-transparent"
      />

      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-3">
          <h2 className="text-title-1 font-semibold text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.74)]">
            성범죄 수사, 혼자 대응하지 마세요
          </h2>
          <p className="text-headline-1 font-medium text-white/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.82)]">
            대표변호사 류남경이 직접 상담합니다.
          </p>
        </div>

        <Button
          asChild
          size="lg"
          className="gap-2 border border-white/35 bg-black/28 text-white shadow-lg shadow-black/25 backdrop-blur-sm hover:border-white/55 hover:bg-black/38"
        >
          <Link href={PHONE_HREF}>
            <Phone className="h-4 w-4" />
            전화 상담
          </Link>
        </Button>
      </div>
    </section>
  )
}
