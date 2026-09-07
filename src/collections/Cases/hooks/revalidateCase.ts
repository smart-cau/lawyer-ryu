import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Case } from '../../../payload-types'

export const revalidateCase: CollectionAfterChangeHook<Case> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/cases/${doc.slug}`

      payload.logger.info(`Revalidating case at path: ${path}`)

      revalidatePath(path)
      revalidateTag('cases-sitemap', 'max')
    }

    // 게시를 내렸거나, 게시 상태에서 slug가 바뀌면 옛 경로가 캐시에 남아 옛 내용을
    // 계속 보여준다. 두 경우 모두 옛 경로를 지워 404로 돌아가게 한다.
    const wasUnpublished = previousDoc._status === 'published' && doc._status !== 'published'
    const slugChanged =
      previousDoc._status === 'published' &&
      doc._status === 'published' &&
      previousDoc.slug !== doc.slug

    if (wasUnpublished || slugChanged) {
      const oldPath = `/cases/${previousDoc.slug}`

      payload.logger.info(`Revalidating old case at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('cases-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Case> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/cases/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('cases-sitemap', 'max')
  }

  return doc
}
