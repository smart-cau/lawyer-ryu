import Link from 'next/link'

export type PageTitleBarBreadcrumb = {
  label: string
  href?: string
}

type Props = {
  title: string
  breadcrumbs: PageTitleBarBreadcrumb[]
  bgImage: string
}

export function PageTitleBar({ title, breadcrumbs, bgImage }: Props) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((bc, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: bc.label,
      ...(bc.href ? { item: bc.href } : {}),
    })),
  }

  const jsonLdHtml = JSON.stringify(jsonLd).replace(/</g, '\\u003c')

  return (
    <section
      aria-labelledby="page-title-bar-title"
      className="relative -mt-[6rem] overflow-hidden"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      <div className="container relative pt-[6rem]">
        <div className="flex min-h-[15rem] items-center justify-center md:min-h-[22.5rem]">
          <h1
            id="page-title-bar-title"
            className="text-center text-h1 font-semibold text-white"
          >
            {title}
          </h1>
        </div>

        <nav
          aria-label="breadcrumb"
          className="pb-6 md:absolute md:right-0 md:bottom-6 md:px-8 md:pb-0"
        >
          <ol className="flex flex-wrap items-center justify-center gap-2 text-caption text-white/70 md:justify-end">
            {breadcrumbs.map((bc, i) => {
              const isLast = i === breadcrumbs.length - 1
              return (
                <li key={`${bc.label}-${i}`} className="flex items-center gap-2">
                  {bc.href && !isLast ? (
                    <Link href={bc.href} className="transition-colors hover:text-white">
                      {bc.label}
                    </Link>
                  ) : (
                    <span
                      aria-current={isLast ? 'page' : undefined}
                      className="text-white"
                    >
                      {bc.label}
                    </span>
                  )}
                  {!isLast && (
                    <span aria-hidden="true" className="text-white/50">
                      &gt;
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml }}
      />
    </section>
  )
}
