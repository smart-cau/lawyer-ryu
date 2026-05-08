export type ServiceLeaf = {
  label: string
  slug: string
  href: string
}

export type ServiceCategory = {
  label: string
  slug: 'criminal' | 'non-criminal'
  href: string
  leaves: ServiceLeaf[]
}

export type PrimaryNavItem = {
  label: string
  href: string
  hasSubmenu?: boolean
}

export const servicesNav: ServiceCategory[] = [
  {
    label: '형사전문',
    slug: 'criminal',
    href: '/services/criminal',
    leaves: [
      { label: '성범죄', slug: 'sex-crime', href: '/services/criminal/sex-crime' },
      {
        label: '기업 관련 범죄',
        slug: 'corporate-crime',
        href: '/services/criminal/corporate-crime',
      },
      {
        label: '재산범죄',
        slug: 'property-crime',
        href: '/services/criminal/property-crime',
      },
      {
        label: '음주운전·교통범죄',
        slug: 'traffic-crime',
        href: '/services/criminal/traffic-crime',
      },
      {
        label: '아동학대·학교폭력',
        slug: 'school-violence',
        href: '/services/criminal/school-violence',
      },
      {
        label: '일반 형사',
        slug: 'general-criminal',
        href: '/services/criminal/general-criminal',
      },
      {
        label: '반부패 범죄',
        slug: 'anti-corruption',
        href: '/services/criminal/anti-corruption',
      },
      {
        label: '조사·구속 대응',
        slug: 'investigation',
        href: '/services/criminal/investigation',
      },
    ],
  },
  {
    label: '민사·가사·행정',
    slug: 'non-criminal',
    href: '/services/non-criminal',
    leaves: [
      {
        label: '민사·가사',
        slug: 'civil-family',
        href: '/services/non-criminal/civil-family',
      },
      {
        label: '행정',
        slug: 'administrative',
        href: '/services/non-criminal/administrative',
      },
    ],
  },
]

export const primaryNav: PrimaryNavItem[] = [
  { label: '변호사 소개', href: '/about/lawyer' },
  { label: '업무분야', href: '/services', hasSubmenu: true },
  { label: '성공사례', href: '/cases' },
]
