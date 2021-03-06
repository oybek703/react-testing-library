import React from 'react'
import {FavoriteNumber} from "favorite-number"
import {render} from '@testing-library/react'

test('renders number input with a label "Favorite number"', () => {
    const {getByLabelText} = render(<FavoriteNumber/>)
    const input = getByLabelText( /favorite Number/i)
    expect(input).toHaveAttribute('type', 'number')
})