import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Topbar } from '../components/Topbar'
import { useMeQuery } from '../generated/graphql'

export interface AppLayoutProps {
  children: React.ReactNode
}

export const AppLayout: FC<AppLayoutProps> = (props) => {
  const navigate = useNavigate()
  const { data: meData, loading, client } = useMeQuery()
  useEffect(() => {
    if (!loading && !meData?.me) {
      console.log(loading, meData)
      navigate('/')
    }
  }, [meData, loading])
  const me = meData?.me
  if (!me) {
    return null
  }
  return (
    <div>
      <Topbar me={me as any} />
      <div>
        {props.children}
      </div>
    </div>
  )
}
