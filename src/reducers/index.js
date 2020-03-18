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
  [actions.fetchChannelSuccess](state, { payload }) {
    const { channel } = payload;
    return {
      byId: { ...state.byId, [channel.id]: channel },
      allIds: [...state.allIds, channel.id],
    };
  },
  [actions.removeChannelSuccess](state, { payload }) {
    const { id } = payload;
    return {
      byId: _.omit(state.byId, id),
      allIds: _.without(state.allIds, id),
    };
  },
  [actions.renameChannelSuccess](state, { payload }) {
    const { channel } = payload;
    return {
      byId: { ...state.byId, [channel.id]: channel },
      allIds: state.allIds,
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
      allIds: payload.messages.map((m) => m.id),
    };
  },
});

const currentChannelId = createReducer(null, {
  [actions.fetchCurrentChannelIdSuccess](state, { payload }) {
    return payload.currentChannelId;
  },
  [actions.changeCurrentChannel](state, { payload }) {
    return payload.id;
  },
});

const channelAddingState = createReducer('none', {
  [actions.addChannelFailure]() {
    return 'failure';
  },
  [actions.addChannelRequest]() {
    return 'request';
  },
  [actions.addChannelSuccess]() {
    return 'success';
  },
});

const messageSendingState = createReducer('none', {
  [actions.sendMessageFailure]() {
    return 'failure';
  },
  [actions.sendMessageRequest]() {
    return 'request';
  },
  [actions.sendMessageSuccess]() {
    return 'success';
  },
});

export default {
  channels,
  messages,
  currentChannelId,
  channelAddingState,
  messageSendingState,
};
