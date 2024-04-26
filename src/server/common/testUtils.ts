import { RequestContext } from '@app/dtos/index.js'

const defaultError = new Error('default mock error')

const mockContext: RequestContext = {
  accessor: {
    uid: 'test-user',
    role: 'user',
    claims: new Set([]),
  },
}

export { defaultError, mockContext }
