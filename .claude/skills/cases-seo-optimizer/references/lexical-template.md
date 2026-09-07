# Lexical 본문 템플릿

`updateCases`의 `content`는 root 전체 교체다. 아래 노드 템플릿으로 본문을 새로 조립한다. 에디터 설정(`src/collections/Cases/index.ts`)상 h1~h4·quote·mediaBlock·Banner·Code·표가 허용되지만, 이 skill은 h2/h3·paragraph·mediaBlock·quote만 쓴다.

## 표준 골격

```
[mediaBlock: 대표 이미지 (원문 최상단 이미지가 있던 경우)]
h2: 사건 개요
paragraph × 2~4
h2: 변호 전략          ← 쟁점이 여럿이면 h3로 세분
paragraph …
[mediaBlock: 처분 결과 문서 등 원문의 중간 이미지]
h2: 결과
paragraph …
h2: 이 사건이 말해주는 것   ← "한마디" 섹션의 대체. 제목은 글에 맞게 조정
paragraph …
```

- 페이지 h1은 글 제목이 담당하므로 본문에 h1을 쓰지 않는다.
- 섹션 제목을 `[ 사건 개요 ]`처럼 괄호로 감싸거나 quote로 만들지 않는다.
- 원문의 mediaBlock은 media id를 보존해 의미가 맞는 섹션에 배치한다. 개수가 줄면 안 된다.

## 노드 템플릿

### h2 heading

```json
{
  "type": "heading",
  "tag": "h2",
  "format": "",
  "indent": 0,
  "version": 1,
  "direction": "ltr",
  "children": [
    { "mode": "normal", "text": "사건 개요", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1 }
  ]
}
```

h3는 `"tag": "h3"`만 다르다.

### paragraph (왼쪽 정렬, 완결된 문장들)

```json
{
  "type": "paragraph",
  "format": "",
  "indent": 0,
  "version": 1,
  "direction": "ltr",
  "textStyle": "",
  "textFormat": 0,
  "children": [
    { "mode": "normal", "text": "한 문단은 2~4개의 완결된 문장으로 구성한다.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1 }
  ]
}
```

- `format: ""`이 왼쪽 정렬이다. 원문의 `"center"`를 복사해오지 말 것.
- 강조는 text 노드의 `"format": 1`(bold). 문단 전체 bold는 금지 — 핵심 어구에만.
- 빈 줄 문단(children 비었거나 U+200B만 있는 것)은 만들지 않는다. 문단 간격은 렌더러가 처리한다.

### mediaBlock (기존 이미지 보존)

```json
{
  "type": "block",
  "format": "",
  "version": 2,
  "fields": {
    "id": "<원문 노드의 fields.id 그대로>",
    "media": 9,
    "blockName": "",
    "blockType": "mediaBlock"
  }
}
```

`media`는 기존 media 문서 id를 그대로 쓴다. `fields.id`도 원문 값을 재사용한다.

### quote (실제 인용에만)

처분서 문구, 판결 요지 등 진짜 인용에만 사용. 섹션 제목 용도 금지.

```json
{
  "type": "quote",
  "format": "",
  "indent": 0,
  "version": 1,
  "direction": "ltr",
  "children": [ /* paragraph 노드들 */ ]
}
```

### root 래퍼

```json
{
  "root": {
    "type": "root",
    "format": "",
    "indent": 0,
    "version": 1,
    "direction": "ltr",
    "children": [ /* 위 노드들 순서대로 */ ]
  }
}
```

## 함정 목록

- **한글은 `\uXXXX` 이스케이프가 아니라 그대로 쓴다.** 손으로 유니코드 코드포인트를 계산하면 글자가 조용히 깨진다(실제로 `빚어진`→`뺚어진`, `막아섰다가`→`막아섬다가`, `가볍고 뉘우치는`→`가벼고 뒤워치는` 사고가 났다). 저장 응답의 한국어를 반드시 눈으로 훑고, 렌더된 페이지 본문도 확인한다.
- **U+200B(zero-width space)**: 네이버 원문의 빈 줄 문단에 `​`로 들어 있다. 새 본문에 절대 옮기지 말 것. 육안으로 안 보이므로 최종 JSON을 문자열 검색으로 확인한다.
- **강제 줄바꿈 병합**: 원문은 한 문장이 4~8개 문단으로 쪼개져 있다. 문장 단위로 이어 붙인 뒤 의미 단위로 문단을 다시 나눈다.
- **version 값**: text/paragraph/heading/quote는 `1`, block은 `2`. 원문 값을 따른다.
- **direction**: 새로 쓰는 노드는 `"ltr"`. 원문의 `null`을 흉내 낼 필요 없다.
