import assignToEmpty from '../utils/assign'
import { FETCH_INSTAGRAM_PHOTOS } from '../constants/AppConstants'

const initialState = {
  images: []
}

function photosReducer (state = initialState, action) {
  Object.freeze(state)
  switch (action.type) {
    case FETCH_INSTAGRAM_PHOTOS:

      const images = action.data.map((item) => (
        item.images.standard_resolution.url
      ))

      return assignToEmpty(state, {
        images
      })
    default:
      return state
  }
}

export default photosReducer
