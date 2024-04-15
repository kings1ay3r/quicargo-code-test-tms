import { NextFunction, Request, Response, Router } from 'express'
import TruckManagementService from '@app/server/services/trucks'
import { CreateTruckRequest, RequestContext, UpdateTruckRequest } from '@dtos/'

const truckManagementService = new TruckManagementService()

const router: Router = Router()

// Handler to create a new truck
router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.locals.response = await truckManagementService.createTruck(
      res.locals as RequestContext,
      { ...req.body } as CreateTruckRequest,
    )
    return next()
  } catch (error) {
    return next(error)
  }
})

// Handler to get a list of all trucks
router.get('/', async (_: Request, res: Response, next: NextFunction): Promise<void> => {
  //TODO: (ListEnhancements) Implement sorting and filtering
  try {
    res.locals.response = await truckManagementService.getTrucks(res.locals as RequestContext)
    return next()
  } catch (error) {
    return next(error)
  }
})

// Handler to get a truck
router.get(
  '/:licensePlate',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.locals.response = await truckManagementService.getTruck(
        res.locals as RequestContext,
        req.params.licensePlate,
      )
      return next()
    } catch (error) {
      return next(error)
    }
  },
)

// Handler to update the details of a truck
router.patch(
  '/:licensePlate',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.locals.response = await truckManagementService.updateTruck(
        res.locals as RequestContext,
        req.params.licensePlate,
        req.body as UpdateTruckRequest,
      )
      return next()
    } catch (error) {
      return next(error)
    }
  },
)

// Handler to delete a truck
router.delete(
  '/:licensePlate',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.locals.response = await truckManagementService.deleteTruck(
        res.locals as RequestContext,
        req.params.licensePlate,
      )
      return next()
    } catch (error) {
      next(error)
    }
  },
)

export default { truckManagementService, truckManagementRouter: router }
