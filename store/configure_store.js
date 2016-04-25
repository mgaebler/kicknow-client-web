import { compose, createStore, applyMiddleware } from 'redux';
import { createHistory } from 'history';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import DevTools from '../containers/devtools';

import reducer from '../reducers';
import routes from '../routes';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = compose(
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  ),
  DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
