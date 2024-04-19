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
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapRef.current)

    // Attach event listener if onClick function is provided
    if (onClick) {
      mapRef.current.on('click', onClick)
    }

    // Add markers with popups for each location
    if (locations && locations.length > 0) {
      locations.forEach(({ position, name, link }) => {
        const marker = L.marker(position).addTo(mapRef.current!)
        marker.bindPopup(`<b>${name}</b><br/><a href="${link}" target="_blank">More Info</a>`)
      })
    }

    // Cleanup when the component is unmounted
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
      }
    }
  }, [center, zoom, onClick, locations])

  return <div id='map' className={'h-full'}></div>
}

export default Index
