# Sex-Crime Leaf Example

This is the pattern implemented in `src/app/(frontend)/services/sex-crime/_data/sub-categories.ts`.

Use it as a structural example only. Do not copy sex-crime sentences into other leaf pages.

```ts
{
  slug: 'assault',
  label: '강제추행·일반 성범죄',
  keywords: ['강제추행'],
  definition:
    '강제추행 사건은 원치 않는 신체 접촉의 경위와 고의성, 피해자 진술의 신빙성이 핵심이 되는 성범죄 사건입니다.',
  commonSituations: [
    '회식, 술자리, 지인 모임에서의 신체 접촉이 신고로 이어진 경우',
    '대중교통, 길거리, 직장 등 공공장소에서 우발적 접촉인지 추행인지 다투는 경우',
  ],
  keyIssues: [
    '접촉 부위와 시간, 당시 거리, 주변 동선, 목격자·CCTV 등 객관 자료',
    '피해자 진술의 일관성, 사후 대화 내용, 고의성 부인 가능성',
  ],
  firstResponse: [
    '경찰 조사 전 접촉 전후의 말과 행동을 시간순으로 정리해야 합니다.',
    '피해자에게 직접 연락하거나 감정적으로 해명하기보다 증거 보존과 진술 방향을 먼저 검토해야 합니다.',
  ],
  attorneyRole: [
    '조사에서 불필요한 인정이나 모순된 해명이 나오지 않도록 진술 범위를 정리합니다.',
    '합의가 필요한 사안인지, 혐의 자체를 다툴 사안인지 초기 단계에서 구분합니다.',
  ],
  relatedKeywords: ['강제추행 변호사', '강제추행 경찰조사', '공중밀집장소추행'],
}
```

Key transferable lessons:

- Concrete situations come before abstract law.
- The visitor’s immediate mistake risk is named directly.
- Attorney role is procedural and evidentiary, not boastful.
- Search phrases appear naturally in scope and context, not as repeated SEO text.

