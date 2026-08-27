export const OFFICE_LOCATION = {
    lat: 35.2224365,
    lng: 128.7010317,
    name: '법무법인 인유 창원분사무소',
  } as const;
  
// 지도 플레이스 프로필 — 길찾기 CTA와 schema.org sameAs가 함께 사용한다.
// 검색 URL이 아닌 place ID 고정 URL을 쓴다 (리다이렉트·검색 결과 변동 없음).
export const NAVER_MAP_URL = 'https://map.naver.com/p/entry/place/1217916308';
export const GOOGLE_MAP_URL = 'https://www.google.com/maps?cid=15266256443592699957';

export const CONTACT = {
    office: '055-719-0302',
    mobile: '010-7552-0301',
    email: 'cwinyou@naver.com',
    address: '경상남도 창원시 성산구 창이대로689번길 4-24',
    addressSub: '(사파동 더원2빌딩 504호)',
    businessNumber: '737-86-01520',
    representative: '류남경',
    firmName: '법무법인 인유 창원분사무소',
    hours: '평일 09:00 ~ 22:00',
    hoursNote: '(토 · 일 · 공휴일: 휴무)',
    hoursWarning: '* 방문 상담은 사전 예약이 필요합니다.',
  } as const;
