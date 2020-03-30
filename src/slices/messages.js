// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
// import { useDispatch } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import routes from '../routes';

const slice = createSlice({
  name: 'messages',
  initialState: { byId: {}, allIds: [], messageSendingState: 'none' },
  reducers: {
    fetchMessagesSuccess(state, { payload }) {
      state.byId = _.keyBy(payload.messages, 'id');
      state.allIds = payload.messages.map((m) => m.id);
    },
    fetchMessageSuccess(state, { payload }) {
      const { message } = payload;
      const { id } = message;
      state.byId[id] = message;
      state.allIds.push(id);
    },
    sendMessageRequest(state) {
      state.messageSendingState = 'request';
    },
    sendMessageFailure(state) {
      state.messageSendingState = 'failure';
    },
    sendMessageSuccess(state) {
      state.messageSendingState = 'success';
    },
  },
});

const {
  sendMessageFailure, sendMessageRequest, sendMessageSuccess, fetchMessageSuccess,
} = slice.actions;

export const sendMessage = (data) => async (dispatch) => {
  const { channelId } = data;
  dispatch(sendMessageRequest());
  await axios.post(routes.channelMessagesPath(channelId), {
    data: {
      attributes: _.omit(data, 'channelId'),
    },
  }).then(() => dispatch(sendMessageSuccess()))
    .catch(() => dispatch(sendMessageFailure()));
};

export const subscribeOnNewMessage = (socket) => async (dispatch) => {
  socket.on('newMessage', ({ data }) => {
    dispatch(fetchMessageSuccess({ message: data.attributes }));
  });
};


const actions = { ...slice.actions };
export { actions };
export default slice.reducer;
