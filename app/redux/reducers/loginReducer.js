import { LOG_IN, LOG_IN_FACE, LOG_OUT } from '../settings'

const initialState = {
    isLogging: false,
    faceInfo : {}
}

export default function loginReducer (state = initialState, action) {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                isLogging: true
            }
        case LOG_IN_FACE:
            return {
                ...state,
                isLogging: true,
                faceInfo: Object.assign({}, action.faceInfo.profile || action.faceInfo.credentials)
            }
        case LOG_OUT:
            return {
                ...initialState
            }
        default:
            return state
    }
}