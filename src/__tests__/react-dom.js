import React from 'react'
import ReactDOM from 'react-dom'
import {FavoriteNumber} from "favorite-number"
import {toHaveAttribute} from "@testing-library/jest-dom/dist/to-have-attribute"
import {toHaveTextContent} from "@testing-library/jest-dom/dist/to-have-text-content"

expect.extend({toHaveAttribute, toHaveTextContent})

test('renders number input with a label "Favourite Number"', () => {
    const div = document.createElement('div')
    ReactDOM.render(<FavoriteNumber/>, div)
    expect(div.querySelector('input')).toHaveAttribute('type','number')
    expect(div.querySelector('label')).toHaveTextContent('Favorite Number')
})