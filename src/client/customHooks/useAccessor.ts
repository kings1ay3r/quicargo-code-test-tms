import useLocalStorageState from 'use-local-storage-state'

export interface AccessorType {
  name: string
  token: string
  claims: string[]
}

interface AccessorState {
  accessor: AccessorType
  setAccessor: Function
}

const useAccessor = (): { AccessorType; Function } => {
  const [accessor, setAccessor] = useLocalStorageState('accessor')
  return { accessor, setAccessor }
}

export default useAccessor
