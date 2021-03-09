import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {reportError as mockReportError} from '../api'
import {ErrorBoundary} from "error-boundary"

jest.mock('../api')

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  jest.clearAllMocks()
})

afterAll(() => {
  console.error.mockRestore()
})

function Bomb({shouldThrow}) {
  if(shouldThrow) {
    throw Error('Oops!')
  } else {
    return null
  }
}

test('calls reportError and renders that there was a problem', () => {
  mockReportError.mockResolvedValueOnce({success: true})
  const {rerender, getByText, getByRole, queryByRole, queryByText} =
      render(<Bomb/>, {wrapper: ErrorBoundary})
  rerender(<Bomb shouldThrow/>)
  const error = expect.any(Error)
  const info = {componentStack: expect.stringContaining('Bomb')}
  expect(mockReportError).toHaveBeenCalledWith(error, info)
  expect(mockReportError).toHaveBeenCalledTimes(1)
  expect(console.error).toHaveBeenCalledTimes(2)
  expect(getByRole('alert')).toHaveTextContent(/there was a problem./i)
  expect(getByText(/try again?/i)).toBeInTheDocument()
  console.error.mockClear()
  mockReportError.mockClear()

  rerender(<Bomb/>)
  fireEvent.click(getByText(/try again/i))
  expect(mockReportError).not.toHaveBeenCalled()
  expect(console.error).not.toHaveBeenCalled()
  expect(queryByRole('alert')).not.toBeInTheDocument()
  expect(queryByText(/try again?/i)).not.toBeInTheDocument()
})