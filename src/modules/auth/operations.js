import { auth } from '../firebase/operations'
import { googleAuth } from '../firebase/authProvider'
const USER_CHANGED = 'auth/USER_CHANGED'

let initialUser = {
  uid: null,
  isAnonymous: true,
  displayName: null,
  photoURL: null
}

export function signOut() {
  auth.signOut()
  return true
}

export function signIn() {
  auth.signInWithPopup(googleAuth)
}

export function userChanged(user) {
  return {
    type: USER_CHANGED,
    user: user
      ? {
          uid: user.uid,
          isAnonymous: user.isAnonymous,
          displayName: user.displayName,
          photoURL: user.photoURL
        }
      : initialUser
  }
}

export function user(
  user = {
    uid: null,
    isAnonymous: true,
    displayName: null,
    photoURL: null
  },
  action
) {
  switch (action.type) {
    case USER_CHANGED:
      return action.user
    default:
      return user
  }
}
