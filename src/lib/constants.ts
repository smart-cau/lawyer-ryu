export const OFFICE_LOCATION = {
    lat: 35.2224365,
    lng: 128.7010317,
    name: '법무법인인유 창원분사무소 형사전문변호사 류남경',
  } as const;
  
export const NAVER_MAP_URL = `https://map.naver.com/v5/search/${OFFICE_LOCATION.name}`;

export const CONTACT = {
    office: '055-719-0302',
    phone: '010-7552-0301',
    email: 'cwinyou@naver.com',
    address: '경상남도 창원시 성산구 창이대로689번길 4-24',
    addressSub: '(사파동 더원2빌딩 504호)',
    businessNumber: '737-86-01520',
    representative: '류남경',
    firmName: '법무법인인유 창원분사무소 형사전문변호사 류남경',
    hours: '평일 09:00 ~ 22:00',
    hoursNote: '(토 · 일 · 공휴일: 휴무)',
    hoursWarning: '* 방문 상담은 사전 예약이 필요합니다.',
  } as const;