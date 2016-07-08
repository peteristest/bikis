import assignToEmpty from '../utils/assign'
import { FETCH_CYCLING_DATA } from '../constants/AppConstants'

const initialState = {
  distance: 0,
  name: '',
  date: '2016-01-01T00:00:00Z'
}

function cyclingReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_CYCLING_DATA:

      return assignToEmpty(state, action.data)

    default:
      return state
  }
}

export default cyclingReducer
