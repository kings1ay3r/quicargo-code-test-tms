import { RequestContext } from '@app/dtos'
import { BadRequestError, UnAuthorizedError } from '@app/dtos/errors'

const containsOneOf = (set: Set<string>, values: string[]) => {
  return values.some(value => set.has(value))
}
export default async (
  ctx: RequestContext,
  claims: string[],
  validator: { validate: Function } | null = null,
  payload = null,
) => {
  if (!ctx.accessor || !containsOneOf(ctx.accessor.claims, claims)) {
    throw new UnAuthorizedError('unauthorized')
  }
  try {
    if (validator && payload) {
      await validator.validate(payload)
    }
  } catch (error) {
    // @ts-ignore
    throw new BadRequestError(error.message)
  }
}
