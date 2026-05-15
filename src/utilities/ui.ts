/**
 * Utility functions for UI components automatically added by ShadCN and used in a few of our frontend components and blocks.
 *
 * Other functions may be exported from here in the future or by installing other shadcn components.
 */

import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// 한국형 typo 토큰(globals.css의 --text-*)을 font-size 그룹에 등록.
// 등록하지 않으면 twMerge가 text-caption-1 같은 클래스를 text-color로
// 잘못 분류해, 같은 cn() 호출 안의 text-foreground 등과 충돌해 stripped 됨.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-display-1',
        'text-display-2',
        'text-display-3',
        'text-title-1',
        'text-title-2',
        'text-title-3',
        'text-heading-1',
        'text-heading-2',
        'text-headline-1',
        'text-headline-2',
        'text-body-1',
        'text-body-1-reading',
        'text-body-2',
        'text-body-2-reading',
        'text-label-1',
        'text-label-1-reading',
        'text-label-2',
        'text-caption-1',
        'text-caption-2',
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
