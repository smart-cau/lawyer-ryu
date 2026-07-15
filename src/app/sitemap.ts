import type { MetadataRoute } from 'next'

import {
  CRIMINAL_LEAVES,
  NON_CRIMINAL_LEAVES,
} from '@/app/(frontend)/services/_data/leaves'
import { getSitemapSiteURL } from '@/utilities/publicSiteURL'

const STATIC_ROUTES = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/about/lawyer', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
  ...[...CRIMINAL_LEAVES, ...NON_CRIMINAL_LEAVES].map(({ slug }) => ({
    path: `/services/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  })),
  { path: '/cases', changeFrequency: 'weekly', priority: 0.8 },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const siteURL = getSitemapSiteURL()

  if (!siteURL) return []

  return STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, siteURL).toString(),
    changeFrequency,
    priority,
  }))
}
