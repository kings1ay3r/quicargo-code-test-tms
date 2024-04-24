import * as yup from 'yup'

export type Location = {
  id: number
  uid: string
  name: string
  address?: string | null
  lattitude: number
  longitude: number
  createdAt: Date
  createdBy: string
  updatedAt: Date
  deletedAt?: Date | null
  deletedBy?: string | null
}

export type CreateLocationRequest = Omit<
  Location,
  'id' | 'uid' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy' | 'deletedAt' | 'deletedBy'
>

export class UpdateLocationRequest {
  name?: string
  address?: string | null
  lattitude?: number
  longitude?: number
}

export const createLocationSchema = () => {
  return yup.object().shape({
    name: yup.string().required(),
    address: yup.string().required(),
    lattitude: yup
      .number()
      .min(-90, 'Latitude must be at least -90 degrees.')
      .max(90, 'Latitude must be no more than 90 degrees.')
      .required('Latitude is a required field.')
      .typeError('Latitude should be valid coordinates.'),
    longitude: yup
      .number()
      .min(-180, 'Longitude must be at least -180 degrees.') // Fixed the range for longitude
      .max(180, 'Longitude must be no more than 180 degrees.') // Fixed the range for longitude
      .required('Longitude is a required field.')
      .typeError('Longitude should be valid coordinates.'),
  })
}

export const updateLocationSchema = () => {
  return yup.object().shape({
    name: yup.string(),
    address: yup.string(),
    lattitude: yup
      .number()
      .min(-90, 'Latitude must be at least -90 degrees.')
      .max(90, 'Latitude must be no more than 90 degrees.')
      .typeError('Latitude should be valid coordinates.'),
    longitude: yup
      .number()
      .min(-180, 'Longitude must be at least -180 degrees.') // Fixed the range for longitude
      .max(180, 'Longitude must be no more than 180 degrees.') // Fixed the range for longitude
      .typeError('Longitude should be valid coordinates.'),
  })
}
