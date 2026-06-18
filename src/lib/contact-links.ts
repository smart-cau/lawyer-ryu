import { CONTACT } from '@/lib/constants'

export const PHONE_DISPLAY = `${CONTACT.office} / ${CONTACT.phone}`
export const PHONE_HREF = `tel:${CONTACT.phone.replace(/-/g, '')}`

export const NAVER_BLOG_URL = 'https://blog.naver.com/inyou2025'

// Fill this with the office's KakaoTalk Channel chat URL when it is confirmed.
export const KAKAO_TALK_CHAT_URL: string | null = null
