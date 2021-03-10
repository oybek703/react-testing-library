import React from 'react'
import {render, fireEvent, waitFor} from '@testing-library/react'
import {Redirect} from 'react-router'
import {build, fake, sequence} from 'test-data-bot'
import {savePost as mockSavePost} from '../api'
import {Editor} from '../post-editor-01-markup'

jest.mock('../api')
jest.mock('react-router', () => ({
  Redirect: jest.fn(() => null)
}))
afterEach(() => jest.clearAllMocks())

const postBuilder = build('Post').fields({
  title: fake(f => f.lorem.words()),
  content: fake(f => f.lorem.paragraphs().replace(/\r/g, '')),
  tags: fake(f => [f.lorem.words(), f.lorem.words(), f.lorem.words()])
})

const userBuilder = build('User').fields({
  id: sequence(s => `user-${s}`)
})

test('renders a form with title, content, tags and submit button', async () => {
  mockSavePost.mockResolvedValueOnce()
  const {getByText, getByLabelText} = render(<Editor/>)
  const fakeUser = userBuilder()
  const preDate = new Date().getTime()
  const fakePost = postBuilder()
  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = getByText(/submit/i)
  fireEvent.click(submitButton)
  expect(submitButton).toBeDisabled()
  expect(mockSavePost).toHaveBeenCalledTimes(1)
  const postDate = new Date().getTime()
  const date = new Date(mockSavePost.mock.calls[0][0].date).getTime()
  expect(date).toBeGreaterThanOrEqual(preDate)
  expect(date).toBeLessThanOrEqual(postDate)
  await waitFor(() =>
      expect(mockSavePost)
          .toHaveBeenCalledWith(
              {...fakePost, date: expect.any(String), authorId: fakeUser.id}))
  expect(Redirect).toHaveBeenCalledWith({to: '/'}, {})
})

test('renders error message when post save rejected', async () => {
  const testError = 'TEST ERROR'
  mockSavePost.mockRejectedValueOnce({data: {error: testError}})
  const {getByText, findByRole} = render(<Editor/>)
  const submitButton = getByText(/submit/i)
  fireEvent.click(submitButton)
  expect(await findByRole('alert')).toHaveTextContent(testError)
  expect(submitButton).not.toBeDisabled()
})