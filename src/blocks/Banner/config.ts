import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Banner: Block = {
  slug: 'banner',
  labels: {
    singular: '배너',
    plural: '배너',
  },
  fields: [
    {
      name: 'style',
      label: '스타일',
      type: 'select',
      defaultValue: 'info',
      options: [
        { label: '정보', value: 'info' },
        { label: '주의', value: 'warning' },
        { label: '오류', value: 'error' },
        { label: '성공', value: 'success' },
      ],
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      label: false,
      required: true,
    },
  ],
  interfaceName: 'BannerBlock',
}
