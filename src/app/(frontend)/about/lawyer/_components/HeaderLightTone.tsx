'use client'

import { useEffect } from 'react'

import { setForcedHeaderTone } from '@/Header/heroToneStore'

/**
 * about/lawyer 최상단이 밝은 배경 히어로(HeroSection)라, 스크롤 전에도
 * 헤더를 light 톤(불투명·어두운 글자)으로 고정한다. 기본 헤더는 미스크롤 시
 * 어두운 히어로를 전제한 흰 글자/투명 배경이라 밝은 히어로 위에서 대비가 무너진다.
 */
export function HeaderLightTone() {
  useEffect(() => {
    setForcedHeaderTone('light')
    return () => setForcedHeaderTone(null)
  }, [])

  return null
}
