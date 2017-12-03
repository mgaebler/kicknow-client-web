import firebase from 'firebase'

export const checkInRef = 'checkIns/'
export function checkIn(userId, locationId) {
  // return async dispatch => {
  // const response = await
  firebase
    .database()
    .ref(checkInRef)
    .push()
    .set({
      userId,
      locationId,
      startedAt: firebase.database.ServerValue.TIMESTAMP
    })

  // console.log(response)
  // }
}
