import React from 'react'
import Map from '../../components/Map'

const Dashboard: React.FC = () => {
  const locations = [
    { position: [51.505, -0.09], name: 'Location 1', link: 'https://example.com/location1' },
    { position: [51.51, -0.1], name: 'Location 2', link: 'https://example.com/location2' },
    { position: [51.515, -0.095], name: 'Location 3', link: 'https://example.com/location3' },
  ]

  return (
    <div className={'h-full'}>
      <Map center={[51.505, -0.09]} zoom={13} locations={locations} />
    </div>
  )
}

export default Dashboard
