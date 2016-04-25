import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import DevTools from './containers/devtools'
import configureStore from './store/configure_store';

import SearchPage from './containers/search_page'

const store = configureStore();
// console.info('store state after initialization:', store.getState());
// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).

ReactDOM.render(
  (
    <Provider store={store}>
      <SearchPage />
      {/* <DevTools /> */}
    </Provider>
  ),
  document.getElementById("App")
);
