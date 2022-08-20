import React, { FC } from 'react'
import { Topbar } from '../components/Topbar'

export interface HomePageProps {
  
}

export const HomePage: FC<HomePageProps> = (props) => {
  return (
    <div>
      <Topbar />
    </div>
  )
}
