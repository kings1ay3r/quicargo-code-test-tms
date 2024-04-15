import { Router } from 'express'

const router = Router()

router.get('/ping', (_, res) => {
  res.json({ ping: 'pong' })
})

export default router
