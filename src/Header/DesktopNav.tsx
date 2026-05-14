'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/utilities/ui'

import { isActiveRoute } from './nav-utils'
import { primaryNav, servicesNav, type ServiceCategory } from './nav-data'

function CategoryColumn({
  category,
  pathname,
  columns,
  withDivider,
}: {
  category: ServiceCategory
  pathname: string
  columns: 1 | 2
  withDivider: boolean
}) {
  return (
    <div className={cn('flex flex-col gap-3', withDivider && 'border-l border-border pl-8')}>
      <span className="text-base font-semibold text-foreground">{category.label}</span>
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
                    'block rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                    active
                      ? 'bg-accent/60 text-accent-foreground font-medium'
                      : 'text-muted-foreground',
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

function ServicesMegaMenu({ pathname }: { pathname: string }) {
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
          />
        ))}
      </div>
    </NavigationMenuContent>
  )
}

const darkToneTrigger =
  'bg-transparent text-white hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white'

export function DesktopNav({
  tone = 'light',
  onMenuOpenChangeAction,
}: {
  tone?: 'light' | 'dark'
  onMenuOpenChangeAction?: (open: boolean) => void
}) {
  const pathname = usePathname()
  const isDark = tone === 'dark'
  const [openValue, setOpenValue] = useState('')

  useEffect(() => {
    onMenuOpenChangeAction?.(openValue !== '')
  }, [openValue, onMenuOpenChangeAction])

  return (
    <NavigationMenu
      className="hidden md:flex"
      value={openValue}
      onValueChange={setOpenValue}
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
                      'transition-colors',
                      isDark && darkToneTrigger,
                      active && (isDark ? 'font-semibold' : 'text-primary font-semibold'),
                    )}
                  >
                    {item.label}
                  </NavigationMenuTrigger>
                  <ServicesMegaMenu pathname={pathname} />
                </>
              ) : (
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'transition-colors',
                    isDark && darkToneTrigger,
                    active && (isDark ? 'font-semibold' : 'text-primary font-semibold'),
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
