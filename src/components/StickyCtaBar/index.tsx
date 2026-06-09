import { PhoneCall } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { KAKAO_TALK_CHAT_URL, NAVER_BLOG_URL, PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact-links'
import { cn } from '@/utilities/ui'

type StickyCtaAction = {
  id: string
  label: string
  mobileLabel: string
  ariaLabel: string
  href: string | null
  tooltip: string
  external?: boolean
  icon: ReactNode
  mobileIcon?: ReactNode
  value?: string
}

const actions: StickyCtaAction[] = [
  {
    id: 'phone',
    label: '상담전화',
    mobileLabel: '전화',
    ariaLabel: `상담전화 ${PHONE_DISPLAY}`,
    href: PHONE_HREF,
    tooltip: `상담전화 ${PHONE_DISPLAY}`,
    icon: (
      <span className="flex size-11 items-center justify-center rounded-full bg-brand-gold/15 text-brand-deep ring-1 ring-brand-gold/30">
        <PhoneCall aria-hidden data-icon="inline-start" />
      </span>
    ),
    mobileIcon: (
      <span className="flex size-9 items-center justify-center rounded-full bg-brand-gold/15 text-brand-deep ring-1 ring-brand-gold/30">
        <PhoneCall aria-hidden data-icon="inline-start" />
      </span>
    ),
    value: PHONE_DISPLAY,
  },
  {
    id: 'kakao',
    label: '카카오톡',
    mobileLabel: '카카오톡',
    ariaLabel: '카카오톡 상담',
    href: KAKAO_TALK_CHAT_URL,
    tooltip: KAKAO_TALK_CHAT_URL
      ? '카카오톡 상담으로 이동'
      : '카카오톡 채널 링크 확인 후 연결 예정',
    icon: (
      <span className="flex size-11 items-center justify-center overflow-hidden rounded-full bg-[#FEE500] ring-1 ring-[#FEE500]">
        <Image src="/social/kakaotalk.png" alt="" width={38} height={38} className="size-9" />
      </span>
    ),
    mobileIcon: (
      <span className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-[#FEE500] ring-1 ring-[#FEE500]">
        <Image src="/social/kakaotalk.png" alt="" width={32} height={32} className="size-8" />
      </span>
    ),
  },
  {
    id: 'blog',
    label: '블로그',
    mobileLabel: '블로그',
    ariaLabel: '네이버 블로그 새 창으로 열기',
    href: NAVER_BLOG_URL,
    tooltip: '네이버 공식 블로그',
    external: true,
    icon: (
      <span className="flex size-11 items-center justify-center rounded-full bg-white ring-1 ring-border">
        <Image src="/social/naver-blog.png" alt="" width={30} height={30} className="size-7" />
      </span>
    ),
    mobileIcon: (
      <span className="flex size-9 items-center justify-center rounded-full bg-white ring-1 ring-border">
        <Image src="/social/naver-blog.png" alt="" width={26} height={26} className="size-6" />
      </span>
    ),
  },
]

const desktopActionClass =
  'flex w-30 flex-col items-center justify-center gap-2.5 px-3 py-3.5 text-center text-foreground transition-[background-color,transform,color] duration-200 [letter-spacing:0] hover:bg-accent/70 hover:text-accent-foreground focus-visible:bg-accent focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring active:translate-y-px'

const mobileActionClass =
  'flex min-h-18 w-full flex-col items-center justify-center gap-1.5 px-2 py-2.5 text-label-2 font-semibold [letter-spacing:0] transition-[background-color,transform,color] duration-200 hover:bg-accent/70 hover:text-accent-foreground focus-visible:bg-accent focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring active:translate-y-px'

function ActionContent({ action, mobile = false }: { action: StickyCtaAction; mobile?: boolean }) {
  return (
    <>
      {mobile && action.mobileIcon ? action.mobileIcon : action.icon}
      <span className="flex flex-col items-center gap-0.5">
        <span
          className={cn(mobile ? 'text-label-2' : 'text-label-1', 'font-semibold leading-none')}
        >
          {mobile ? action.mobileLabel : action.label}
        </span>
        {!mobile && action.value ? (
          <span className="font-mono text-caption-1 font-semibold leading-tight text-muted-foreground">
            {action.value}
          </span>
        ) : null}
      </span>
    </>
  )
}

function DesktopAction({ action }: { action: StickyCtaAction }) {
  const disabled = !action.href

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {disabled ? (
          <span
            role="link"
            aria-disabled="true"
            aria-label={action.tooltip}
            tabIndex={0}
            className={cn(desktopActionClass, 'cursor-not-allowed text-muted-foreground')}
          >
            <ActionContent action={action} />
          </span>
        ) : (
          <Button asChild variant="ghost" size="clear" className={desktopActionClass}>
            <Link
              href={action.href}
              aria-label={action.ariaLabel}
              target={action.external ? '_blank' : undefined}
              rel={action.external ? 'noopener noreferrer' : undefined}
            >
              <ActionContent action={action} />
            </Link>
          </Button>
        )}
      </TooltipTrigger>
      <TooltipContent side="left">{action.tooltip}</TooltipContent>
    </Tooltip>
  )
}

function MobileAction({ action }: { action: StickyCtaAction }) {
  const disabled = !action.href

  if (disabled) {
    return (
      <span
        role="link"
        aria-disabled="true"
        aria-label={action.tooltip}
        tabIndex={0}
        className={cn(mobileActionClass, 'cursor-not-allowed text-muted-foreground')}
      >
        <ActionContent action={action} mobile />
      </span>
    )
  }

  return (
    <Button asChild variant="ghost" size="clear" className={mobileActionClass}>
      <Link
        href={action.href}
        aria-label={action.ariaLabel}
        target={action.external ? '_blank' : undefined}
        rel={action.external ? 'noopener noreferrer' : undefined}
      >
        <ActionContent action={action} mobile />
      </Link>
    </Button>
  )
}

export function StickyCtaBar() {
  return (
    <>
      <TooltipProvider delayDuration={120}>
        <aside
          aria-label="빠른 상담 링크"
          className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 overflow-hidden rounded-l-lg border border-r-0 border-border/80 bg-background/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/85 lg:block"
        >
          <nav className="flex flex-col" aria-label="빠른 상담">
            {actions.map((action, index) => (
              <div key={action.id} className="flex flex-col">
                {index > 0 ? <Separator /> : null}
                <DesktopAction action={action} />
              </div>
            ))}
          </nav>
        </aside>

        <aside
          aria-label="빠른 상담 링크"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_32px_rgba(15,23,42,0.14)] backdrop-blur supports-[backdrop-filter]:bg-background/90 lg:hidden"
        >
          <nav className="grid grid-cols-3 divide-x divide-border/80" aria-label="빠른 상담">
            {actions.map((action) => (
              <MobileAction key={action.id} action={action} />
            ))}
          </nav>
        </aside>
      </TooltipProvider>
      <div aria-hidden className="h-[calc(4.5rem+env(safe-area-inset-bottom))] lg:hidden" />
    </>
  )
}
