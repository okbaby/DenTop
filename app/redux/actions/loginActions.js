import { LOG_IN, LOG_IN_FACE, LOG_OUT, LOAD_LOG_INFO, UPDATE_LOADING_STATUS } from '../settings'

export function logInNormal(id) {
    return {
        type: LOG_IN,
        id
    }
}

export function logInFace(info) {
    return {
        type    : LOG_IN_FACE,
        faceInfo: info
    }
}

export function loadLogInfo(info) {
    return {
        type    : LOAD_LOG_INFO,
        info    : info
    }
}


export function logOut() {
    return {
        type: LOG_OUT
    }
}


export function updateLoading() {
    return {
        type: UPDATE_LOADING_STATUS
    }
}




export function logIn(data, type = 'normal') {
    return  (dispatch, getState) => new Promise((resolve, reject) => {
        if(type === 'face'){
           dispatch(logInFace(data))
        }else{
            dispatch(logInNormal(data))
        }

        resolve(data);
    });
}