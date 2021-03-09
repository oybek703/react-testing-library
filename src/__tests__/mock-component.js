import React from 'react'
import {render, fireEvent, waitFor} from '@testing-library/react'
import {HiddenMessage} from "hidden-message"

jest.mock('react-transition-group', () => ({
  CSSTransition: props => props.in ? props.children : null
}))

test('shows hidden message when toggle is clicked', async () => {
  const myMessage = 'hello world'
  const {getByText, queryByText} = render(<HiddenMessage>{myMessage}</HiddenMessage>)
  const toggleButton = getByText(/toggle/i)
  expect(queryByText(myMessage)).not.toBeInTheDocument()
  fireEvent.click(toggleButton)
  expect(queryByText(myMessage)).toBeInTheDocument()
  fireEvent.click(toggleButton)
  await waitFor(() => expect(queryByText(myMessage)).not.toBeInTheDocument())
})