// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import routes from '../routes';

const slice = createSlice({
  name: 'channels',
  initialState: { byId: {}, allIds: [], channelAddingState: 'none' },
  reducers: {
    fetchChannelsSuccess(state, { payload }) {
      state.byId = _.keyBy(payload.channels, 'id');
      state.allIds = payload.channels.map((c) => c.id);
    },
    fetchChannelSuccess(state, { payload }) {
      const { channel } = payload;
      const { id } = channel;
      state.byId[id] = channel;
      state.allIds.push(id);
    },
    removeChannelSuccess(state, { payload }) {
      const { id } = payload;
      state.byId = _.omit(state.byId, id);
      state.allIds = _.without(state.allIds, id);
    },
    renameChannelSuccess(state, { payload }) {
      const { channel } = payload;
      state.byId[channel.id] = channel;
    },
  },
});

export const addNewChannel = (data) => async () => {
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

const actions = { ...slice.actions };
export { actions };
export default slice.reducer;
