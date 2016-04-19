import { combineReducers } from 'redux'

import home from './home'
import photos from './photos'
import cycling from './cycling'

const rootReducer = combineReducers({
  home,
  photos,
  cycling
})

export default rootReducer
