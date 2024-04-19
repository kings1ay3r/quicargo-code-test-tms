import { Navigate, useNavigate } from 'react-router-dom'

import useAccessor, { AccessorType } from '../../customHooks/useAccessor'

const ProtectRoute = ({ children }: any) => {
  const navigate = useNavigate()
  const { accessor }: { accessor: AccessorType } = useAccessor()

  if (!accessor) {
    return <Navigate to='/login' />
  }

  return children
}

export default ProtectRoute
