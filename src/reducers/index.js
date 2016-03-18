import { combineReducers } from 'redux'

import home from './home'
import photos from './photos'

const rootReducer = combineReducers({
  home,
  photos
})

export default rootReducer
