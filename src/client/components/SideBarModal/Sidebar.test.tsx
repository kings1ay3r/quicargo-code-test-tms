/**
 * @jest-environment jsdom
 */
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Sidebar from './sidebar'

describe('SideBarModal', () => {
  const mockResizeObserver = jest.fn()
  jest.mock('resize-observer-polyfill', () => mockResizeObserver)
  it('opens and closes the modal on button click', () => {
    mockResizeObserver.mockReturnValue({})
    const setOpen = jest.fn()
    render(<Sidebar open={true} setOpen={setOpen} />)

    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)

    expect(setOpen).toHaveBeenCalledWith(false)
  })
  it('renders without crashing', () => {
    render(<Sidebar />)
  })
})
