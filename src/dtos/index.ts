export * from '@dtos/trucks'
export * from '@dtos/locations'

export type ListResponse<T> = {
  data: T[]
  count: number
  hasMore: boolean
}

export type RequestContext = Record<string, any>
