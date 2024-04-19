export * from '@dtos/trucks'
export * from '@dtos/locations'

export type ListResponse<T> = {
  data: T[]
  count: number
  hasMore: boolean
}

export interface RequestContext extends Record<string, any> {
  accessor: {
    uid: string
    role: string
    claims: Set<string>
  }
}
