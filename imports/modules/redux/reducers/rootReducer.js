import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import countReducer from './countReducer'
import filterReducer from './filterReducer'

const rootReducer = combineReducers({
  login: loginReducer,
  count: countReducer,
  filter: filterReducer
})

export default rootReducer;
