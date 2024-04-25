import { NextFunction, Request, Response, Router } from 'express'
import TruckManagementService from '@app/server/services/trucks'
import { CreateTruckRequest, RequestContext, UpdateTruckRequest } from '@app/dtos'
import authorizeClaims from '@app/server/common/authorizeClaims'

const truckManagementService = new TruckManagementService()

const router: Router = Router()

// Handler to create a new truck
router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    authorizeClaims(res.locals as RequestContext, ['trucks.write', 'trucks.all'])
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
    authorizeClaims(res.locals as RequestContext, ['trucks.read', 'trucks.all'])
    res.locals.response = await truckManagementService.getTrucks(res.locals as RequestContext)
    return next()
  } catch (error) {
    return next(error)
  }
})

// Handler to get a truck
router.get('/:uid', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    authorizeClaims(res.locals as RequestContext, ['trucks.read', 'trucks.all'])
    res.locals.response = await truckManagementService.getTruck(
      res.locals as RequestContext,
      req.params.uid,
    )
    return next()
  } catch (error) {
    return next(error)
  }
})

// Handler to update the details of a truck
router.patch('/:uid', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    authorizeClaims(res.locals as RequestContext, ['trucks.write', 'trucks.all'])
    res.locals.response = await truckManagementService.updateTruck(
      res.locals as RequestContext,
      req.params.uid,
      req.body as UpdateTruckRequest,
    )
    return next()
  } catch (error) {
    return next(error)
  }
})

// Handler to delete a truck
router.delete('/:uid', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    authorizeClaims(res.locals as RequestContext, ['trucks.all'])
    res.locals.response = await truckManagementService.deleteTruck(
      res.locals as RequestContext,
      req.params.uid,
    )
    return next()
  } catch (error) {
    next(error)
  }
})

export default { truckManagementService, truckManagementRouter: router }
