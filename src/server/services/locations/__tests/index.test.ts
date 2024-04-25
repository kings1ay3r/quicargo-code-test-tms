import LocationService from '@app/server/services/locations/'
import { defaultError, mockContext } from '@app/server/common/testUtils'
import {
  createdLocation,
  createLocationRequest,
  dbFindResponse,
  dbResponse,
  updatedLocation,
} from './test-constants'

describe('LocationService', () => {
  const locationService: LocationService = new LocationService()

  describe('get all locations', () => {
    test('happy path', async () => {
      jest.spyOn(locationService.repository.location, 'find').mockResolvedValue([])

      const locations = await locationService.getLocations(mockContext)

      expect(locations).toBeDefined()
      expect(locations.data).toBeInstanceOf(Array)
    })

    test('repository returns error', async () => {
      jest.spyOn(locationService.repository.location, 'find').mockRejectedValue(defaultError)

      await expect(locationService.getLocations(mockContext)).rejects.toThrow(defaultError)
    })
  })

  describe('create location', () => {
    test('happy path', async () => {
      jest.spyOn(locationService.repository.location, 'create').mockResolvedValue(createdLocation)

      const newLocation = await locationService.createLocation(mockContext, createLocationRequest)

      expect(newLocation).toBeDefined()
      expect(locationService.repository.location.create).toHaveBeenCalledTimes(1)
    })
  })

  describe('delete location', () => {
    test('happy path', async () => {
      jest.spyOn(locationService.repository.location, 'findByUid').mockResolvedValue(dbFindResponse)
      jest.spyOn(locationService.repository.location, 'delete').mockResolvedValue(dbResponse)

      await locationService.deleteLocation(mockContext, 'test-uid')

      expect(locationService.repository.location.delete).toHaveBeenCalledTimes(1)
    })
  })

  describe('find location', () => {
    test('happy path', async () => {
      const { id, ...expectedResponse } = dbResponse
      jest.spyOn(locationService.repository.location, 'findByUid').mockResolvedValue(dbResponse)

      const location = await locationService.getLocation(mockContext, 'test-location')

      expect(location.data).toEqual([expectedResponse])
    })
  })

  describe('update location', () => {
    test('updateLocation updates a location', async () => {
      const { id, ...expectedResponse } = updatedLocation
      jest.spyOn(locationService.repository.location, 'update').mockResolvedValue(updatedLocation)

      const location = await locationService.updateLocation(mockContext, 'test-location', {
        name: 'Updated Test Location',
      })

      expect(location.data).toEqual([expectedResponse])
    })
  })
})