import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {render, fireEvent} from '@testing-library/react'
import {Main} from "main"

test('main renders about and home and i can navigate to those pages', () => {
  const {getByRole, getByText} = render(<BrowserRouter><Main/></BrowserRouter>)
  expect(getByRole('heading')).toHaveTextContent(/home/i)
  expect(getByText(/about/i)).toHaveTextContent(/about/i)
  fireEvent.click(getByText(/about/i))
  expect(getByRole('heading')).toHaveTextContent(/about/i)
})