import React from 'react'
import {useStore} from '../store/store'
import {Navigate, useLocation} from 'react-router-dom'

interface Props {
  children: React.ReactNode
}
const RequireAuth = ({children}: Props) => {
  const token = useStore((state) => state.token)
  const location = useLocation()

  if (!token) {
    window.alert('접근권한이 없습니다.')
    return <Navigate to='/login' state={{from: location}} replace />
  }

  return <>{children}</>
}

export default RequireAuth
