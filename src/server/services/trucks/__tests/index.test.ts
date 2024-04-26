import TruckManagementService from '@app/server/services/trucks/index'
import { defaultError, mockContext } from '@app/server/common/testUtils'
import {
  createTruckRequest,
  dbResponse,
  locationDbResponse,
  updateTruckRequest,
} from './test-constants'

describe('TruckManagementService', () => {
  const truckManagementService: TruckManagementService = new TruckManagementService()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createTruck', () => {
    test('happy path', async () => {
      jest.spyOn(truckManagementService.repository.truck, 'create').mockResolvedValue(dbResponse)
      jest
        .spyOn(truckManagementService.repository.location, 'findByUid')
        .mockResolvedValue(locationDbResponse)

      await truckManagementService.createTruck(mockContext, createTruckRequest)

      expect(truckManagementService.repository.truck.create).toHaveBeenCalledTimes(1)
    })
    test('db error on create', async () => {
      jest.spyOn(truckManagementService.repository.truck, 'create').mockRejectedValue(defaultError)
      jest
        .spyOn(truckManagementService.repository.location, 'findByUid')
        .mockResolvedValue(locationDbResponse)

      await expect(
        truckManagementService.createTruck(mockContext, createTruckRequest),
      ).rejects.toThrow(defaultError)
    })
    test('db error on find location', async () => {
      jest
        .spyOn(truckManagementService.repository.location, 'findByUid')
        .mockRejectedValue(defaultError)

      await expect(
        truckManagementService.createTruck(mockContext, createTruckRequest),
      ).rejects.toThrow(defaultError)
    })
  })

  describe('update truck', () => {
    test('happy path', async () => {
      jest.spyOn(truckManagementService.repository.truck, 'findByUid').mockResolvedValue(dbResponse)
      jest.spyOn(truckManagementService.repository.truck, 'update').mockResolvedValue(dbResponse)

      await truckManagementService.updateTruck(mockContext, 'test-truck', updateTruckRequest)
      expect(truckManagementService.repository.truck.update).toHaveBeenCalledTimes(1)
    })
    test('db error on update', async () => {
      jest.spyOn(truckManagementService.repository.truck, 'create').mockRejectedValue(defaultError)
      jest
        .spyOn(truckManagementService.repository.location, 'findByUid')
        .mockResolvedValue(locationDbResponse)

      await expect(
        truckManagementService.createTruck(mockContext, createTruckRequest),
      ).rejects.toThrow(defaultError)
    })

    test('db error on find truck', async () => {
      jest
        .spyOn(truckManagementService.repository.location, 'findByUid')
        .mockRejectedValue(defaultError)

      await expect(
        truckManagementService.createTruck(mockContext, createTruckRequest),
      ).rejects.toThrow(defaultError)
    })
  })

  describe('delete truck', () => {
    test('happy path', async () => {
      jest.spyOn(truckManagementService.repository.truck, 'delete').mockResolvedValue(dbResponse)
      jest.spyOn(truckManagementService.repository.truck, 'findByUid').mockResolvedValue(dbResponse)

      await truckManagementService.deleteTruck(mockContext, 'test-truck')
      expect(truckManagementService.repository.truck.delete).toHaveBeenCalledTimes(1)
    })
    test('db error on delete', async () => {
      jest.spyOn(truckManagementService.repository.truck, 'delete').mockRejectedValue(defaultError)
      jest.spyOn(truckManagementService.repository.truck, 'findByUid').mockResolvedValue(dbResponse)

      await expect(truckManagementService.deleteTruck(mockContext, 'test-truck')).rejects.toThrow(
        defaultError,
      )
    })
    test('db error on find truck', async () => {
      jest.spyOn(truckManagementService.repository.truck, 'delete').mockResolvedValue(dbResponse)
      jest
        .spyOn(truckManagementService.repository.truck, 'findByUid')
        .mockRejectedValue(defaultError)

      await expect(truckManagementService.deleteTruck(mockContext, 'test-truck')).rejects.toThrow(
        defaultError,
      )
    })
  })
  describe('get truck', () => {
    test('happy path', async () => {
      const { id, locationId, ...expectedResponse } = dbResponse
      jest.spyOn(truckManagementService.repository.truck, 'findByUid').mockResolvedValue(dbResponse)

      const truck = await truckManagementService.getTruck(mockContext, 'test-truck')

      expect(truck.data).toEqual([expectedResponse])
    })
    test('db error on find truck', async () => {
      jest
        .spyOn(truckManagementService.repository.truck, 'findByUid')
        .mockRejectedValue(defaultError)

      await expect(truckManagementService.getTruck(mockContext, 'test-truck')).rejects.toThrow(
        defaultError,
      )
    })
  })
  describe('get trucks', () => {
    test('happy path', async () => {
      const { id, locationId, ...expectedResponse } = dbResponse
      jest.spyOn(truckManagementService.repository.truck, 'find').mockResolvedValue([dbResponse])

      const trucks = await truckManagementService.getTrucks(mockContext)

      expect(trucks.data).toEqual([expectedResponse])
    })
    test('db error on find trucks', async () => {
      jest.spyOn(truckManagementService.repository.truck, 'find').mockRejectedValue(defaultError)

      await expect(truckManagementService.getTrucks(mockContext)).rejects.toThrow(defaultError)
    })
  })
})
