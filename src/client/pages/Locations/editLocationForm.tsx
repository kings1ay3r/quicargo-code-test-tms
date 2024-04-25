import React from 'react'
import { useForm } from 'react-hook-form'
import useNotify from '../../customHooks/useNotify'
import { updateLocationSchema } from '../../../dtos'
import { yupResolver } from '@hookform/resolvers/yup'

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

const Form = ({ onSubmit, initialValues = {} }) => {
  const schema = updateLocationSchema()
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
    return onSubmit(data)
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
        {errors.name && <p className='text-red-500 text-xs'>{errors.name}</p>}
      </div>
      <div className='flex items-center'>
        <label htmlFor='address' className='text-sm font-medium mr-2'>
          Address:
        </label>
        <input
          type='text'
          {...register('address')}
          className='w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500'
        />
        {errors.address && errors.address}
      </div>
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
        {errors.latitude && <p className='text-red-500 text-xs'>{errors.latitude}</p>}
      </div>
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
        {errors.longitude && <p className='text-red-500 text-xs'>{errors.longitude}</p>}
      </div>
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

const EditLocationForm: React.FC<LocationFormModalProps> = ({
  onSubmit,
  data,
  handleCloseModal,
}) => {
  return (
    <>
      <Form
        initialValues={data}
        onSubmit={data => {
          onSubmit(data)
          handleCloseModal()
        }}
      />
    </>
  )
}

export default EditLocationForm
