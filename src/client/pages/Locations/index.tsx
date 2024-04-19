import React from 'react'
import { apiCall, useApiCall } from '../../customHooks/useApiCall'
import useNotify from '../../customHooks/useNotify'
import Table from '../../components/Table/table'
import useAccessor from '../../customHooks/useAccessor'
import CreateLocationForm from './createLocationForm'
import EditLocationForm from './editLocationForm'

const LocationsList: React.FC = () => {
  const showToast = useNotify()
  const { accessor } = useAccessor()
  const resp = useApiCall({
    queryKey: ['locations'],
    url: '/locations',
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
      refetch()
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

  return (
    <div>
      <h1 className="text-2xl font-bold bg-blue-500 text-white p-4 flex justify-between items-center">
        Locations
        <CreateLocationForm onSubmit={handleCreateLocation} data={{}} />
      </h1>
      <Table
        columns={columns}
        items={items}
        actions={['edit', 'delete']}
        handlers={{
          edit: editHandler,
          delete: handleDelete,
        }}
      />
    </div>
  )
}

export default LocationsList
