import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

import { Logo } from '@/components/Logo/Logo'
import { Separator } from '@/components/ui/separator'
import { primaryNav } from '@/Header/nav-data'
import { CONTACT } from '@/lib/constants'

const PHONE_DISPLAY = CONTACT.office
const PHONE_HREF = `tel:${PHONE_DISPLAY.replace(/-/g, '')}`
const ADDRESS = '경남 창원시 성산구 창이대로689번길 4-24, 5층 504호'
const BLOG_URL = 'https://blog.naver.com/inyou2025'

export function Footer() {
  return (
    <footer className="mt-auto bg-brand-deep text-brand-deep-foreground">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Logo tone="dark" />
            <address className="flex flex-col gap-1 text-sm not-italic text-white/80">
              <span>대표변호사 류남경</span>
              <span>{ADDRESS}</span>
            </address>
          </div>

          <nav aria-label="푸터 사이트맵" className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-white">사이트맵</p>
            <ul className="flex flex-col gap-2">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-white">상담·연락</p>
            <ul className="flex flex-col gap-2 text-sm text-white/80">
              <li>
                <Link
                  href={PHONE_HREF}
                  className="transition-colors hover:text-white"
                >
                  상담문의 {PHONE_DISPLAY}
                </Link>
              </li>
              <li>
                <Link
                  href={BLOG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 transition-colors hover:text-white"
                >
                  공식 블로그
                  <ExternalLink className="size-3.5" aria-hidden />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} 법무법인 인유 창원사무소. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
