'use client'

import { Input } from '@/components/ui/input'
import { cn } from '@/utilities/ui'
import { useDebounce } from '@/utilities/useDebounce'
import { Check, Search as SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

export type CategoryOption = {
  id: number | string
  title: string
  slug: string
}

export const CasesToolbar: React.FC<{ categories: CategoryOption[] }> = ({ categories }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeCategory = searchParams.get('category') ?? ''
  const [value, setValue] = useState(searchParams.get('q') ?? '')
  const debouncedValue = useDebounce(value, 300)

  // 현재 searchParams를 보존하면서 일부 키만 갱신/삭제한 href 생성
  // (page는 필터·검색이 바뀌면 1페이지로 리셋되도록 항상 제거)
  const buildHref = useCallback(
    (next: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString())
      for (const [key, val] of Object.entries(next)) {
        if (val) params.set(key, val)
        else params.delete(key)
      }
      params.delete('page')
      const qs = params.toString()
      return qs ? `${pathname}?${qs}` : pathname
    },
    [pathname, searchParams],
  )

  // 디바운스된 검색어를 URL에 반영 (이미 동기화돼 있으면 skip — 루프 방지)
  useEffect(() => {
    const current = searchParams.get('q') ?? ''
    if (debouncedValue === current) return
    router.push(buildHref({ q: debouncedValue || null }), { scroll: false })
  }, [debouncedValue, searchParams, router, buildHref])

  // 엔터·검색 버튼: 디바운스를 기다리지 않고 즉시 반영
  const submitSearch = () => {
    router.push(buildHref({ q: value || null }), { scroll: false })
  }

  return (
    <div className="flex flex-col gap-8">
      {/* 검색 */}
      <form
        className="relative mx-auto flex w-full max-w-2xl items-center"
        onSubmit={(event) => {
          event.preventDefault()
          submitSearch()
        }}
      >
        <Input
          aria-label="성공사례 검색"
          className="text-body-1 h-14 rounded-full border-border bg-background pr-28 pl-6 shadow-sm focus-visible:ring-brand-deep/30"
          onChange={(event) => setValue(event.target.value)}
          placeholder="성공사례를 검색해 보세요"
          type="search"
          value={value}
        />
        <button
          aria-label="검색"
          className="bg-brand-deep text-brand-deep-foreground hover:bg-brand-deep/90 absolute right-2 inline-flex h-11 items-center gap-2 rounded-full px-5 text-label-1 font-semibold transition-colors"
          type="submit"
        >
          <SearchIcon aria-hidden className="size-4" />
          검색
        </button>
      </form>

      {/* 분야 필터 */}
      <nav
        aria-label="분야 필터"
        className="flex items-center gap-1 overflow-x-auto border-t border-border pt-4 lg:justify-between"
      >
        <CategoryPill
          active={activeCategory === ''}
          href={buildHref({ category: null })}
          label="전체"
        />
        {categories.map((category) => {
          const isActive = activeCategory === category.slug
          return (
            <CategoryPill
              key={category.id}
              active={isActive}
              href={buildHref({ category: isActive ? null : category.slug })}
              label={category.title}
            />
          )
        })}
      </nav>
    </div>
  )
}

const CategoryPill: React.FC<{ active: boolean; href: string; label: string }> = ({
  active,
  href,
  label,
}) => (
  <Link
    aria-current={active ? 'true' : undefined}
    className={cn(
      'inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-body-2 font-medium whitespace-nowrap transition-colors',
      active
        ? 'bg-brand-deep text-brand-deep-foreground font-semibold'
        : 'text-muted-foreground hover:text-foreground',
    )}
    href={href}
  >
    {active && <Check aria-hidden className="size-4" />}
    {label}
  </Link>
)
