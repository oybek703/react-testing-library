import {useCounter} from "use-counter"
import {act, renderHook} from "@testing-library/react-hooks"
import React from "react"

test('exposes count and fires increment/decrement functions', () => {
  const {result} = renderHook(useCounter)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of initial count', () => {
  const {result} = renderHook(useCounter, {initialProps: {initialCount: 3}})
  act(() => result.current.increment())
  expect(result.current.count).toBe(4)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(3)

})

test('allows customization of step', () => {
  const {result} = renderHook(useCounter, {initialProps: {step: 10}})
  act(() => result.current.increment())
  expect(result.current.count).toBe(10)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('step can be changed over time', () => {
  const {result, rerender} = renderHook(useCounter, {initialProps: {step: 10}})
  act(() => result.current.increment())
  expect(result.current.count).toBe(10)
  rerender(  {step: 11})
  act(() => result.current.decrement())
  expect(result.current.count).toBe(-1)
})