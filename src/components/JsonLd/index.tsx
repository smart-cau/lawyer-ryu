type JsonLdProps = {
  data: Record<string, unknown>
  id?: string
}

/**
 * 검색엔진이 페이지의 핵심 엔터티를 이해할 수 있도록 JSON-LD를 출력한다.
 * `<`를 유니코드로 치환해 스크립트 문맥에서의 HTML 삽입을 방지한다.
 */
export function JsonLd({ data, id }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')

  return <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
