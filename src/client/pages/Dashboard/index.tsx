import React from 'react'
import Map from '../../components/Map'
import { useApiCall } from '../../customHooks/useApiCall'

const getMarkers = (locationsList, trucksList) => {
  if (!locationsList?.data || !trucksList?.data) return []

  const locations = locationsList.data

  const locationHashMap = []

  locations.map(location => {
    locationHashMap[location.uid] = {
      position: [location.lattitude, location.longitude],
      name: location.name,
      uid: location.uid,
      trucks: [],
    }
  })

  trucksList.data.map(item => {
    if (locationHashMap[item.location.uid]) locationHashMap[item.location.uid].trucks.push(item)
  })
  return Object.values(locationHashMap)
}

const Dashboard: React.FC = () => {
  const locationsResp = useApiCall({
    queryKey: ['locations'],
    url: '/locations',
    method: 'GET',
  })
  const { data: locationsList } = locationsResp

  const trucksResp = useApiCall({
    queryKey: ['trucks'],
    url: '/trucks',
    method: 'GET',
  })
  const { data: trucksList } = trucksResp
  const markers = getMarkers(locationsList, trucksList)

  const mapCenter = markers?.length ? markers[0]?.position : [52.2676, 4.9041]

  return (
    <div className={'h-full'}>
      {markers && markers.length && <Map center={mapCenter} zoom={13} locations={markers} />}
    </div>
  )
}

export default Dashboard
