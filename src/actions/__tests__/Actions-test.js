jest.unmock('./../../constants/AppConstants')
jest.unmock('./../../utils/assign')
jest.unmock('./../../config')
jest.unmock('./../')
jest.unmock('redux-thunk')
jest.unmock('redux-mock-store')
jest.unmock('nock')
jest.unmock('isomorphic-fetch')

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './../'
import * as types from './../../constants/AppConstants'
import nock from 'nock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates FETCH_CYCLING_DATA when fetching and receiving cycling data', () => {
    nock('http://peter.is')
      .get('/api/cycling')
      .reply(200, { name: 'Ride 01', distance: 100, date: '2016-01-01T00:00:00Z' })

    const expectedActions = [
      { type: types.FETCH_CYCLING_DATA, data: { name: 'Ride 01', distance: 100, date: '2016-01-01T00:00:00Z' } }
    ]
    const store = mockStore({ cycling: {} })

    return store.dispatch(actions.asyncFetchCyclingData())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('creates FETCH_SITE_CONTENT when fetching and receiving site content', () => {
    nock('http://peter.is')
      .get('/api/content')
      .reply(200, { bio: 'bio', work: Array(3).fill('work'), awards: Array(3).fill('award') })

    const expectedActions = [
      { type: types.FETCH_SITE_CONTENT, data: { bio: 'bio', work: Array(3).fill('work'), awards: Array(3).fill('award') } }
    ]
    const store = mockStore({ home: { bio: '' } })

    return store.dispatch(actions.asyncFetchSiteContent())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('creates FETCH_INSTAGRAM_PHOTOS when fetching and receiving photos', () => {
    nock('http://peter.is')
      .get('/api/photos')
      .reply(200, Array(10).fill('image.png'))

    const expectedActions = [
      { type: types.FETCH_INSTAGRAM_PHOTOS, data: Array(10).fill('image.png') }
    ]
    const store = mockStore({ photos: { images: [] } })

    return store.dispatch(actions.asyncFetchInstagramPhotos())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
