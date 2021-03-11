import {submitForm as mockSubmitForm} from "../api"
import App from "../app-reach-router"
import {render} from '@testing-library/react'
import user from '@testing-library/user-event'
import React from "react"

jest.mock('../api')

test('can fill out a form across multiple pages', async () => {
  mockSubmitForm.mockResolvedValueOnce({success: true})
  const testData = {food: 'test food', drink: 'test drink'}
  const {findByLabelText, findByText} = render(<App/>)
  user.click(await findByText(/fill.*form/i))
  user.type(await findByLabelText(/favorite food/i), testData.food)
  user.click(await findByText(/next/i))
  user.type(await findByLabelText(/favorite drink/i), testData.drink)
  user.click(await findByText(/review/i))
  expect(await findByLabelText(/food/i)).toHaveTextContent(testData.food)
  expect(await findByLabelText(/drink/i)).toHaveTextContent(testData.drink)
  user.click(await findByText(/confirm/i, {selector: 'button'}))
  expect(mockSubmitForm).toHaveBeenCalledWith(testData)
  expect(mockSubmitForm).toHaveBeenCalledTimes(1)
  user.click(await findByText(/home/i))
  expect(await findByText(/welcome home/i)).toBeInTheDocument()
})