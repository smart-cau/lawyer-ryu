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
      className="mx-auto max-w-2xl space-y-8 text-center"
    >
      <div className="space-y-3">
        <h2 className="text-h2">성범죄 수사, 혼자 대응하지 마세요</h2>
        <p className="text-body-lg text-muted-foreground">
          대표변호사 류남경이 직접 상담합니다.
        </p>
      </div>

      <Button asChild size="lg" className="gap-2">
        <Link href={PHONE_HREF}>
          <Phone className="h-4 w-4" />
          전화 상담
        </Link>
      </Button>
    </section>
  )
}
