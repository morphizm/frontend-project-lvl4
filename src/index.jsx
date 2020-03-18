import React from 'react';
import { render } from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import gon from 'gon';
import faker from 'faker';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import i18next from 'i18next';

import reducers from './reducers';
import App from './components/App';
import Context from './context';
import resources from './locales';

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

i18next.init({
  lng: 'en',
  resources,
});

const socket = io();

const user = () => {
  const userName = cookies.get('name');
  if (userName) {
    return { name: userName };
  }
  const newUserName = faker.name.finName();
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
    <Context.Provider value={{ user: user() }}>
      <App />
    </Context.Provider>
  </Provider>,
  document.getElementById('chat'),
);
