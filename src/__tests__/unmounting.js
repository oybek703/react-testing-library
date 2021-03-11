import React from 'react'
import {act, render} from "@testing-library/react"
import {Countdown} from "countdown"

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

beforeEach(() => {
  jest.clearAllMocks()
})

afterAll(() => {
  console.error.mockRestore()
})
test(
    'does not attempts to set state when unmounted (to prevent memory leaks)',
    () => {
      jest.useFakeTimers()
      const {unmount} = render(<Countdown/>)
      unmount()
      act(() => jest.runOnlyPendingTimers())
      expect(console.error).not.toHaveBeenCalled()

})