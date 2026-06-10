import type { PageTitleBarBreadcrumb } from '@/components/PageTitleBar'

const DEFAULT_TITLE_BAR_BG = {
  services: 'https://placehold.co/1920x600?text=Services+Background',
  cases: '/texture-bg.jpg',
  about: 'https://placehold.co/1920x600?text=About+Background',
} as const

const SERVICE_BG_BY_ROUTE: Record<string, string> = {
  '/services/sex-crime': '/services/title-bars/sex-crime.png',
  '/services/corporate-crime': '/services/title-bars/corporate-crime.png',
  '/services/property-crime': '/services/title-bars/property-crime.png',
}

const SEGMENT_LABELS: Record<string, string> = {
  services: '업무분야',
  cases: '성공사례',
}

// URL 그릇으로만 존재하고 자체 hub 페이지가 없는 segment — breadcrumb 중간에서 생략
const SKIP_SEGMENTS = new Set(['about'])

export function getBreadcrumbsFromRoute(
  route: string,
  currentTitle: string,
): PageTitleBarBreadcrumb[] {
  const allSegments = route.replace(/^\//, '').split('/').filter(Boolean)
  const lastIndex = allSegments.length - 1

  const breadcrumbs: PageTitleBarBreadcrumb[] = [{ label: '홈', href: '/' }]

  allSegments.forEach((segment, i) => {
    if (SKIP_SEGMENTS.has(segment) && i !== lastIndex) return

    const isLast = i === lastIndex
    const href = '/' + allSegments.slice(0, i + 1).join('/')
    const label = isLast ? currentTitle : (SEGMENT_LABELS[segment] ?? segment)

    breadcrumbs.push(isLast ? { label } : { label, href })
  })

  return breadcrumbs
}

export function getBgImageFromRoute(route: string): string {
  if (route.startsWith('/cases')) return DEFAULT_TITLE_BAR_BG.cases
  if (route.startsWith('/about')) return DEFAULT_TITLE_BAR_BG.about
  if (route in SERVICE_BG_BY_ROUTE) return SERVICE_BG_BY_ROUTE[route]
  return DEFAULT_TITLE_BAR_BG.services
}
