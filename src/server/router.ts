import { Router } from 'express'
import handlers from '@app/server/handlers'
import responseMiddleware from '@app/server/middlewares/response'
import errorMiddleware from '@app/server/middlewares/error'
import authMiddleware from '@app/server/middlewares/auth'

const router = Router()

router.get('/ping', (_, res) => {
  res.json({ ping: 'pong' })
})

router.use(authMiddleware)

router.use('/trucks', handlers.truckManagementRouter)
router.use('/locations', handlers.locationManagementRouter)
router.use(responseMiddleware, errorMiddleware)

export default router
