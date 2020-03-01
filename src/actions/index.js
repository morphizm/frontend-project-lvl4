import { createAction } from '@reduxjs/toolkit';
import faker from 'faker';
import cookies from 'js-cookie';
import _ from 'lodash';

export const loadUser = createAction('LOAD_USER');

export const addUser = () => (dispatch) => {
  const userName = cookies.get('name');
  if (userName) {
    dispatch(loadUser({ name: userName, id: _.uniqueId() }));
  } else {
    const newUserName = faker.name.findName();
    cookies.set('name', newUserName);
    dispatch(loadUser({ name: newUserName, id: _.uniqueId }));
  }
};

export const fetchChannelsRequest = createAction('TASKS_CHANNELS_REQUEST');
export const fetchChannelsSuccess = createAction('TASKS_CHANNELS_SUCCESS');
export const fetchChannelsFailure = createAction('TASKS_CHANNELS_FAILURE');

export const fetchChannels = () => async (dispatch) => {
  const { channels } = gon;
  dispatch(fetchChannelsSuccess({ channels }));
};
