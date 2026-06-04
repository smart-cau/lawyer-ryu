export type ServiceSubCategory = {
  slug: string
  label: string
  keywords: string[]
  // Bold definition sentence rendered before the detail groups.
  definition: string
  commonSituations: string[]
  keyIssues: string[]
  firstResponse: string[]
  attorneyRole: string[]
  relatedKeywords?: string[]
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

export type ServiceLeafContent = {
  title: string
  route: `/services/${string}`
  subCategories: {
    title: string
    lead?: string
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
