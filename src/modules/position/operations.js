import { fetchItems } from '../locations/operations'
import * as actions from './actions'
import { addSnack } from '../snacks/actions'
import { beginAjaxCall } from '../loader/operations'

export function getPosition() {
  return dispatch => {
    if (navigator.geolocation) {
      dispatch(beginAjaxCall())
      dispatch(actions.setPositionState('fetch'))

      navigator.geolocation.getCurrentPosition(position => {
        dispatch(actions.setCurrentPosition(position))
        dispatch(actions.setPositionState('success'))
        dispatch(addSnack('got ya'))

        dispatch(fetchItems())
      })
    } else {
      dispatch(
        actions.setPositionState(
          'error',
          'Geolocation is not supported by this browser.'
        )
      )
    }
  }
}
