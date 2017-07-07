// @flow

import * as types from './types'

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === '_SUCCESS'
}
function actionTypeEndsInError(type) {
  return type.substring(type.length - 6) === '_ERROR'
}

export function ajaxStatusReducer(state: number = 0, action: any) {
  if (action.type === types.BEGIN_AJAX_CALL) {
    return state + 1
  } else if (actionTypeEndsInSuccess(action.type)) {
    return state - 1
  } else if (actionTypeEndsInError(action.type)) {
    return state - 1
  }
  return state
}

export function ajaxErrorReducer(state = [], action) {
  if (actionTypeEndsInError(action.type)) {
    // room for implementation
  }
  return state
}
