import { useQuery, UseQueryResult } from '@tanstack/react-query'

import axios from 'axios'
import useAccessor from './useAccessor'

const baseURL = import.meta.env.VITE_REACT_APP_SERVER_URL

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
    enabled: Boolean(accessor?.token), // Only make the API call if accessor is present
    queryFn: async () => {
      try {
        const { data, status } = await axios({
          baseURL,
          method,
          headers: { ...headers, Authorization: `Basic ${accessor.token}` },
          url,
          params,
        })
        return data.data
      } catch (error) {
        throw new Error(error.response.data.message)
      }
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
}

export const apiCall = async (
  accessor: { token: string },
  url: string,
  method: string,
  headers: { [key: string]: string } = {},
  params: { [key: string]: string } = {},
  payload: any = {},
) => {
  try {
    const { data, status } = await axios({
      baseURL,
      method,
      headers: { ...headers, Authorization: `Bearer ${accessor.token}` },
      url,
      params,
      data: payload,
    })
    return data
  } catch (error) {
    return {
      error: {
        message: error.response.data.message,
      },
    }
  }
}
