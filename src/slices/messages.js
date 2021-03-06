// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import routes from '../routes';
import { actions as channelsActions } from './channels';

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
  },
  extraReducers: (builder) => {
    builder.addCase(channelsActions.removeChannelSuccess, (state, { payload }) => {
      const { id } = payload;
      const allRemovedChannelMessagesIds = _.keys(
        _.pickBy(state.byId, (message) => message.channelId === id),
      );
      state.allIds = _.without(state.allIds, ...allRemovedChannelMessagesIds.map(Number));
      state.byId = _.omitBy(state.byId, (message) => message.channelId === id);
    });
  },
});

export const sendMessage = (data) => async () => {
  const { channelId } = data;
  await axios.post(routes.channelMessagesPath(channelId), {
    data: {
      attributes: _.omit(data, 'channelId'),
    },
  });
};

const actions = { ...slice.actions };
export { actions };
export default slice.reducer;
