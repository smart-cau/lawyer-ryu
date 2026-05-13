'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/utilities/ui'

import { isActiveRoute } from './nav-utils'
import { primaryNav, servicesNav } from './nav-data'

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="메뉴 열기">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 sm:max-w-sm p-0">
        <SheetHeader className="border-b border-border/60 px-6 py-4">
          <SheetTitle className="text-base">전체 메뉴</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col px-2 py-4">
          {primaryNav.map((item) => {
            const active = isActiveRoute(item.href, pathname)
            return item.hasSubmenu ? (
              <Accordion
                key={item.href}
                type="single"
                collapsible
                defaultValue={active ? item.href : undefined}
              >
                <AccordionItem value={item.href} className="border-b-0">
                  <AccordionTrigger
                    className={cn(
                      'px-4 py-3 text-base font-medium hover:no-underline',
                      active && 'text-primary font-semibold',
                    )}
                  >
                    {item.label}
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <div className="flex flex-col gap-4 px-4">
                      {servicesNav.map((category) => {
                        return (
                          <div key={category.slug} className="flex flex-col gap-1">
                            <span className="py-2 text-sm font-semibold text-foreground">
                              {category.label}
                            </span>
                            <ul className="flex flex-col">
                              {category.leaves.map((leaf) => {
                                const leafActive = isActiveRoute(leaf.href, pathname)
                                return (
                                  <li key={leaf.slug}>
                                    <SheetClose asChild>
                                      <Link
                                        href={leaf.href}
                                        className={cn(
                                          'block rounded-md py-2 pl-3 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                                          leafActive
                                            ? 'bg-accent/60 text-accent-foreground font-medium'
                                            : 'text-muted-foreground',
                                        )}
                                      >
                                        {leaf.label}
                                      </Link>
                                    </SheetClose>
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                        )
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <SheetClose key={item.href} asChild>
                <Link
                  href={item.href}
                  className={cn(
                    'rounded-md px-4 py-3 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                    active && 'text-primary font-semibold',
                  )}
                >
                  {item.label}
                </Link>
              </SheetClose>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
