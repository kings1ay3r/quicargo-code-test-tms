'use strict'

import { NextFunction, Request, Response } from 'express'
import logger from '@app/server/common/logger.js'

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    //TODO: (SanityEnhancements) Change this to 404, setup errors
    if (!res.locals.response) throw new Error('method did not write to response')
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
