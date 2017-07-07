import * as types from './types'

export const beginAjaxCall = () => ({
  type: types.BEGIN_AJAX_CALL
})

export const onAjaxError = response => ({
  response,
  type: types.END_AJAX_CALL_ON_ERROR
})
