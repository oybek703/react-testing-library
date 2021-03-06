import React from 'react'
import {FavoriteNumber} from "favorite-number"
import {fireEvent, getByRole, render} from "@testing-library/react"

test('entering invalid number shows an error message', () => {
    const {getByLabelText, getByRole} = render(<FavoriteNumber/>)
    const input = getByLabelText(/favorite number/i)
    fireEvent.change(input, {target: {value: 10}})
    expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)
})