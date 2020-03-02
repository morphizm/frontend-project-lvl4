import { createAction } from '@reduxjs/toolkit';
// import faker from 'faker';
import _ from 'lodash';
import axios from 'axios';
import routes from '../routes';

export const fetchChannelsRequest = createAction('FETCH_CHANNELS_REQUEST');
export const fetchChannelsSuccess = createAction('FETCH_CHANNELS_SUCCESS');
export const fetchChannelsFailure = createAction('FETCH_CHANNELS_FAILURE');

export const fetchChannels = (gon) => async (dispatch) => {
  const { channels } = gon;
  dispatch(fetchChannelsSuccess({ channels }));
};

export const fetchMessageSuccess = createAction('FETCH_MESSAGE_SUCCESS');

// export const fetchMessage = (gon) => async (dispatch) => {
// };

export const fetchMessagesSuccess = createAction('FETCH_MESSAGES_SUCCESS');

export const fetchMessages = (gon) => async (dispatch) => {
  const { messages } = gon;
  dispatch(fetchMessagesSuccess({ messages }));
};

export const fetchCurrentChannelIdSuccess = createAction('FETCH_CURRENT_CHANNEL_ID_SUCCESS');

export const fetchCurrentChannelId = (gon) => async (dispatch) => {
  const { currentChannelId } = gon;
  dispatch(fetchCurrentChannelIdSuccess({ currentChannelId }));
};

export const subscribeOnNewMessage = (socket) => async (dispatch) => {
  socket.on('newMessage', ({ data }) => {
    dispatch(fetchMessageSuccess({ message: data.attributes }));
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
