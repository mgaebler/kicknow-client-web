import * as types from './types'

export function position(
  state = { lat: 0, lon: 0, status: 'neutral' },
  action
) {
  // console.log('position', action)
  switch (action.type) {
    case types.SET_CURRENT_POSITION:
      return {
        ...state,
        lat: action.geolocation.coords.latitude,
        lon: action.geolocation.coords.longitude
      }
    case types.SET_POSITION_STATE:
      return {
        ...state,
        status: action.status
      }
    default:
      return state
  }
}
