import { createAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import axios from 'axios';
import routes from '../routes';

export const fetchChannelsSuccess = createAction('FETCH_CHANNELS_SUCCESS');

export const fetchChannelSuccess = createAction('FETCH_CHANNEL_SUCCESS');
export const addChannelRequest = createAction('ADD_CHANNEL_REQUEST');
export const addChannelSuccess = createAction('ADD_CHANNEL_SUCCESS');
export const addChannelFailure = createAction('ADD_CHANNEL_FAILURE');

export const removeChannelSuccess = createAction('REMOVE_CHANNEL_SUCCESS');
export const removeChannelRequest = createAction('REMOVE_CHANNEL_REQUEST');
export const removeChannelFailure = createAction('REMOVE_CHANNEL_FAILURE');

export const renameChannelSuccess = createAction('RENAME_CHANNEL_SUCCESS');
export const renameChannelRequest = createAction('RENAME_CHANNEL_REQUEST');
export const renameChannelFailure = createAction('RENAME_CHANNEL_FAILURE');

export const fetchMessageSuccess = createAction('FETCH_MESSAGE_SUCCESS');
export const fetchMessagesSuccess = createAction('FETCH_MESSAGES_SUCCESS');
export const sendMessageRequest = createAction('SEND_MESSAGE_REUQEST');
export const sendMessageSuccess = createAction('SEND_MESSAGE_SUCCESS');
export const sendMessageFailure = createAction('SEND_MESSAGE_FAILURE');

export const fetchCurrentChannelIdSuccess = createAction('FETCH_CURRENT_CHANNEL_ID_SUCCESS');
export const changeCurrentChannel = createAction('CHANGE_CURRENT_CHANNEL');

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

export const addNewChannel = (data) => async (dispatch) => {
  dispatch(addChannelRequest());
  await axios.post(routes.channelsPath(), {
    data: {
      attributes: data,
    },
  }).then(() => dispatch(addChannelSuccess()))
    .catch(dispatch(addChannelFailure));
};

export const removeChannel = ({ id }) => async (dispatch) => {
  dispatch(removeChannelRequest());
  await axios.delete(routes.channelPath(id))
    .then(dispatch(removeChannelSuccess))
    .catch(dispatch(removeChannelFailure));
};

export const renameChannel = (data) => async (dispatch) => {
  dispatch(renameChannelRequest());
  const { id } = data;
  await axios.patch(routes.channelPath(id), {
    data: {
      attributes: data,
    },
  }).then(dispatch(renameChannelSuccess))
    .catch(dispatch(renameChannelFailure));
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
