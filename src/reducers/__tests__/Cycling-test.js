jest.unmock('./../../constants/AppConstants')
jest.unmock('./../../utils/assign')
jest.unmock('./../cycling')

import reducer from './../cycling'
import * as types from './../../constants/AppConstants'

describe('cycling reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      distance: 0,
      name: '',
      date: '2016-01-01T00:00:00Z'
    })
  })

  it('should handle FETCH_CYCLING_DATA', () => {
    expect(
      reducer(undefined, {
        type: types.FETCH_CYCLING_DATA,
        data: { distance: 100, name: 'Ride 01', date: '2016-01-01T00:00:00Z' }
      })
    ).toEqual({
      distance: 100,
      name: 'Ride 01',
      date: '2016-01-01T00:00:00Z'
    })
  })
})
