import { combineReducers } from 'redux'
import cars from './cars'
import session from './session'
import { routeReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  cars,
  session,
  router: routeReducer
});

export default rootReducer
