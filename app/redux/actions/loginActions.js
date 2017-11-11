import { LOG_IN } from '../settings'

export function logIn(id) {
    return {
        type: LOG_IN,
        id
    }
}


