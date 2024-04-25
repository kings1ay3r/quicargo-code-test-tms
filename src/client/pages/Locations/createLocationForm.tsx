import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/SideBarModal/sidebar'
import { useForm } from 'react-hook-form'
import useNotify from '../../customHooks/useNotify'
import { yupResolver } from '@hookform/resolvers/yup'
import { createLocationSchema } from '@dtos'

interface LocationFormInputs {
  name: string
  longitude: number
  lattitude: number
  address: string
}

interface LocationFormModalProps {
  isOpen: boolean
  onRequestClose: () => void
  onSubmit: (data: LocationFormInputs) => void
}

const schema = createLocationSchema()

const Form = ({ onSubmit, initialValues = {} }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  })
  const showToast = useNotify()

  const onSubmitHandler = data => {
    return onSubmit(data) // Pass data to parent component
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className='space-y-4'>
      <div className='flex items-center'>
        <label htmlFor='name' className='text-sm font-medium mr-2'>
          Name:
        </label>
        <input
          type='text'
          {...register('name')}
          className='w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500'
        />
      </div>
      {errors.name?.message && <p className='text-red-500 text-xs'>{errors.name?.message}</p>}
      <div className='flex items-center'>
        <label htmlFor='address' className='text-sm font-medium mr-2'>
          Address:
        </label>
        <input
          type='text'
          {...register('address')}
          className='w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500'
        />
      </div>
      {errors.address?.message && <p className='text-red-500 text-xs'>{errors.address?.message}</p>}
      <div className='flex items-center'>
        <label htmlFor='lattitude' className='text-sm font-medium mr-2'>
          Latitude:
        </label>
        <input
          type='text'
          {...register('lattitude', {
            validate: value => !isNaN(value) || 'Latitude must be a number',
          })}
          className='w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500'
        />
      </div>
      {errors.lattitude?.message && (
        <p className='text-red-500 text-xs'>{errors.lattitude?.message}</p>
      )}
      <div className='flex items-center'>
        <label htmlFor='longitude' className='text-sm font-medium mr-2'>
          Longitude:
        </label>
        <input
          type='text'
          {...register('longitude', {
            validate: value => !isNaN(value) || 'Longitude must be a number',
          })}
          className='w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500'
        />
      </div>
      {errors.longitude?.message && (
        <p className='text-red-500 text-xs'>{errors.longitude?.message}</p>
      )}
      <div className='flex justify-center'>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700'
        >
          Submit
        </button>
      </div>
    </form>
  )
}

const CreateLocationForm: React.FC<LocationFormModalProps> = ({ onSubmit, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = e => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Link onClick={handleOpenModal}>+</Link>
      <Sidebar
        onClose={handleCloseModal}
        title={'Create Location'}
        setOpen={setIsModalOpen}
        open={isModalOpen}
      >
        {isModalOpen && (
          <Form
            initialValues={data}
            onSubmit={data => {
              onSubmit(data)
              handleCloseModal()
            }}
          />
        )}
      </Sidebar>
    </>
  )
}

export default CreateLocationForm
