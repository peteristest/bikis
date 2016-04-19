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
      const latestRide = action.data[0]

      let { name, distance, start_date } = latestRide
      distance = (distance * 0.001).toFixed(2)

      return assignToEmpty(state, {
        name,
        distance,
        date: start_date
      })
    default:
      return state
  }
}

export default cyclingReducer
