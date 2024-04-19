import { NextFunction, Request, Response } from 'express'
import { AccessorType } from '@web/customHooks/useAccessor.js'

//Dummy User Service
class UserService {
  static users: Record<string, any> = {
    YWRtaW46: {
      uid: 'test-user-uid',
      role: 'test-user-role',
      claims: new Set(['locations.read', 'locations.write', 'trucks.read', 'trucks.write']),
    },
    YWRtaW48: {
      uid: 'test-admin-uid',
      role: 'test-admin-role',
      claims: new Set(['locations.all', 'trucks.all']),
    },
  }
  static getUser = (token: string): AccessorType => {
    return this.users[token]
  }
}

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) return next(new Error('unauthroized'))

  const [method, value] = req.headers.authorization.split(' ')
  if (method !== 'Basic') return next(new Error('unauthroized'))
  const accessor = UserService.getUser(value)
  if (!accessor) return next(new Error('unauthroized'))
  res.locals = {
    accessor,
  }
  return next()
}
