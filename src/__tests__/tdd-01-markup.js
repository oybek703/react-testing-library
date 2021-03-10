import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {Editor} from '../post-editor-01-markup'

test('renders a form with title, content, tags and submit button', () => {
  const {getByText, getByLabelText} = render(<Editor/>)
  getByLabelText(/title/i)
  getByLabelText(/content/i)
  getByLabelText(/tags/i)
  const submitButton = getByText(/submit/i)
  fireEvent.click(submitButton)
  expect(submitButton).toBeDisabled()
})