import assignToEmpty from '../utils/assign'
import { FETCH_CYCLING_DATA } from '../constants/AppConstants'

const initialState = {
  distance: 0,
  name: '',
  date: new Date().time
}

function cyclingReducer (state = initialState, action) {
  Object.freeze(state)
  switch (action.type) {
    case FETCH_CYCLING_DATA:

      return assignToEmpty(state, action.data)

    default:
      return state
  }
}

export default cyclingReducer
