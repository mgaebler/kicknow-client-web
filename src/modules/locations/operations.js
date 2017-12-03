import * as actions from './actions'
import locations from './test_locations'
import { beginAjaxCall } from '../loader/operations'
// const PLACES_ENDPOINT = 'http://private-f0df95-kicknow.apiary-mock.com/places'
import firebase from 'firebase'
const locationsRef = 'locations/'

export function fetchItems() {
  return async (dispatch, getState) => {
    // let searchPhrase = getState().searchInput.text
    // let position = getState().position
    // let queryObject = actions.createQueryObject(searchPhrase, position)
    dispatch(beginAjaxCall())
    dispatch(actions.requestItems('fetch'))
    try {
      // let response = await fetch(PLACES_ENDPOINT, {
      //   method: 'POST',
      //   mode: 'cors'
      // })

      // if (response.ok) {
      //   dispatch(actions.requestItems('success'))
      //   let data = await response.json()
      //   dispatch(actions.receiveItems(data))
      // }

      dispatch(actions.receiveItems(locations))
    } catch (error) {
      dispatch(actions.requestItems('fail'))
    }
  }
}

export function addLocation(location) {
  return firebase
    .database()
    .ref(`${locationsRef}${location['@id']}`)
    .set(location)
}
