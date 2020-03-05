import { createAction } from '@reduxjs/toolkit';
// import faker from 'faker';
import _ from 'lodash';
import axios from 'axios';
import routes from '../routes';

// export const fetchChannelsRequest = createAction('FETCH_CHANNELS_REQUEST');
export const fetchChannelsSuccess = createAction('FETCH_CHANNELS_SUCCESS');
// export const fetchChannelsFailure = createAction('FETCH_CHANNELS_FAILURE');
export const fetchChannelSuccess = createAction('FETCH_CHANNEL_SUCCESS');
export const removeChannelSuccess = createAction('REMOVE_CHANNEL_SUCCESS');
export const renameChannelSuccess = createAction('RENAME_CHANNEL_SUCCESS');

export const fetchMessageSuccess = createAction('FETCH_MESSAGE_SUCCESS');
export const fetchMessagesSuccess = createAction('FETCH_MESSAGES_SUCCESS');

export const fetchCurrentChannelIdSuccess = createAction('FETCH_CURRENT_CHANNEL_ID_SUCCESS');


export const subscribeOnNewMessage = (socket) => async (dispatch) => {
  socket.on('newMessage', ({ data }) => {
    dispatch(fetchMessageSuccess({ message: data.attributes }));
  });
};

export const subscribeOnNewChannel = (socket) => async (dispatch) => {
  socket.on('newChannel', ({ data }) => {
    dispatch(fetchChannelSuccess({ channel: data.attributes }));
  });
};

export const subscribeOnDeleteChannel = (socket) => async (dispatch) => {
  socket.on('removeChannel', ({ data }) => {
    dispatch(removeChannelSuccess({ id: data.id }));
  });
};

export const subscribeOnRenameChannel = (socket) => async (dispatch) => {
  socket.on('renameChannel', ({ data }) => {
    dispatch(renameChannelSuccess({ channel: data.attributes }));
  });
};

export const sendNewChannel = (data) => async () => {
  await axios.post(routes.channelsPath(), {
    data: {
      attributes: data,
    },
  });
};

export const removeChannel = ({ id }) => async () => {
  await axios.delete(routes.channelPath(id));
};

export const renameChannel = (data) => async () => {
  const { id } = data;
  await axios.patch(routes.channelPath(id), {
    data: {
      attributes: data,
    },
  });
};

export const sendMessage = (data) => async () => {
  const { channelId } = data;
  await axios.post(routes.channelMessagesPath(channelId), {
    data: {
      attributes: _.omit(data, 'channelId'),
    },
  });
  // data: { attributes: { content: 'my dog like pit but a', userName: 'Fendk als' }} })
};

export const setupState = (gon) => (dispatch) => {
  const { messages, currentChannelId, channels } = gon;
  dispatch(fetchCurrentChannelIdSuccess({ currentChannelId }));
  dispatch(fetchChannelsSuccess({ channels }));
  dispatch(fetchMessagesSuccess({ messages }));
};

export const changeCurrentChannel = createAction('CHANGE_CURRENT_CHANNEL');
