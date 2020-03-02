import { createReducer } from '@reduxjs/toolkit';
import _ from 'lodash';
import * as actions from '../actions';

const channels = createReducer({ byId: {}, allIds: [] }, {
  [actions.fetchChannelsSuccess](state, { payload }) {
    return {
      byId: _.keyBy(payload.channels, 'id'),
      allIds: payload.channels.map((c) => c.id),
    };
  },
});

const messages = createReducer({ byId: {}, allIds: [] }, {
  [actions.fetchMessageSuccess](state, { payload }) {
    const { message } = payload;
    const { id } = message;
    return {
      byId: { ...state.byId, [id]: message },
      allIds: [...state.allIds, id],
    };
  },
  [actions.fetchMessagesSuccess](state, { payload }) {
    return {
      byId: _.keyBy(payload.messages, 'id'),
      allIds: payload.messages.map((c) => c.id),
    };
  },
});

const currentChannelId = createReducer(null, {
  [actions.fetchCurrentChannelIdSuccess](state, { payload }) {
    return payload.currentChannelId;
  },
});

export default {
  channels, messages, currentChannelId,
};
