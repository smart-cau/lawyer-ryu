export type ServiceSubCategory = {
  slug: string
  label: string
  keywords: string[]
  // Bold definition phrase rendered before the detail groups.
  definition: string
  commonSituations: string[]
  keyIssues: string[]
  firstResponse: string[]
  attorneyRole: string[]
  relatedKeywords?: string[]
  relatedLink?: {
    href: `/services/${string}`
    label: string
  }
}

export type AttorneyStrength = {
  heading: string
  body: string[]
}

export type AttorneyProfile = {
  name: string
  affiliation: string
  photo: {
    src: string
    alt: string
    width: number
    height: number
  }
}

export type ServiceFaqItem = {
  question: string
  answer: string
}

export type ImmediateActionItem = {
  heading: string
  body: string
}

export type ServiceLeafContent = {
  title: string
  route: `/services/${string}`
  immediateActions?: {
    title: string
    lead: string
    items: ImmediateActionItem[]
    note?: string
  }
  subCategories: {
    title: string
    lead?: string
    detailLabels?: Partial<
      Record<'commonSituations' | 'keyIssues' | 'firstResponse' | 'attorneyRole', string>
    >
    items: ServiceSubCategory[]
  }
  whyAttorney: {
    title: string
    profile: AttorneyProfile
    items: AttorneyStrength[]
    detailHref?: string
    detailLabel?: string
  }
  faq: {
    title: string
    items: ServiceFaqItem[]
  }
  footerCta: {
    title: string
    lead: string
    phoneHref?: string
    buttonLabel?: string
  }
}
