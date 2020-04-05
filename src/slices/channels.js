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
    addChannelFailure(state) {
      state.channelAddingState = 'failure';
    },
  },
});

const {
  addChannelFailure, fetchChannelSuccess,
  removeChannelSuccess, renameChannelSuccess,
} = slice.actions;

export const addNewChannel = (data) => async (dispatch) => {
  try {
    await axios.post(routes.channelsPath(), {
      data: {
        attributes: data,
      },
    });
  } catch {
    dispatch(addChannelFailure());
  }
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

const actions = { ...slice.actions };
export { actions };
export default slice.reducer;
