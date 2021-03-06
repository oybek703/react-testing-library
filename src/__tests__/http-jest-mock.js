import React from 'react'
import {render, fireEvent, waitFor} from '@testing-library/react'
import {GreetingLoader} from "greeting-loader-01-mocking"

test('loads greeting on click', async() => {
  const mockLoadGreeting = jest.fn()
  const testGreeting = 'TEST_GREETING'
  mockLoadGreeting.mockResolvedValueOnce({data: {greeting: testGreeting}})
  const {getByLabelText, getByText} = render(<GreetingLoader loadGreeting={mockLoadGreeting}/>)
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)
  nameInput.value = 'USERNAME'
  fireEvent.click(loadButton)
  expect(mockLoadGreeting).toHaveBeenCalledWith('USERNAME')
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  await waitFor(() => expect(getByLabelText(/greeting/))
      .toHaveTextContent(testGreeting))
})