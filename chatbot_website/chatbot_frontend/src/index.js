import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { throttle } from 'lodash';
import { loadState, saveState } from './localStorage';

import reducers from './redux';
import * as messageActions from 'src/redux/messages/actions';

const persistedState = loadState();

const store = createStore(reducers, persistedState, applyMiddleware(thunk));
store.dispatch(messageActions.connect());
store.subscribe(throttle(() => saveState(store.getState()), 1000));


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
