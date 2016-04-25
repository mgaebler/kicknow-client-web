import { compose, createStore, applyMiddleware } from 'redux';
import { reduxReactRouter } from 'redux-router';
import { createHistory } from 'history';
import thunkMiddleware from 'redux-thunk';

import reducer from '../reducers';
import routes from '../routes';

const createStoreWithMiddleware = compose(
  applyMiddleware(
    thunkMiddleware
  ),
  reduxReactRouter({
    routes,
    createHistory
  })
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState);

  return store;
}
