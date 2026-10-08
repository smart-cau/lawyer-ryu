import { CONTACT } from '@/lib/constants'

// 모든 전화 CTA와 tel: 링크는 사무소 대표전화로 연결한다.
export const PHONE_DISPLAY = `${CONTACT.office} / ${CONTACT.mobile}`
export const PHONE_HREF = `tel:${CONTACT.office.replace(/-/g, '')}`

export const NAVER_BLOG_URL = 'https://blog.naver.com/inyou2025'

// 대한변협 '나의 변호사'(변호사정보센터)의 류남경 변호사 프로필.
// 전문분야 등록·개업 상태를 제3자가 확인할 수 있는 페이지라 schema.org sameAs와 credential url이 쓴다.
export const KOREAN_BAR_PROFILE_URL = 'https://www.klaw.or.kr/info/36udki19a5'
