import React from 'react'
import {RouteObject, useRoutes} from 'react-router-dom'
import BlankLayout from './layout/BlankLayout'
import Login from './pages/Login'
import MainPage from './pages/main/MainPage'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      {path: '/', element: <Login />},
      {path: '/main', element: <MainPage />},
    ],
  },
]

export default function Router() {
  return useRoutes(routes)
}

// useRoutes Hook 은 <Routes> 와 기능적으로 동일하지만 <Route> 요소 대신
// Javascript 객체를 사용하여 경로를 정의한다.
// <Route> 요소와ㅓ 동일한 속성을 갖지만 JSX가 필요X
