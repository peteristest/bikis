jest.unmock('./../../constants/AppConstants')
jest.unmock('./../../utils/assign')
jest.unmock('./../home')

import reducer, { initialState } from './../home'
import * as types from './../../constants/AppConstants'
import assignToEmpty from './../../utils/assign'

describe('home reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState)
  })

  it('should handle FETCH_SITE_CONTENT', () => {
    expect(
      reducer(undefined, {
        type: types.FETCH_SITE_CONTENT,
        data: { bio: 'bio', work: Array(3).fill('work'), awards: Array(3).fill('award') }
      })
    ).toEqual(assignToEmpty(initialState, { bio: 'bio', work: Array(3).fill('work'), awards: Array(3).fill('award') }))
  })
})
