import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validate, ValidationError, ValidatorOptions } from 'class-validator'
import { Request } from 'express'

const buildErrorDetails = (error: ValidationError): string | Record<string, any> => {
  if (!error.children?.length) {
    return Object.values(error.constraints!).join(',')
  }

  return error.children.reduce(
    (errorDetails: any, error: ValidationError) => ({
      ...errorDetails,
      [error.property]: buildErrorDetails(error),
    }),
    {},
  )
}
const options: ValidatorOptions = {
  skipMissingProperties: false,
  whitelist: true,
  forbidNonWhitelisted: true,
  dismissDefaultMessages: false,
  forbidUnknownValues: true,
  stopAtFirstError: false,
}

export default async (Type: ClassConstructor<any>, req: Request) => {
  const requestObj = {
    ...req.query,
    ...req.body,
    ...req.params,
  }
  console.log(plainToInstance(Type, requestObj), plainToInstance(Type, requestObj).constructor)

  const errors: string[] = await validate(plainToInstance(Type, requestObj)).then(errors => {
    if (errors.length > 0) {
      let errorDetails: string[] = []
      for (const error of errors) {
        errorDetails.push(error.property + ':' + buildErrorDetails(error))
      }
      return errorDetails
    }
    return []
  })
  if (errors.length) throw new Error(errors.join(', '))
  return requestObj
}
