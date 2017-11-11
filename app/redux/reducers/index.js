import { combineReducers } from 'redux'
import appData             from './dataReducer'
import login                from './loginReducer'

const rootReducer = combineReducers({
    appData,
    login
})

export default rootReducer