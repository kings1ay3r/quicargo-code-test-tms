import Table, { ActionItem } from '../../components/Table/table'
import { apiCall, useApiCall } from '../../customHooks/useApiCall'
import { Link, useNavigate, useParams } from 'react-router-dom'

import CreateTruckForm from './createTruckForm'
import EditTruckForm from './editTruckForm'
import React from 'react'
import useAccessor from '../../customHooks/useAccessor'
import useNotify from '../../customHooks/useNotify'
import ActionButtons from '../../components/Table/actionButtons'

const TrucksList: React.FC = () => {
  const showToast = useNotify()
  const { accessor } = useAccessor()
  const params = useParams()
  const navigate = useNavigate()
  const resp = useApiCall({
    queryKey: ['trucks', params?.uid],
    url: `/trucks/${params?.uid ?? ''}`,
    method: 'GET',
  })

  const locationList = useApiCall({
    queryKey: ['locations'],
    url: '/locations',
    method: 'GET',
  })
  const { data, isLoading, error, refetch } = resp

  const { data: locations, isFetched: locationFetched, error: LocationsError } = locationList

  const deleteTruck = async (itemId: string) => {
    try {
      const response = await apiCall(accessor, `/trucks/${itemId}`, 'DELETE')

      if (!response.data) {
        showToast(response.error.message, 'error')
        return
      }
      showToast('Location deleted successfully', 'success')
      if (params.uid) navigate('/')
      else refetch()
    } catch (error) {
      showToast(error.message, 'error')
    }
  }

  const createTruck = async data => {
    if (!locationFetched) return null
    try {
      let payload = {
        name: data.name,
        licensePlate: data.licensePlate,
        make: data.make,
        model: data.model,
        year: data.year ? parseInt(data.year) : 0,
        capacity: data.capacity ? parseInt(data.capacity) : 0,
        locationUuid: data.locationUuid,
        brand: data.brand,
      }

      const response = await apiCall(accessor, `/trucks`, 'POST', {}, {}, payload)
      if (response.status === 'success') {
        showToast('Truck created successfully', 'success')
        refetch()
        return
      }
      showToast(response.error.message, 'error')
    } catch (error) {
      showToast(error.message, 'error')
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) {
    showToast(error.message, 'error')
    return <div>{error.message}</div>
  }

  const editTruck = async data => {
    try {
      const payload = {
        name: data.name,
        licensePlate: data.licensePlate,
        make: data.make,
        model: data.model,
        year: data.year ? parseInt(data.year) : 0,
        capacity: data.capacity ? parseInt(data.capacity) : 0,
        locationUuid: data.locationUuid,
        brand: data.brand,
      }
      const response = await apiCall(accessor, `/trucks/${data.uid}`, 'PATCH', {}, {}, payload)
      if (response.status === 'success') {
        showToast('Location updated successfully', 'success')
        refetch()
        return
      }
      showToast(response.error.message, 'error')
    } catch (error) {
      showToast(error.message, 'error')
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) {
    showToast(error.message, 'error')
    return <div>{error.message}</div>
  }

  const columns = [
    { key: 'licensePlate', label: 'License Plate' },
    { key: 'name', label: 'Name' },
    { key: 'make', label: 'Make' },
    { key: 'brand', label: 'Brand' },
    { key: 'model', label: 'Model' },
    { key: 'year', label: 'Year' },
    { key: 'capacity', label: 'Capacity' },
  ]

  const items =
    data.data.map(item => {
      return { ...item, key: item.uid }
    }) ?? []

  const handleDelete = item => {
    deleteTruck(item.uid)
  }
  const handleCreateLocation = data => {
    createTruck(data)
  }
  const handleEditLocation = data => {
    editTruck(data)
  }
  const editHandler = (data, closeModal) => {
    return (
      <EditTruckForm
        onSubmit={handleEditLocation}
        data={data}
        locations={locations?.data ?? []}
        handleCloseModal={closeModal}
      />
    )
  }

  const ViewTruck = ({ item, locations }) => {
    if (!item) return <span>Item not found</span>

    return (
      <div>
        <div className='mt-6 border-t border-gray-100 px-2'>
          <dl className='divide-y divide-gray-100'>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>Name</dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {item.name}
              </dd>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>License Plate</dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {item.licensePlate}
              </dd>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>Location</dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                <Link to={`/locations/${item.location?.uid}`}>
                  {locations?.filter(i => i.uid === item.location.uid)[0].name ||
                    item.location?.name ||
                    item.location?.uid}
                </Link>
              </dd>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>Make</dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {item.make}
              </dd>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>Brand</dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {item.brand}
              </dd>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>Year</dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {item.year}
              </dd>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>Capacity</dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {item.capacity}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className='text-2xl font-bold bg-blue-500 text-white p-4 flex justify-between items-center'>
        Trucks
        {params.uid ? (
          <ActionButtons handlers={{ edit: editHandler, delete: handleDelete }} item={items[0]} />
        ) : (
          <CreateTruckForm
            onSubmit={handleCreateLocation}
            data={{}}
            locationsList={locations?.data ?? []}
          />
        )}
      </h1>
      {params.uid ? (
        <ViewTruck item={items[0]} locations={locations?.data ?? []} />
      ) : (
        <Table
          columns={columns}
          items={items}
          locations={locations?.data ?? []}
          actions={
            ['edit', ...(accessor.claims.includes('trucks.all') ? ['delete'] : [])] as ActionItem[]
          }
          handlers={{
            edit: editHandler,
            delete: handleDelete,
          }}
        />
      )}
    </div>
  )
}

export default TrucksList
