jest.unmock('./../../constants/AppConstants')
jest.unmock('./../../utils/assign')
jest.unmock('./../photos')

import reducer from './../photos'
import * as types from './../../constants/AppConstants'

describe('photos reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      images: []
    })
  })

  it('should handle FETCH_INSTAGRAM_PHOTOS', () => {
    expect(
      reducer(undefined, {
        type: types.FETCH_INSTAGRAM_PHOTOS,
        data: Array(10).fill('image.png')
      })
    ).toEqual({ images: Array(10).fill('image.png') })
  })
})
