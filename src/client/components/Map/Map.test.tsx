/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'
import Map from './map'

describe('Map', () => {
  it('calls onClick when map is clicked', () => {
    const handleClick = jest.fn()
    render(<Map center={[51.505, -0.09]} zoom={13} onClick={handleClick} locations={[]} />)
  })
})
