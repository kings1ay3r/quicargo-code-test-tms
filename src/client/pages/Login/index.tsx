import useAccessor from '../../customHooks/useAccessor'
import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import UserOne from '../../assets/user-1.png'
import UserTwo from '../../assets/user-2.png'
import { Avatar, Card, CardBody, IconButton, Typography } from '@material-tailwind/react'
import { Illustration } from './illustration'
import Header from '../../components/Header'

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
        <Link onClick={() => handleLogin(user)} key={index}>
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
    <div className=' h-screen overflow-hidden'>
      <Header sidebarOpen={false} setSidebarOpen={() => {}} />
      <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
        <div className='flex flex-wrap items-center'>
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
  )
}

export default SignIn
