import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateImage, GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Case } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Case> = ({ doc }) => {
  return doc?.title
    ? `${doc.title} | 법무법인 인유 창원사무소`
    : '법무법인 인유 창원사무소 | 대표변호사 류남경'
}

const generateURL: GenerateURL<Case> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/cases/${doc.slug}` : url
}

const generateImage: GenerateImage<Case> = ({ doc }) => {
  const hero = doc?.heroImage
  if (typeof hero === 'number') return hero
  if (hero && typeof hero === 'object' && 'id' in hero) return hero.id
  return ''
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['cases'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
    generateImage,
    uploadsCollection: 'media',
  }),
  searchPlugin({
    collections: ['cases'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
]
