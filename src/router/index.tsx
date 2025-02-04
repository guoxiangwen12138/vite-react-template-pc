import React from 'react'
import { type RouteObject } from 'react-router-dom'

import Home from '@pages/Home'
import User from '@pages/Auth/User'
import Role from '@pages/Auth/Role'
import Login from '@pages/Login'
import Export from '@pages/Export'
import MainLayout from '@layout/MainLayout'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout/>,
    children: [
      { index: true, element: <Home/> },
      { path: '/auth/user', element: <User/> },
      { path: '/auth/role', element: <Role/> },
      { path: '/export/docx', element: <Export/> }
    ]
  },
  {
    path: '/login',
    element: <Login/>
  }
]

export default routes
