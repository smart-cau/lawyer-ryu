import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  SerializedUploadNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { cn } from '@/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<MediaBlockProps | BannerBlockProps | CodeBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'cases' ? `/cases/${slug}` : `/${slug}`
}

/**
 * 미디어 문서에 대체 텍스트가 비어 있으면 기본 변환기는 `alt=""`를 내보낸다.
 * SEO 검사기는 이를 alt 누락으로 집계하므로, 페이지가 넘긴 대체 문구를 채워 넣는다.
 */
const withFallbackAlt = (node: SerializedUploadNode, fallbackAlt: string): SerializedUploadNode => {
  const docAlt =
    typeof node.value === 'object' && node.value !== null && 'alt' in node.value
      ? node.value.alt
      : undefined
  const fieldAlt = (node.fields as { alt?: string } | undefined)?.alt
  if (fieldAlt || docAlt) return node
  return { ...node, fields: { ...(node.fields ?? {}), alt: fallbackAlt } }
}

const createJsxConverters =
  (fallbackImageAlt?: string): JSXConvertersFunction<NodeTypes> =>
  ({ defaultConverters }) => ({
    ...defaultConverters,
    ...LinkJSXConverter({ internalDocToHref }),
    ...(fallbackImageAlt
      ? {
          upload: (args) => {
            const uploadConverter = defaultConverters.upload
            if (typeof uploadConverter !== 'function') return uploadConverter
            return uploadConverter({ ...args, node: withFallbackAlt(args.node, fallbackImageAlt) })
          },
        }
      : {}),
    blocks: {
      banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
      mediaBlock: ({ node }) => (
        <MediaBlock
          className="col-start-1 col-span-3"
          imgClassName="m-0"
          {...node.fields}
          captionClassName="mx-auto max-w-[48rem]"
          enableGutter={false}
          disableInnerContainer={true}
        />
      ),
      code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    },
  })

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
  /** 본문 업로드 이미지의 alt가 비어 있을 때 대신 쓸 문구 */
  fallbackImageAlt?: string
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, fallbackImageAlt, ...rest } = props
  return (
    <ConvertRichText
      converters={createJsxConverters(fallbackImageAlt)}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose-lg': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
