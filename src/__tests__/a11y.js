import React from 'react'
import {render} from "@testing-library/react"
import {axe} from "jest-axe"

function Form() {
  return <form>
    <label htmlFor="email">Email address</label>
    <input placeholder='email' id="email"/>
  </form>
}

test('the form is accessible', async() => {
  const {container} = render(<Form/>)
  const result = await axe(container)
  expect(result.violations).toHaveLength(0)
})