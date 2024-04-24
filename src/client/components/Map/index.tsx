import React, { useEffect, useRef } from 'react'
import L, { LatLngExpression, LeafletMouseEvent, Map as LeafletMap } from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface MapProps {
  center: LatLngExpression
  zoom: number
  onClick?: (event: LeafletMouseEvent) => void
  locations?: { position: LatLngExpression; name: string; link: string }[]
}

const Index: React.FC<MapProps> = ({ center, zoom, onClick, locations }) => {
  const mapRef = useRef<LeafletMap | null>(null)

  useEffect(() => {
    // Initialize the Index
    mapRef.current = L.map('map', {
      center,
      zoom,
    })

    // Add the tile layer (here, we use OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Click on a location marker to see the details of the location.',
    }).addTo(mapRef.current)

    // Attach event listener if onClick function is provided
    if (onClick) {
      mapRef.current.on('click', onClick)
    }

    // Add markers with popups for each location
    if (locations && locations.length > 0) {
      locations.forEach(({ position, name, uid, trucks }) => {
        const truckListMarkup =
          trucks.map(i => `<li><a href="/trucks/${i.uid}">${i.name}</a></li>`).join('') ||
          'No trucks available at this location'
        const marker = L.marker(position).addTo(mapRef.current!)

        marker.bindPopup(
          `<div class="max-w-md mx-auto bg-gray-100 p-8 rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-4"><a href="/locations/${uid}">${name}</a></h1>
    <h2 class="text-lg font-semibold mt-4 mb-2">Trucks at Location</h2>
    <ul class="ml-6 text-lg">
        ${truckListMarkup}
    </ul>
</div>`,
        )
      })
    }

    // Cleanup when the component is unmounted
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
      }
    }
  }, [center, zoom, onClick, locations])

  return <div id='map' className={'flex h-full'}></div>
}

export default Index
