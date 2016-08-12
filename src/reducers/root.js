import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import * as reducers from 'reducers'

const rootReducer = combineReducers({
  routing: routeReducer,
  /* your reducers */
  ...reducers
})

export default rootReducer
