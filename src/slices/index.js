// @ts-check

import { combineReducers } from 'redux';

import channels, {
  actions as channelsActions, removeChannel, renameChannel, addNewChannel,
  subscribeOnNewChannel, subscribeOnDeleteChannel, subscribeOnRenameChannel,
} from './channels';
import messages, { actions as messagesActions, sendMessage, subscribeOnNewMessage } from './messages';
import currentChannel, { actions as currentChannelActions } from './currentChannel';

export default combineReducers({
  channels,
  messages,
  currentChannel,
});

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...currentChannelActions,
  subscribeOnNewChannel,
  subscribeOnDeleteChannel,
  subscribeOnRenameChannel,
  subscribeOnNewMessage,
};

const asyncActions = {
  removeChannel,
  renameChannel,
  addNewChannel,
  sendMessage,
};

export {
  actions,
  asyncActions,
};

export const setupState = (gon) => (dispatch) => {
  dispatch(currentChannelActions
    .fetchCurrentChannelIdSuccess({ currentChannelId: gon.currentChannelId }));
  dispatch(channelsActions.fetchChannelsSuccess({ channels: gon.channels }));
  dispatch(messagesActions.fetchMessagesSuccess({ messages: gon.messages }));
};
