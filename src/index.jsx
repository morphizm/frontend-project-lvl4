import React from 'react';
import { render } from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import gon from 'gon';
import faker from 'faker';
import cookies from 'js-cookie';
import io from 'socket.io-client';
// import axios from 'axios';

import reducers from './reducers';
import App from './components/App';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';
import {
  setupState, subscribeOnNewMessage, subscribeOnNewChannel, subscribeOnDeleteChannel,
  subscribeOnRenameChannel,
} from './actions';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

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

store.dispatch(setupState(gon));
store.dispatch(subscribeOnNewMessage(socket));
store.dispatch(subscribeOnNewChannel(socket));
store.dispatch(subscribeOnDeleteChannel(socket));
store.dispatch(subscribeOnRenameChannel(socket));

render(
  <Provider store={store}>
    <App user={user()} />
  </Provider>,
  document.getElementById('chat'),
);
