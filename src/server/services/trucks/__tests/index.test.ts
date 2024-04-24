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

  describe('update truck', () => {
    test('happy path', async () => {
      jest.spyOn(truckManagementService.repository.truck, 'findByUid').mockResolvedValue(dbResponse)
      jest.spyOn(truckManagementService.repository.truck, 'update').mockResolvedValue(dbResponse)

      await truckManagementService.updateTruck(mockContext, 'test-truck', updateTruckRequest)
      expect(truckManagementService.repository.truck.update).toHaveBeenCalledTimes(1)
    })
  })

  describe('delete truck', () => {
    test('happy path', async () => {
      jest.spyOn(truckManagementService.repository.truck, 'delete').mockResolvedValue(dbResponse)
      jest.spyOn(truckManagementService.repository.truck, 'findByUid').mockResolvedValue(dbResponse)

      await truckManagementService.deleteTruck(mockContext, 'test-truck')
      expect(truckManagementService.repository.truck.delete).toHaveBeenCalledTimes(1)
    })
  })
})
