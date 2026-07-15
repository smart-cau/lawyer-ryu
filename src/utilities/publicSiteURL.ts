const normalizeSiteURL = (value?: string): URL | null => {
  const trimmedValue = value?.trim()

  if (!trimmedValue) return null

  try {
    const url = new URL(
      /^https?:\/\//i.test(trimmedValue) ? trimmedValue : `https://${trimmedValue}`,
    )

    return new URL(url.origin)
  } catch {
    return null
  }
}

export const isPreviewDeployment = () =>
  process.env.VERCEL_ENV === 'preview' || process.env.VERCEL_TARGET_ENV === 'preview'

export const getConfiguredPublicSiteURL = (): URL | null => {
  if (isPreviewDeployment()) return null

  return (
    normalizeSiteURL(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    normalizeSiteURL(process.env.NEXT_PUBLIC_SERVER_URL)
  )
}

export const getSitemapSiteURL = (): URL | null => {
  const configuredURL = getConfiguredPublicSiteURL()

  if (configuredURL) return configuredURL
  if (process.env.NODE_ENV === 'development') return new URL('http://localhost:3000')

  return null
}

export const isIndexingEnabled = () =>
  process.env.NODE_ENV === 'production' && getConfiguredPublicSiteURL() !== null
