import { NextFunction, Request, Response } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
  // TODO: (FeatureEnhancements) Implement proper auth middleware
  res.locals = {
    accessor: {
      uid: 'test-user-uid',
      role: 'test-user-role',
      claims: new Set(['test-claim-1', 'test-claim-2']),
    },
  }
  return next()
}
