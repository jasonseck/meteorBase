import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import countReducer from './countReducer'

const rootReducer = combineReducers({
  login: loginReducer,
  count: countReducer
})

export default rootReducer;
