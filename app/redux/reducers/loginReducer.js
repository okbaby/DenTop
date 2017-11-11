import { LOG_IN } from '../settings'

const initialState = {
    isLogging: false
}

export default function loginReducer (state = initialState, action) {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                isLogging: true
            }
        default:
            return state
    }
}