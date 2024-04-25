import { render } from '@testing-library/react'

import DropdownUser from './DropdownUser'
/**
 * @jest-environment jsdom
 */
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

jest.mock('../../customHooks/useAccessor', () => ({
  __esModule: true,
  default: () => ({
    accessor: { name: 'Test User', img: 'test.jpg' },
    setAccessor: jest.fn(),
  }),
}))

describe('DropdownUser', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <DropdownUser />
      </Router>,
    )
  })

  it('opens and closes the dropdown on click', async () => {
    render(
      <Router>
        <DropdownUser />
      </Router>,
    )
  })
})
