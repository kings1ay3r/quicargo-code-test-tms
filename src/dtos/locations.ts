import * as yup from 'yup'

export type Location = {
  // Define properties here, if needed
}

export class CreateLocationRequest {
  // Define properties here, if needed
}

export class UpdateLocationRequest {
  // Define properties here, if needed
}

export const creataeLocationSchema = () => {
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
