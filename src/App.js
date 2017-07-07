import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import Root from './Root'

import configureStore from './store/configureStore'
import { getPosition } from './modules/position/operations'
import { auth } from './modules/firebase/operations'
import { userChanged } from './modules/auth/operations'

const store = configureStore()

store.dispatch(getPosition())
auth.onAuthStateChanged(user => {
  store.dispatch(userChanged(user))
})

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename="/">
          <Root />
        </Router>
      </Provider>
    )
  }
}

export default App
