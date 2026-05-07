import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>법무법인 인유 창원사무소 관리 콘솔</h4>
      </Banner>
      <p>여기에서 성공사례와 미디어를 관리할 수 있습니다.</p>
    </div>
  )
}

export default BeforeDashboard
