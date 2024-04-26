import React from 'react'
import { apiCall, useApiCall } from '../../customHooks/useApiCall'
import useNotify from '../../customHooks/useNotify'
import Table, { ActionItem } from '../../components/Table/table'
import useAccessor from '../../customHooks/useAccessor'
import CreateLocationForm from './createLocationForm'
import EditLocationForm from './editLocationForm'
import { useNavigate, useParams } from 'react-router-dom'
import ActionButtons from '../../components/Table/actionButtons'

const LocationsList: React.FC = () => {
  const showToast = useNotify()
  const { accessor } = useAccessor()
  const params = useParams()
  const navigate = useNavigate()
  const resp = useApiCall({
    queryKey: ['locations', params?.uid],
    url: `/locations/${params?.uid ?? ''}`,
    method: 'GET',
  })
  const { data, isLoading, error, refetch } = resp

  const deleteLocation = async (itemId: string) => {
    try {
      const response = await apiCall(accessor, `/locations/${itemId}`, 'DELETE')

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

  const createLocation = async data => {
    try {
      const payload = {
        name: data.name,
        address: data.address,
        lattitude: parseFloat(data.lattitude),
        longitude: parseFloat(data.longitude),
      }
      const response = await apiCall(accessor, `/locations`, 'POST', {}, {}, payload)
      if (response.status === 'success') {
        showToast('Location created successfully', 'success')
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

  const editLocation = async data => {
    try {
      const payload = {
        name: data.name,
        address: data.address,
        lattitude: parseFloat(data.lattitude),
        longitude: parseFloat(data.longitude),
      }
      const response = await apiCall(accessor, `/locations/${data.uid}`, 'PATCH', {}, {}, payload)
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
    { key: 'name', label: 'Name' },
    { key: 'address', label: 'Address' },
    { key: 'lattitude', label: 'Latitude' },
    { key: 'longitude', label: 'Longitude' },
  ]

  const items =
    data.data.map(item => {
      return { ...item, key: item.uid }
    }) ?? []

  const handleDelete = item => {
    deleteLocation(item.uid)
  }
  const handleCreateLocation = data => {
    createLocation(data)
  }
  const handleEditLocation = data => {
    editLocation(data)
  }
  const editHandler = (data, closeModal) => {
    return (
      <EditLocationForm onSubmit={handleEditLocation} data={data} handleCloseModal={closeModal} />
    )
  }

  const ViewLocation = ({ item }) => {
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
              <dt className='text-sm font-medium leading-6 text-gray-900'>Address</dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {item.address}
              </dd>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>Latitude</dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {item.lattitude}
              </dd>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>Longitude</dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {item.longitude}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    )
  }

  const allowedActions = ['edit', ...(accessor.claims.includes('locations.all') ? ['delete'] : [])]

  return (
    <div>
      <h1 className='text-2xl font-bold bg-blue-500 text-white p-4 flex justify-between items-center'>
        Locations
        {params.uid ? (
          <ActionButtons handlers={{ edit: editHandler, delete: handleDelete }} item={items[0]} />
        ) : (
          <CreateLocationForm onSubmit={handleCreateLocation} />
        )}
      </h1>
      {params.uid ? (
        <ViewLocation item={items[0]} />
      ) : (
        <Table
          columns={columns}
          items={items}
          actions={
            [
              'edit',
              ...(accessor.claims.includes('locations.all') ? ['delete'] : []),
            ] as ActionItem[]
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

export default LocationsList
