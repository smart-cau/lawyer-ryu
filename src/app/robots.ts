import type { MetadataRoute } from 'next'

import {
  getConfiguredPublicSiteURL,
  isIndexingEnabled,
} from '@/utilities/publicSiteURL'

const DISALLOWED_PATHS = ['/admin', '/api', '/next/preview', '/next/exit-preview', '/search']

export default function robots(): MetadataRoute.Robots {
  const siteURL = getConfiguredPublicSiteURL()

  if (!isIndexingEnabled() || !siteURL) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: DISALLOWED_PATHS,
    },
    sitemap: [
      new URL('/sitemap.xml', siteURL).toString(),
      new URL('/cases-sitemap.xml', siteURL).toString(),
    ],
    host: siteURL.origin,
  }
}
