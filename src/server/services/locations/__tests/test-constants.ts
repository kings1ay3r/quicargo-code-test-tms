import { CreateLocationRequest } from '@app/dtos/index.js'

export const createdLocation = {
  id: 1,
  uid: 'test-location',
  name: 'Test Location',
  address: '123 Test Street',
  lattitude: 12.3456,
  longitude: 65.4321,
  createdBy: 'test-user',
  createdAt: new Date(),
  updatedBy: 'test-user',
  updatedAt: new Date(),
  deletedBy: null,
  deletedAt: null,
}
export const dbResponse = {
  id: 1,
  uid: 'test-location',
  name: 'Test Location',
  address: '123 Test Street',
  lattitude: 12.3456,
  longitude: 65.4321,
  createdBy: 'test-user',
  createdAt: new Date(),
  updatedBy: 'test-user',
  updatedAt: new Date(),
  deletedBy: null,
  deletedAt: new Date(),
}

export const updatedLocation = {
  id: 1,
  uid: 'test-location',
  name: 'Updated Test Location',
  address: '123 Test Street',
  lattitude: 12.3456,
  longitude: 65.4321,
  createdBy: 'test-user',
  createdAt: new Date(),
  updatedBy: 'test-user',
  updatedAt: new Date(),
  deletedBy: null,
  deletedAt: null,
}
export const dbFindResponse = {
  id: 1,
  uid: 'test-location',
  name: 'Test Location',
  address: '123 Test Street',
  lattitude: 12.3456,
  longitude: 65.4321,
  createdBy: 'test-user',
  createdAt: new Date(),
  updatedBy: 'test-user',
  updatedAt: new Date(),
  deletedBy: null,
  deletedAt: null,
}
export const createLocationRequest: CreateLocationRequest = {
  name: 'Test Location',
  address: '123 Test Street',
  lattitude: 12.3456,
  longitude: 65.4321,
}
