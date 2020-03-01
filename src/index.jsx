/* eslint-disable import/order */
// @ts-check
import React from 'react';
import { render } from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import reducers from './reducers';
import App from './components/App';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';
import { addUser, fetchChannels } from './actions';

// @ts-ignore
import gon from 'gon';
// import faker from 'faker';
import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

// const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
// const devtoolMiddleware = ext && ext();

console.log('gon', gon);
console.log(cookies.get('name'));

const store = configureStore({
  reducer: reducers,
});

store.dispatch(addUser());
store.dispatch(fetchChannels());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('chat'),
);
