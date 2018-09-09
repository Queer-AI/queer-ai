import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './redux';
import * as messageActions from 'src/redux/messages/actions';

const store = createStore(reducers, {}, applyMiddleware(thunk));
store.dispatch(messageActions.connect());


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
