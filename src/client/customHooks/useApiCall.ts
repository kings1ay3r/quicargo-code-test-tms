import { useQuery, UseQueryResult } from '@tanstack/react-query'

import axios from 'axios'
import useAccessor from './useAccessor'

const baseURL = 'http://localhost:6565/api'

export interface ApiCallProps {
  queryKey: string[]
  method?: 'POST' | 'GET' | 'PATCH' | 'DELETE'
  headers?: object
  url: string
  params?: object
  data?: object
  enabled?: boolean
}

export const useApiCall = <T, Error>({
  queryKey,
  url,
  method = 'GET',
  headers = {},
  params = {},
  enabled = true,
}: ApiCallProps): UseQueryResult<T, Error> => {
  const { accessor } = useAccessor()

  return useQuery<T, Error>({
    queryKey: queryKey,
    enabled: Boolean(accessor?.uid) && enabled, // Only make the API call if accessor is present
    queryFn: async () => {
      const { data } = await axios({
        baseURL,
        method,
        headers: { ...headers, Authorization: `Bearer ${accessor.token}` },
        url,
        params,
      })
      return data
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
}
