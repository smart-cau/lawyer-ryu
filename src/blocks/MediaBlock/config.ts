import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  labels: {
    singular: '미디어',
    plural: '미디어',
  },
  fields: [
    {
      name: 'media',
      label: '미디어 파일',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
