import { RequestContext } from '@app/dtos/index.js'

const containsOneOf = (set, values) => {
  return values.some(value => set.has(value))
}
export default (ctx: RequestContext, claims: string[]) => {
  if (!ctx.accessor || !containsOneOf(ctx.accessor.claims, claims)) {
    throw new Error('Unauthorized')
  }
}
