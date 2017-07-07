import * as types from './types'

export function snackReducer(
  state = { snack: { message: '', open: false } },
  action
) {
  switch (action.type) {
    case types.ADD_SNACK:
      return {
        ...state,
        message: action.message,
        open: true
      }

    case types.CLEAR_SNACK:
      return {
        message: '',
        open: false
      }
    default:
      return state
  }
}
