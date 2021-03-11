import React from 'react'
import {BrowserRouter, Router} from 'react-router-dom'
import {render, fireEvent} from '@testing-library/react'
import {Main} from "main"
import {createMemoryHistory} from "history"

test('main renders about and home and i can navigate to those pages', () => {
  const {getByRole, getByText} = render(<BrowserRouter><Main/></BrowserRouter>)
  expect(getByRole('heading')).toHaveTextContent(/home/i)
  expect(getByText(/about/i)).toHaveTextContent(/about/i)
  fireEvent.click(getByText(/about/i))
  expect(getByRole('heading')).toHaveTextContent(/about/i)
})

test('renders no match route on unmatched route', () => {
  const history = createMemoryHistory({initialEntries: ['/something-do-not-match']})
  const {getByRole} = render(<Router history={history}><Main/></Router>)
  expect(getByRole('heading')).toHaveTextContent(/404/i)
})