import React from 'react'
import {RouteObject, useRoutes} from 'react-router-dom'
import BlankLayout from './layout/BlankLayout'
import Login from './pages/Login'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [{path: 'login', element: <Login />}],
  },
]

export default function Router() {
  return useRoutes(routes)
}
