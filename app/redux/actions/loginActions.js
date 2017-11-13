import { LOG_IN, LOG_IN_FACE, LOG_OUT } from '../settings'

export function logIn(id) {
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


export function logOut() {
    return {
        type: LOG_OUT
    }
}



