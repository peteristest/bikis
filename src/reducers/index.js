import { combineReducers } from 'redux'

import home from './home'
import photos from './photos'
import cycling from './cycling'
import ui from './ui'

const rootReducer = combineReducers({
  home,
  photos,
  cycling,
  ui
})

export default rootReducer
