import { LOG_IN, LOG_IN_FACE, LOG_OUT, LOAD_LOG_INFO, UPDATE_LOADING_STATUS, UPDATE_AVATAR } from '../settings'

const initialState = {
    isLogging : false,
    faceInfo  : {},
    loading   : true
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
        case LOAD_LOG_INFO:
            return {
                ...action.info
            }
        case UPDATE_LOADING_STATUS:
            return {
                ...state,
                loading: false
            }
        case UPDATE_AVATAR:
            console.log("AUW O", action.avatar)
            return {
                ...state,
                avatar: action.avatar
            }
        default:
            return state
    }
}