import * as types from './types'

export function setPositionState(status, message = '') {
  return {
    type: types.SET_POSITION_STATE,
    status,
    message
  }
}

export function setCurrentPosition(geolocation) {
  return {
    type: types.SET_CURRENT_POSITION,
    geolocation
  }
}
