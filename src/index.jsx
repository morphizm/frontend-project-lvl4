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

// @ts-ignore
import gon from 'gon';
// import faker from 'faker';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon', gon);

const store = configureStore({
  reducer: reducers,
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('chat'),
);
