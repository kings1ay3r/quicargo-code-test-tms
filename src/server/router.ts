import { Router } from 'express'
import handlers from '@app/server/handlers'
import responseMiddleware from '@app/server/middlewares/response'
import errorMiddleware from '@app/server/middlewares/error'

const router = Router()

router.get('/ping', (_, res) => {
  res.json({ ping: 'pong' })
})

router.use('/trucks', handlers.truckManagementRouter)
router.use('/locations', handlers.locationManagementRouter)

router.use(responseMiddleware, errorMiddleware)

export default router
