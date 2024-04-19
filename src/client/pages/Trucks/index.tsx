import React from 'react'
import { useApiCall } from '../../customHooks/useApiCall'
import useNotify from '../../customHooks/useNotify'
import Table from '../../components/Table/table'

const TrucksList: React.FC = () => {
  const resp = useApiCall({
    queryKey: ['trucks'],
    url: '/trucks',
    method: 'GET',
  })
  const { data, isLoading, error } = resp

  const showToast = useNotify()

  if (isLoading) return <div>Loading...</div>
  if (error) {
    showToast(error.message, 'error')
    return <div>{error.message}</div>
  }

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'model', label: 'Model' },
    { key: 'year', label: 'Year' },
    { key: 'licensePlate', label: 'License Plate' },
    { key: 'make', label: 'Make' },
    { key: 'brand', label: 'Brand' },
    { key: 'capacity', label: 'Capacity' },
  ]

  const items =
    data.data.map(item => {
      return { ...item, key: item.uid }
    }) ?? []

  const editForm = item => {
    return <>Edit Form {item}</>
  }

  const handleDelete = item => {}
  return (
    <div>
      <h1 className='text-2xl font-bold bg-blue-500 text-white p-4 flex justify-between items-center'>
        Trucks
      </h1>
      <Table
        columns={columns}
        items={items}
        actions={['edit', 'delete']}
        handlers={{ edit: editForm, delete: handleDelete }}
      />
    </div>
  )
}

export default TrucksList
