import assignToEmpty from '../utils/assign'
import { GOTO_URL } from '../constants/AppConstants'

const initialState = {
  location: ''
}

function uiReducer (state = initialState, action) {
  Object.freeze(state)
  switch (action.type) {
    case GOTO_URL:

      return assignToEmpty(state, {
        location: action.url
      })

    default:
      return state
  }
}

export default uiReducer
