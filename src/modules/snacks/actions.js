import * as types from './types'

export function addSnack(message) {
  return {
    type: types.ADD_SNACK,
    message
  }
}

export function clearSnack() {
  return {
    type: types.CLEAR_SNACK
  }
}
