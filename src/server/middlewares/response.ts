'use strict'

import { NextFunction, Request, Response } from 'express'
import logger from '@app/server/common/logger'
import { NotFoundError } from '@app/dtos/errors'

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!res.locals.response) next(new NotFoundError('not found'))
    if (res.locals.responseStatus != undefined && res.locals.responseStatus / 100 != 2) {
      logger.error(
        'responseMiddleWare',
        res.locals,
        `${res.locals.responseStatus}:${res.locals.message}`,
        { url: req.url, body: req.body },
        res.locals.response,
      )
    }
    return res.status(res.locals.responseStatus || 200).send({
      status: 'success',
      data: res.locals.response,
      message: res.locals.responseMsg,
    })
  } catch (error) {
    next(error)
  }
}
