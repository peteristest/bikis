import assignToEmpty from '../utils/assign'
import { FETCH_INSTAGRAM_PHOTOS } from '../constants/AppConstants'

const initialState = {
  images: []
}

function photosReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_INSTAGRAM_PHOTOS:

      return assignToEmpty(state, {
        images: action.data
      })

    default:
      return state
  }
}

export default photosReducer
