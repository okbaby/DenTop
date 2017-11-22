import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from '../settings'
import {getMap} from '../../api'

export function getData() {
    return {
        type: FETCHING_DATA
    }
}

export function getDataSuccess(data) {
    return {
        type: FETCHING_DATA_SUCCESS,
        data,
    }
}

export function getDataFailure() {
    return {
        type: FETCHING_DATA_FAILURE
    }
}

export function fetchData() {
    return dispatch => new Promise((resolve, reject) => {
        getMap().then((data) => {
            dispatch(getDataSuccess(data))
            resolve(data);
        });
    });
}


