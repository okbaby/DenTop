import { UPDATE_POSITION, UPDATE_MARKERS } from '../settings'

const initialState = {
    userPosition: {
        latitude        : 0,
        longitude       : 0,
        latitudeDelta   : 0,
        longitudeDelta  : 0
    },
    markers: []
}

export default function mapReducer (state = initialState, action) {

    switch (action.type) {
        case UPDATE_POSITION:
            return {
                ...state,
                userPosition: action.position
            }
        case UPDATE_MARKERS:
            return {
                ...state,
                markers: action.markers
            }
        default:
            return state
    }
}