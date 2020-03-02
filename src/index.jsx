/* eslint-disable import/no-extraneous-dependencies */
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
import {
  fetchChannels, fetchMessages, fetchCurrentChannelId, subscribeOnNewMessage,
} from './actions';
import routes from './routes';

// @ts-ignore
import gon from 'gon';
import faker from 'faker';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import axios from 'axios';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

// const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
// const devtoolMiddleware = ext && ext();

console.log('gon', gon);
console.log(cookies.get('name'));
const socket = io();

const user = () => {
  const userName = cookies.get('name');
  if (userName) {
    return { name: userName };
  }
  const newUserName = faker.name.findName();
  cookies.set('name', newUserName);
  return { name: newUserName };
};

const store = configureStore({
  reducer: reducers,
});

store.dispatch(fetchChannels(gon));
store.dispatch(fetchMessages(gon));
store.dispatch(fetchCurrentChannelId(gon));
store.dispatch(subscribeOnNewMessage(socket));

render(
  <Provider store={store}>
    <App user={user()} />
  </Provider>,
  document.getElementById('chat'),
);
