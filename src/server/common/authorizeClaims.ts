import { RequestContext } from '@app/dtos'

const containsOneOf = (set: Set<string>, values: string[]) => {
  return values.some(value => set.has(value))
}
export default (ctx: RequestContext, claims: string[]) => {
  if (!ctx.accessor || !containsOneOf(ctx.accessor.claims, claims)) {
    throw new Error('Unauthorized')
  }
}
