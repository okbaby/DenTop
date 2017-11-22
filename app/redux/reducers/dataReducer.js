import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from '../settings'

const initialState = {
    data: [],
    mapData: [],
    latlong: {},
    dataFetched: false,
    isFetching: false,
    error: false
}

export default function dataReducer (state = initialState, action) {
    switch (action.type) {
        case FETCHING_DATA:
            return {
                ...state,
                data: [],
                isFetching: true
            }
        case FETCHING_DATA_SUCCESS:
            return {
                ...state,
                isFetching: true,
                mapData: action.data.maps,
                latlong: action.data.lats,
            }
        case FETCHING_DATA_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}