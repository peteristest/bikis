jest.unmock('./../../constants/AppConstants')
jest.unmock('./../../utils/assign')
jest.unmock('./../ui')

import reducer from './../ui'
import * as types from './../../constants/AppConstants'

describe('ui reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({ location: '' })
  })

  it('should handle GOTO_URL', () => {
    expect(
      reducer(undefined, {
        type: types.GOTO_URL,
        url: 'location'
      })
    ).toEqual({ location: 'location' })
  })
})
