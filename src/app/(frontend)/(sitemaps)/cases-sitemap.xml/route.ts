import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

import { getSitemapSiteURL } from '@/utilities/publicSiteURL'

const escapeXML = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

const createSitemapResponse = (entries: Array<{ loc: string; lastmod?: string }>) => {
  const urls = entries
    .map(({ loc, lastmod }) => {
      const lastModified = lastmod ? `<lastmod>${escapeXML(lastmod)}</lastmod>` : ''

      return `<url><loc>${escapeXML(loc)}</loc>${lastModified}</url>`
    })
    .join('')

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'Content-Type': 'application/xml; charset=utf-8',
      },
    },
  )
}

const getCasesSitemap = unstable_cache(
  async () => {
    const siteURL = getSitemapSiteURL()

    if (!siteURL) return []

    const payload = await getPayload({ config })

    const results = await payload.find({
      collection: 'cases',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs
          .filter((c) => Boolean(c?.slug))
          .map((c) => ({
            loc: new URL(`/cases/${c.slug}`, siteURL).toString(),
            lastmod: c.updatedAt || dateFallback,
          }))
      : []

    return sitemap
  },
  ['cases-sitemap'],
  {
    tags: ['cases-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getCasesSitemap()

  return createSitemapResponse(sitemap)
}
