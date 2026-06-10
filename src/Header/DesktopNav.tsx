'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/utilities/ui'

import { isActiveRoute } from './nav-utils'
import { primaryNav, servicesNav, type ServiceCategory } from './nav-data'

type NavTone = 'light' | 'dark'

const navTextUnderline =
  "relative inline-block after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-px after:origin-left after:scale-x-0 after:bg-brand-gold after:content-[''] after:transition-transform after:duration-300 after:ease-out group-hover/nav-link:after:scale-x-100 group-focus-visible/nav-link:after:scale-x-100 group-data-[state=open]/nav-link:after:scale-x-100"

const topLevelNavItem =
  'group/nav-link bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent'

const dropdownLink =
  'group/nav-link block rounded-none px-3 py-2 text-body-2 transition-colors'

function UnderlinedText({
  children,
  active,
}: {
  children: ReactNode
  active?: boolean
}) {
  return (
    <span className={cn(navTextUnderline, active && 'after:scale-x-100')}>
      {children}
    </span>
  )
}

function CategoryColumn({
  category,
  pathname,
  columns,
  withDivider,
  tone,
}: {
  category: ServiceCategory
  pathname: string
  columns: 1 | 2
  withDivider: boolean
  tone: NavTone
}) {
  const isDark = tone === 'dark'

  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        withDivider && (isDark ? 'border-l border-white/15 pl-8' : 'border-l border-border pl-8'),
      )}
    >
      <span className={cn('text-body-1 font-semibold', isDark ? 'text-white' : 'text-foreground')}>
        {category.label}
      </span>
      <ul
        className={cn(
          'grid gap-x-2 gap-y-1',
          columns === 2 ? 'grid-cols-2' : 'grid-cols-1',
        )}
      >
        {category.leaves.map((leaf) => {
          const active = isActiveRoute(leaf.href, pathname)
          return (
            <li key={leaf.slug}>
              <NavigationMenuLink asChild>
                <Link
                  href={leaf.href}
                  className={cn(
                    dropdownLink,
                    isDark ? 'hover:text-white' : 'hover:text-foreground',
                    active &&
                      (isDark
                        ? 'text-white font-medium'
                        : 'text-foreground font-medium'),
                    !active && (isDark ? 'text-white/70' : 'text-muted-foreground'),
                  )}
                >
                  <UnderlinedText active={active}>{leaf.label}</UnderlinedText>
                </Link>
              </NavigationMenuLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function ServicesMegaMenu({
  pathname,
  tone,
  overviewHref,
  overviewLabel,
}: {
  pathname: string
  tone: NavTone
  overviewHref: string
  overviewLabel: string
}) {
  const isDark = tone === 'dark'
  const overviewActive = pathname === overviewHref

  return (
    <NavigationMenuContent>
      <div className="w-[680px] p-6">
        <NavigationMenuLink asChild>
          <Link
            href={overviewHref}
            className={cn(
              'group/nav-link mb-5 block border-b pb-4 text-body-1 font-semibold transition-colors',
              isDark
                ? 'border-white/15 text-white/90 hover:text-white'
                : 'border-border text-foreground hover:text-primary',
              overviewActive &&
                (isDark
                  ? 'text-white'
                  : 'text-primary'),
            )}
          >
            <UnderlinedText active={overviewActive}>{overviewLabel}</UnderlinedText>
          </Link>
        </NavigationMenuLink>
        <div className="grid grid-cols-[1.6fr_1fr] gap-8">
          {servicesNav.map((category, idx) => (
            <CategoryColumn
              key={category.slug}
              category={category}
              pathname={pathname}
              columns={category.slug === 'criminal' ? 2 : 1}
              withDivider={idx > 0}
              tone={tone}
            />
          ))}
        </div>
      </div>
    </NavigationMenuContent>
  )
}

const darkToneTrigger =
  '!bg-transparent !text-white hover:!bg-transparent hover:!text-white focus:!bg-transparent focus:!text-white data-[state=open]:!bg-transparent data-[state=open]:!text-white data-[state=open]:hover:!bg-transparent data-[state=open]:focus:!bg-transparent'

export function DesktopNav({
  tone = 'light',
}: {
  tone?: NavTone
}) {
  const pathname = usePathname()
  const isDark = tone === 'dark'

  return (
    <NavigationMenu
      className="hidden md:flex"
      viewportClassName={cn(
        isDark && 'border-white/15 bg-brand-deep/95 text-white shadow-2xl shadow-black/25',
      )}
    >
      <NavigationMenuList>
        {primaryNav.map((item) => {
          const active = isActiveRoute(item.href, pathname)
          return (
            <NavigationMenuItem key={item.href}>
              {item.hasSubmenu ? (
                <>
                  <NavigationMenuTrigger
                    className={cn(
                      topLevelNavItem,
                      'text-headline-1 transition-colors',
                      isDark
                        ? darkToneTrigger
                        : 'hover:text-primary focus:text-primary',
                      active &&
                        (isDark
                          ? 'font-semibold'
                          : 'text-primary font-semibold'),
                    )}
                  >
                    <UnderlinedText active={active}>{item.label}</UnderlinedText>
                  </NavigationMenuTrigger>
                  <ServicesMegaMenu
                    pathname={pathname}
                    tone={tone}
                    overviewHref={item.href}
                    overviewLabel={item.overviewLabel ?? item.label}
                  />
                </>
              ) : (
                <NavigationMenuLink
                  asChild
                  className={cn(
                    topLevelNavItem,
                    'inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-headline-1 font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                    isDark
                      ? darkToneTrigger
                      : 'text-foreground hover:text-primary focus:text-primary',
                    active &&
                      (isDark
                        ? 'font-semibold'
                        : 'text-primary font-semibold'),
                  )}
                >
                  <Link href={item.href}>
                    <UnderlinedText active={active}>{item.label}</UnderlinedText>
                  </Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
