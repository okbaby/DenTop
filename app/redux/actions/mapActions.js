import { UPDATE_POSITION, UPDATE_MARKERS  } from '../settings'

export function updatePosition(position) {
    return {
        type        : UPDATE_POSITION,
        position    : position
    }
}


export function updateMarkers(markers) {
    return {
        type        : UPDATE_MARKERS,
        markers     : markers
    }
}

