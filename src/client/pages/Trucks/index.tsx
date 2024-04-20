import React from 'react'
import { apiCall, useApiCall } from '../../customHooks/useApiCall'
import useNotify from '../../customHooks/useNotify'
import Table from '../../components/Table/table'
import useAccessor from '../../customHooks/useAccessor'
import CreateTruckForm from './createTruckForm'
import EditLocationForm from './editLocationForm'
import { useParams } from 'react-router-dom'

const TrucksList: React.FC = () => {
  const showToast = useNotify()
  const { accessor } = useAccessor()
  const params = useParams()
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

  const deleteLocation = async (itemId: string) => {
    try {
      const response = await apiCall(accessor, `/trucks/${itemId}`, 'DELETE')

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
    if (!locationFetched) return null
    try {
      let payload = {
        name: data.name,
        licensePlate: data.licensePlate,
        make: data.make,
        model: data.model,
        year: data.year ? parseInt(data.year) : 0,
        capacity: data.capacity ? parseInt(data.capacity) : 0,
        locationUuid: data.locationUid,
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
      <h1 className='text-2xl font-bold bg-blue-500 text-white p-4 flex justify-between items-center'>
        Trucks
        <CreateTruckForm
          onSubmit={handleCreateLocation}
          data={{}}
          locationsList={locations?.data ?? []}
        />
      </h1>
      <Table
        columns={columns}
        items={items}
        actions={['edit', ...(accessor.claims.includes('trucks.all') ? ['delete'] : [])]}
        handlers={{
          edit: editHandler,
          delete: handleDelete,
        }}
      />
    </div>
  )
}

export default TrucksList
