import React from "react"
import {Modal} from "modal"
import {render, within} from "@testing-library/react"

test('modal shows the children', () => {
  render(<Modal><div data-testid="test"/></Modal>)
  const {getByTestId} = within(document.getElementById('modal-root'))
  expect(getByTestId('test')).toBeInTheDocument()
})