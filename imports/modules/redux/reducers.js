import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import countReducer from './countReducer'

export default combineReducers({
  loginReducer,
  countReducer
})
