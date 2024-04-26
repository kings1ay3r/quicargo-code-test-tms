import { Link } from 'react-router-dom'
import DropdownUser from './DropdownUser'
import LogoIcon from '../../assets/logo.svg'

const Header = (props: {
  sidebarOpen: string | boolean | undefined
  setSidebarOpen: (arg0: boolean) => void
}) => {
  return (
    <header className='sticky top-0 z-999 flex w-full bg-white drop-shadow-1 shadow-gray-200'>
      <div className='flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11'>
        <div className='flex items-center gap-2 sm:gap-4'>
          <Link className='block flex-shrink-0 lg:hidden' to='/'>
            <img src={LogoIcon} alt='Logo' />
          </Link>
        </div>

        <div className='hidden sm:block'></div>

        <div className='flex items-center gap-3 2xsm:gap-7'>
          <DropdownUser />
        </div>
      </div>
    </header>
  )
}

export default Header
