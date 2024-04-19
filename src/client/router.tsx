import { createBrowserRouter, useRoutes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/Login'
import React from 'react'
import TrucksList from './pages/TrucksList'
import Layout from './layout'

const TruckRouter = () =>
  useRoutes([
    {
      index: true,
      element: <TrucksList />,
    },
  ])

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/trucks/*',
        element: <TruckRouter />,
      },
      {
        path: '/locations/*',
        element: <TruckRouter />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
])

export default appRouter
