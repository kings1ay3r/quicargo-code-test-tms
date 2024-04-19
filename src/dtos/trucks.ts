import React from 'react'

export type Truck = {
  id: React.Key | null | undefined
  name: string | undefined
  model: string | undefined
  year: number
  licensePlate: string | undefined
  make: string | undefined
  brand: string | undefined
  capacity: number | undefined
}
export type CreateTruckRequest = {
  licensePlate: string
  name: string
  make: string
  brand: string
  model: string
  year: number
  capacity: number
}

export type UpdateTruckRequest = {
  licensePlate: string
  name?: string
  make?: string
  brand?: string
  model?: string
  year?: number
  capacity?: number
}
