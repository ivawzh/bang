import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import currentUserReducer from './current-user'

export default function createReducer(asyncReducers) {
  return combineReducers({
    ...asyncReducers,
    routing: routerReducer,
    models: combineReducers({
      currentUser: currentUserReducer
    })
  })
}
