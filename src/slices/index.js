// @ts-check

import { combineReducers } from 'redux';

import channels, {
  actions as channelsActions, removeChannel, renameChannel, addNewChannel,
} from './channels';
import messages, { actions as messagesActions, sendMessage } from './messages';
import currentChannel, { actions as currentChannelActions } from './currentChannel';

export default combineReducers({
  channels,
  messages,
  currentChannel,
});

const asyncActions = {
  removeChannel,
  renameChannel,
  addNewChannel,
  sendMessage,
};

export const setupState = (gon) => (dispatch) => {
  dispatch(currentChannelActions
    .fetchCurrentChannelIdSuccess({ currentChannelId: gon.currentChannelId }));
  dispatch(channelsActions.fetchChannelsSuccess({ channels: gon.channels }));
  dispatch(messagesActions.fetchMessagesSuccess({ messages: gon.messages }));
};

const subscribeOnNewMessage = (socket) => async (dispatch) => {
  socket.on('newMessage', ({ data }) => {
    dispatch(messagesActions.fetchMessageSuccess({ message: data.attributes }));
  });
};

const subscribeOnNewChannel = (socket) => async (dispatch) => {
  socket.on('newChannel', ({ data }) => {
    dispatch(channelsActions.fetchChannelSuccess({ channel: data.attributes }));
  });
};

const subscribeOnDeleteChannel = (socket) => async (dispatch) => {
  socket.on('removeChannel', ({ data }) => {
    dispatch(channelsActions.removeChannelSuccess({ id: data.id }));
  });
};

const subscribeOnRenameChannel = (socket) => async (dispatch) => {
  socket.on('renameChannel', ({ data }) => {
    dispatch(channelsActions.renameChannelSuccess({ channel: data.attributes }));
  });
};

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...currentChannelActions,
  subscribeOnNewChannel,
  subscribeOnDeleteChannel,
  subscribeOnRenameChannel,
  subscribeOnNewMessage,
};

export {
  actions,
  asyncActions,
};
