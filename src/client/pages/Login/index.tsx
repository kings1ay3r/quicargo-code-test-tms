import { Avatar, Card, CardBody, IconButton, Typography } from '@material-tailwind/react'
import { Disclosure, Menu } from '@headlessui/react'
import { Link, useNavigate } from 'react-router-dom'
import React, { Fragment, useEffect } from 'react'

import { Illustration } from './illustration'
import UserOne from '../../assets/user-1.png'
import UserTwo from '../../assets/user-2.png'
import useAccessor from '../../customHooks/useAccessor'

interface TeamCardPropsType {
  img: string
  name: string
  title: string
}

const UserCard = ({ img, name, title }) => {
  return (
    <Card className='rounded-lg shadow-lg bg-gray-100 pt-8'>
      <CardBody className='text-center'>
        <div className='flex justify-center mb-6'>
          <Avatar
            src={img}
            alt={name}
            variant='circular'
            className='object-cover rounded-full'
            size={'md'}
          />
        </div>
        <Typography variant='h5' color='blue-gray' className='font-medium text-lg'>
          {name}
        </Typography>
        <Typography color='blue-gray' className='mb-2 text-base font-semibold text-gray-600'>
          {title}
        </Typography>
        <div className='flex items-center justify-center gap-1.5'>
          <IconButton variant='text' color='gray'>
            <i className='fab fa-twitter text-lg' />
          </IconButton>
          <IconButton variant='text' color='gray'>
            <i className='fab fa-linkedin text-lg' />
          </IconButton>
          <IconButton variant='text' color='gray'>
            <i className='fab fa-dribbble text-lg' />
          </IconButton>
        </div>
      </CardBody>
    </Card>
  )
}

const users = [
  {
    img: UserTwo,
    name: 'Admin User',
    title: '(has delete access)',
    token: 'YWRtaW48',
    claims: ['locations.all', 'trucks.all'],
  },
  {
    img: UserOne,
    name: 'Normal User',
    title: 'has no delete access',
    token: 'YWRtaW46',
    claims: ['locations.read', 'locations.write', 'trucks.read', 'trucks.write'],
  },
]

const LoginUsers = () => {
  const { setAccessor } = useAccessor()
  const navigate = useNavigate()

  const handleLogin = user => {
    setAccessor(user)
    navigate('/')
  }
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2'>
      {users.map((user, index) => (
        <Link onClick={() => handleLogin(user)} key={index} data-testId='login-link'>
          <UserCard img={user.img} name={user.name} title={user.title} />
        </Link>
      ))}
    </div>
  )
}

const SignIn = () => {
  const { accessor, setAccessor }: { accessor: Accessor; setAccesor: Function } = useAccessor()
  const navigate = useNavigate()

  useEffect(() => {
    if (accessor) {
      navigate('/')
    }
  }, [accessor, navigate])

  const handleLogin = () => {
    setAccessor({ name: 'John Doe', id: '1', token: 'YWRtaW48' })
    navigate('/')
  }

  return (
    <>
      <div className='min-h-full'>
        <div className='bg-gray-800 pb-32'>
          <Disclosure as='nav' className='bg-gray-800'>
            {({ open }) => (
              <>
                <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
                  <div className='border-b border-gray-700'>
                    <div className='flex h-16 items-center justify-between px-4 sm:px-0'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                          <span className={'text-2xl font-semibold text-white'}>Q</span>
                        </div>
                      </div>
                      <div className='hidden md:block'>
                        <div className='ml-4 flex items-center md:ml-6'>
                          <Menu as='div' className='relative ml-3'></Menu>
                        </div>
                      </div>
                      <div className='-mr-2 flex md:hidden'>
                        <Disclosure.Button className='relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                          <span className='absolute -inset-0.5' />
                          <span className='sr-only'>Open main menu</span>
                          {open ? <>x</> : <>|</>}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Disclosure>
          <header className='py-10'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
              <h1 className='text-3xl font-bold tracking-tight text-white'>Welcome</h1>
            </div>
          </header>
        </div>

        <main className='-mt-32'>
          <div className='mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8'>
            <div className='rounded-lg bg-white px-5 py-6 shadow sm:px-6'>
              <div className={'flex flex-col md:flex-row items-center justify-center'}>
                <div className='hidden w-full xl:block xl:w-1/2'>
                  <div className='py-17.5 px-26 text-center'>
                    <Illustration />
                  </div>
                </div>

                <div className='w-full border"stroke dark:border-strokedark xl:w-1/2 xl:border-l-2'>
                  <div className='w-full p-4 sm"p-12.5 xl:p-17.5'>
                    <h2 className='mb-9 text-2xl"text-black sm:text-title-xl2 text-center'>
                      Click Any User to Login
                    </h2>
                    <LoginUsers />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default SignIn
