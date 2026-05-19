'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

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

const navUnderline =
  "relative after:absolute after:h-px after:origin-left after:scale-x-0 after:bg-brand-gold after:content-[''] after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100"

const topLevelNavItem =
  "bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent after:left-4 after:right-4 after:bottom-1 data-[state=open]:after:scale-x-100"

const dropdownLink =
  "block rounded-none px-3 py-2 text-label-1 transition-colors after:left-3 after:right-3 after:bottom-1.5"

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
                    navUnderline,
                    dropdownLink,
                    isDark ? 'hover:text-white' : 'hover:text-foreground',
                    active &&
                      (isDark
                        ? 'text-white font-medium after:scale-x-100'
                        : 'text-foreground font-medium after:scale-x-100'),
                    !active && (isDark ? 'text-white/70' : 'text-muted-foreground'),
                  )}
                >
                  {leaf.label}
                </Link>
              </NavigationMenuLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function ServicesMegaMenu({ pathname, tone }: { pathname: string; tone: NavTone }) {
  return (
    <NavigationMenuContent>
      <div className="grid w-[680px] grid-cols-[1.6fr_1fr] gap-8 p-6">
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
                      navUnderline,
                      topLevelNavItem,
                      'text-body-1 transition-colors',
                      isDark
                        ? darkToneTrigger
                        : 'hover:text-primary focus:text-primary',
                      active &&
                        (isDark
                          ? 'font-semibold after:scale-x-100'
                          : 'text-primary font-semibold after:scale-x-100'),
                    )}
                  >
                    {item.label}
                  </NavigationMenuTrigger>
                  <ServicesMegaMenu pathname={pathname} tone={tone} />
                </>
              ) : (
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navUnderline,
                    topLevelNavItem,
                    'inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-body-1 font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                    isDark
                      ? darkToneTrigger
                      : 'text-foreground hover:text-primary focus:text-primary',
                    active &&
                      (isDark
                        ? 'font-semibold after:scale-x-100'
                        : 'text-primary font-semibold after:scale-x-100'),
                  )}
                >
                  <Link href={item.href}>{item.label}</Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
