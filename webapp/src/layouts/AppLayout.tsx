import React, { FC } from 'react'
import { Topbar } from '../components/Topbar'

export interface AppLayoutProps {
  children: React.ReactNode
}

export const AppLayout: FC<AppLayoutProps> = (props) => {
  return (
    <div>
      <Topbar />
      <div>
        {props.children}
      </div>
    </div>
  )
}
