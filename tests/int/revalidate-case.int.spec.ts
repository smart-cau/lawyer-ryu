import type { Case } from '@/payload-types'

import { revalidateCase } from '@/collections/Cases/hooks/revalidateCase'

import { afterEach, describe, expect, it, vi } from 'vitest'

const { revalidatePath, revalidateTag } = vi.hoisted(() => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}))

vi.mock('next/cache', () => ({ revalidatePath, revalidateTag }))

const caseDoc = (overrides: Partial<Case>): Case =>
  ({ id: 1, slug: 'old-slug', _status: 'published', ...overrides }) as Case

const runHook = ({ doc, previousDoc }: { doc: Case; previousDoc: Case }) =>
  revalidateCase({
    doc,
    previousDoc,
    req: { payload: { logger: { info: vi.fn() } }, context: {} },
  } as unknown as Parameters<typeof revalidateCase>[0])

describe('성공사례 revalidate 훅', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('게시 상태에서 slug가 바뀌면 옛 경로도 revalidate한다', () => {
    runHook({
      doc: caseDoc({ slug: 'new-slug' }),
      previousDoc: caseDoc({ slug: 'old-slug' }),
    })

    expect(revalidatePath).toHaveBeenCalledWith('/cases/new-slug')
    expect(revalidatePath).toHaveBeenCalledWith('/cases/old-slug')
  })

  it('slug가 그대로면 현재 경로만 revalidate한다', () => {
    runHook({
      doc: caseDoc({ slug: 'same-slug' }),
      previousDoc: caseDoc({ slug: 'same-slug' }),
    })

    expect(revalidatePath).toHaveBeenCalledTimes(1)
    expect(revalidatePath).toHaveBeenCalledWith('/cases/same-slug')
  })

  it('게시를 내리면 옛 경로를 revalidate한다', () => {
    runHook({
      doc: caseDoc({ _status: 'draft' }),
      previousDoc: caseDoc({ _status: 'published' }),
    })

    expect(revalidatePath).toHaveBeenCalledTimes(1)
    expect(revalidatePath).toHaveBeenCalledWith('/cases/old-slug')
  })

  it('초안끼리의 변경은 아무 경로도 revalidate하지 않는다', () => {
    runHook({
      doc: caseDoc({ _status: 'draft', slug: 'new-slug' }),
      previousDoc: caseDoc({ _status: 'draft', slug: 'old-slug' }),
    })

    expect(revalidatePath).not.toHaveBeenCalled()
    expect(revalidateTag).not.toHaveBeenCalled()
  })
})
