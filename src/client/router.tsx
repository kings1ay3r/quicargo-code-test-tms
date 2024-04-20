import { createBrowserRouter, useRoutes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/Login'
import React from 'react'
import TrucksList from './pages/Trucks'
import Layout from './layout'
import LocationsList from './pages/Locations'

const TruckRouter = () =>
  useRoutes([
    {
      index: true,
      element: <TrucksList />,
    },
    {
      path: '/:uid',
      element: <TrucksList />,
    },
  ])

const LocationRouter = () =>
  useRoutes([
    {
      index: true,
      element: <LocationsList />,
    },
    {
      path: '/:uid',
      element: <LocationsList />,
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
        element: <LocationRouter />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
])

export default appRouter
