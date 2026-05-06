# 구조화 데이터(JSON-LD) 스펙

> Google는 JSON-LD 형식을 권장. 스크립트는 `<head>` 또는 `<body>` 어디든 가능.
> 본 문서는 1차 개발 범위에서 적용할 JSON-LD 템플릿을 정의한다. 실제 빌드 시점에 빌더(`/lib/seo/jsonld.ts` 등)에서 주입.
> 출처: [Google structured data 가이드](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
>
> **1차 적용 스키마**: WebSite, LegalService+LocalBusiness, Person+Attorney, Service, BreadcrumbList, Article(M-02 사례용)
> 1차 페이지별 매핑은 `scope-v1-contract.md` §6 참고. **분야는 옵션 D 6개** (S-01·S-02·S-03·S-05·S-08·S-09).
>
> 최종 업데이트: 2026-05-05

---

## 0. 권장 형식 — JSON-LD 단일

| 정책 | 결정 |
|------|------|
| 형식 | **JSON-LD** ([Google 권장](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)) |
| 어휘 | schema.org |
| 위치 | `<head>` 내부 `<script type="application/ld+json">` |
| 검증 | 배포 전 [Rich Results Test](https://search.google.com/test/rich-results), 배포 후 Search Console |
| 원칙 | 페이지에 **실제로 표시되는 정보만** 마크업 (Google 가이드 §Don't) |

---

## 1. 사이트 전역 — `WebSite` (모든 페이지)

목적: 사이트명·검색박스 정상 노출, 브랜드 검색 SERP 개선.

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "법무법인 인유 창원사무소",
  "alternateName": "류남경 변호사 / LAWFIRM IN-YOU 창원",
  "url": "https://{도메인}/",
  "inLanguage": "ko-KR",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://{도메인}/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

> ⚠ SearchAction은 사이트 검색 기능이 **실제로 존재**할 때만 포함. 없다면 제거.

---

## 2. 사무소 — `LegalService` + `LocalBusiness` (홈 / About / Contact)

목적: Google Business Profile과 정합되는 로컬 SEO. "창원 변호사"·"법무법인 인유 창원" SERP에서 사이드바 카드 노출 후보.

```json
{
  "@context": "https://schema.org",
  "@type": ["LegalService", "LocalBusiness"],
  "name": "법무법인 인유 창원사무소",
  "alternateName": "LAWFIRM IN-YOU Changwon",
  "image": "https://{도메인}/og/firm.jpg",
  "url": "https://{도메인}/",
  "telephone": "+82-10-7552-0301",
  "priceRange": "₩₩",
  "areaServed": [
    { "@type": "City", "name": "창원시" },
    { "@type": "City", "name": "김해시" },
    { "@type": "City", "name": "양산시" },
    { "@type": "City", "name": "거제시" },
    { "@type": "AdministrativeArea", "name": "경상남도" }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "KR",
    "addressRegion": "경상남도",
    "addressLocality": "창원시 성산구",
    "streetAddress": "창이대로689번길 4-24, 5층 504호"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "{확인 필요 — 카카오/네이버 지도 좌표 조회 후 채움}",
    "longitude": "{확인 필요}"
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00",
    "closes": "18:00"
  }],
  "founder": {
    "@type": "Person",
    "name": "류남경"
  },
  "knowsAbout": [
    "성범죄", "성폭력", "강제추행", "준강간", "디지털성범죄",
    "기술유출", "영업비밀", "지적재산권",
    "조세범죄", "공정거래", "다중피해범죄", "보이스피싱", "전세사기",
    "음주운전", "명예훼손", "국민참여재판",
    "횡령", "배임", "특정경제범죄가중처벌법"
  ],
  "sameAs": [
    "https://blog.naver.com/inyou2025",
    "http://inyoulaw.com/"
  ]
}
```

⚠ 보강 필요한 값(현재 미확인):
- `geo.latitude` / `geo.longitude` — 카카오/네이버 지도에서 도로명 주소 좌표 조회 후 채움
- 사무소 유선전화·이메일·팩스 (현재 모바일 010-7552-0301만 확보)

---

## 3. 변호사 본인 — `Person` + `Attorney` (P-01 `/about/` 단일 페이지)

```json
{
  "@context": "https://schema.org",
  "@type": ["Person", "Attorney"],
  "name": "류남경",
  "alternateName": "Ryu Nam-gyeong",
  "givenName": "남경",
  "familyName": "류",
  "honorificPrefix": "변호사",
  "jobTitle": "대표변호사",
  "worksFor": {
    "@type": "LegalService",
    "name": "법무법인 인유 창원사무소"
  },
  "image": "https://{도메인}/img/profile-ryu.jpg",
  "url": "https://{도메인}/about/",
  "description": "검사 19년 경력의 부부장 검사 출신 변호사. 성폭력전담합의부 공판, 기술유출, 다중피해범죄, 조세 등 직접 수사·공판 경험.",
  "alumniOf": [
    {
      "@type": "EducationalOrganization",
      "name": "전남대학교 법학과"
    },
    {
      "@type": "EducationalOrganization",
      "name": "사법연수원",
      "description": "35기 수료(2006)"
    }
  ],
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "name": "사법시험 제44회 합격",
      "credentialCategory": "사법시험",
      "dateCreated": "2002"
    },
    {
      "@type": "EducationalOccupationalCredential",
      "name": "변호사 자격",
      "credentialCategory": "변호사"
    }
  ],
  "knowsAbout": [
    "성범죄", "성폭력", "기술유출", "다중피해범죄",
    "조세", "공정거래", "음주운전", "명예훼손",
    "횡령", "배임", "국민참여재판"
  ],
  "knowsLanguage": ["ko"],
  "sameAs": [
    "https://blog.naver.com/inyou2025",
    "https://www.lawtimes.co.kr/news/197630"
  ]
}
```

> Google는 schema.org에서 `Attorney`를 직접 지원하지 않을 수 있음 → `Person` 단독 + `jobTitle: "변호사"`로 대체 가능. `@type` 배열은 호환성을 위해 둘 다 표기.

---

## 4. 분야 페이지 — `Service` (각 `/practice/*/` 랜딩)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "성범죄 변호",
  "name": "창원 성범죄 변호 — 검사 출신 류남경",
  "description": "성폭력전담합의부 공판 검사 출신 변호사가 강제추행·준강간·디지털성범죄 사건을 직접 변론.",
  "provider": {
    "@type": "LegalService",
    "name": "법무법인 인유 창원사무소",
    "url": "https://{도메인}/"
  },
  "areaServed": [
    { "@type": "City", "name": "창원시" },
    { "@type": "City", "name": "김해시" },
    { "@type": "City", "name": "양산시" },
    { "@type": "City", "name": "거제시" }
  ],
  "audience": {
    "@type": "Audience",
    "audienceType": "형사 피의자/피해자"
  },
  "url": "https://{도메인}/practice/sex-crime/"
}
```

> 같은 패턴으로 옵션 D 6개 분야(`/practice/sex-crime/`, `/practice/dui-traffic/`, `/practice/fraud-corporate/`, `/practice/violent-criminal/`, `/practice/investigation-defense/`, `/practice/civil-family/`)에 각각 작성. `serviceType`만 분야명으로 교체.

---

## 5. 사례 상세 — `Article` + `BreadcrumbList` (M-02)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{사건 제목 — CMS 입력값}",
  "description": "{사건 요약 — CMS 입력값}",
  "image": "https://{도메인}/cases/{slug}/cover.jpg",
  "datePublished": "{YYYY-MM-DD}",
  "dateModified": "{YYYY-MM-DD}",
  "author": {
    "@type": "Person",
    "name": "류남경",
    "url": "https://{도메인}/about/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "법무법인 인유 창원사무소",
    "logo": {
      "@type": "ImageObject",
      "url": "https://{도메인}/img/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://{도메인}/cases/{slug}/"
  }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://{도메인}/" },
    { "@type": "ListItem", "position": 2, "name": "성공사례", "item": "https://{도메인}/cases/" },
    { "@type": "ListItem", "position": 3, "name": "{사건 제목}" }
  ]
}
```

---

## 6. 페이지별 JSON-LD 매핑 표 (1차 범위)

| 페이지 | 적용 스키마 |
|--------|------------|
| 모든 페이지 | `WebSite` (사이트명용) |
| F (메인 `/`) | `WebSite` + `LegalService+LocalBusiness` (요약) + `Person` (요약) |
| P-01 (`/about/` 단일 long-form) | `Person`+`Attorney` (전체 경력 alumniOf 확장) + `LegalService` (사무소 §5) |
| S-01·S-02·S-03·S-05·S-08·S-09 (`/practice/{slug}/`) | `Service` + `BreadcrumbList` |
| M-01 (`/cases/`) | `BreadcrumbList` |
| M-02 (`/cases/[slug]/`) | `Article` + `BreadcrumbList` |
| M-03·M-04 (CMS 어드민) | (불필요, `noindex`) |

---

## 7. 검증·운영 체크리스트

- [ ] 배포 전 모든 템플릿을 [Rich Results Test](https://search.google.com/test/rich-results)로 검증
- [ ] `streetAddress`, `geo`, `sameAs`(블로그) 실제 값으로 채움
- [ ] Person `image`는 정장 컷의 정사각형/세로형 → og:image와 별도
- [ ] M-02 사례의 `Article` 마크업은 페이지 본문 내용과 일치하게 유지 (숨김 콘텐츠 금지)
- [ ] Search Console "리치 결과" 보고서 정기 모니터링
- [ ] 페이지 콘텐츠가 변경되면 JSON-LD도 동시에 갱신 (`lastModified`·`datePublished` 등)
