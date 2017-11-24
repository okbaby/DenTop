import { combineReducers }  from 'redux'
import data                 from './dataReducer'
import login                from './loginReducer'
import map                  from './mapReducer'

const rootReducer = combineReducers({
    data,
    login,
    map
})

export default rootReducer