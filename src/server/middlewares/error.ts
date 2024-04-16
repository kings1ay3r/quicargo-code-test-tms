import { NextFunction, Request, Response } from 'express'
import logger from '@app/server/common/logger.js'

function errorMiddleware(
  error: Error & { status?: number },
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const status: number = error.status || 500
  const message: string = error.message || 'internal server error, please try again later.'

  logger.error(
    'errorMiddleware',
    `${req.socket.remoteAddress} ${req.method} ${req.path} ${status}`,
    res.locals,
    {
      path: req.path,
      req: { query: req.query, params: req.params, body: req.body },
      err: error,
    },
  )
  const respMessage = {
    status: 'fail',
    data:
      process.env.NODE_ENV === 'DEVELOPMENT' || process.env.NODE_ENV === 'DEBUG' ? error.stack : {},
    message: message || '',
  }
  res.status(status).json(respMessage)
}

export default errorMiddleware
