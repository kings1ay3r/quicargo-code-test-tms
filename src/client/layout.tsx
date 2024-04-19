import React, { ReactNode, useState } from 'react'

import Header from './components/Header/index'
import Sidebar from './components/Sidebar/index'
import { Outlet } from 'react-router-dom'
import useAccessor from './customHooks/useAccessor'

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { accessor } = useAccessor()
  const [sidebarOpen, setSidebarOpen] = useState(!!accessor)

  return (
    <div>
      <div className='flex h-screen overflow-hidden'>
        {accessor && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
        <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden h-full'>
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className={'bg-gray-50 h-full mr-20 mt-20 mb-20'}>
            <div className='h-full'>
              <Outlet />
              <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>{children}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
