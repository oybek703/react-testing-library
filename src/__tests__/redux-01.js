import React from 'react'
import {render as rtlRender, fireEvent} from '@testing-library/react'
import {Counter} from "redux-counter"
import {Provider} from "react-redux"
import {store} from "redux-store"
import {createStore} from "redux"
import {reducer} from "redux-reducer"

function render(
    ui,
    {initialState = store, ...options} = {}) {
  function Wrapper() {
    return <Provider store={initialState}>{ui}</Provider>
  }
  return rtlRender(ui, {wrapper: Wrapper, ...options})
}

test('can render redux with defaults', () => {
  const {getByText, getByLabelText} = render(<Counter/>)
  fireEvent.click(getByText('+'))
  expect(getByLabelText('count')).toHaveTextContent('1')
})

test('can render redux with custom initial state', () => {
  const customStore = createStore(reducer, {count: 3})
  const {getByText, getByLabelText} = render(<Counter/>, {initialState: customStore})
  fireEvent.click(getByText('-'))
  expect(getByLabelText('count')).toHaveTextContent('2')
})