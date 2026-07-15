import { CONTACT } from '@/lib/constants'

// 모든 전화 CTA와 tel: 링크는 사무소 대표전화로 연결한다.
export const PHONE_DISPLAY = `${CONTACT.office} / ${CONTACT.mobile}`
export const PHONE_HREF = `tel:${CONTACT.office.replace(/-/g, '')}`

export const NAVER_BLOG_URL = 'https://blog.naver.com/inyou2025'
