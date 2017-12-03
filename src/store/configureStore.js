import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'

import { ajaxStatusReducer as ajaxCallsInProgress } from '../modules/loader/reducers'
import { searchInput, drawer, userMenu } from '../modules/navigation/reducers'
import { position } from '../modules/position/reducers'
import { items } from '../modules/locations/reducers'
import { snackReducer as snacks } from '../modules/snacks/reducers'
import { user } from '../modules/auth/operations'

const rootReducer = combineReducers({
  items,
  // selectedItem,
  // navigation
  searchInput,
  drawer,
  // position
  position,
  snacks,
  ajaxCallsInProgress,
  user,
  userMenu
})

// for dev purpose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  )
}
