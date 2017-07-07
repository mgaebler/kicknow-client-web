import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import Root from './Root'

import configureStore from './store/configureStore'

import { getPosition } from './modules/position/operations'

const store = configureStore()
store.dispatch(getPosition())

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
