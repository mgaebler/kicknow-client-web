import * as types from './types'

export function searchInput(state = { text: '' }, action) {
  // console.log('reducer searchInput was called with state', state, 'and action', action)
  switch (action.type) {
    case types.SEARCH_INPUT:
      return {
        text: action.text
      }
    default:
      return state
  }
}

export function drawer(state = false, action) {
  switch (action.type) {
    case types.OPEN_DRAWER:
      return true
    case types.CLOSE_DRAWER:
      return false
    default:
      return state
  }
}
