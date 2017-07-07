// Sets up shortcuts to Firebase features and initiate firebase auth.
import firebase from '../../config/firebase'

export const auth = firebase.auth()
export const database = firebase.database()
export const storage = firebase.storage()
