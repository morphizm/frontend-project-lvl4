// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'currentChannel',
  initialState: { id: null },
  reducers: {
    fetchCurrentChannelIdSuccess(state, { payload }) {
      state.id = payload.currentChannelId;
    },
    changeCurrentChannel(state, { payload }) {
      state.id = payload.id;
    },
  },
});

const actions = { ...slice.actions };
export { actions };
export default slice.reducer;
