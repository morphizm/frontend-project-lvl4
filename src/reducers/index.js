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

const users = createReducer({ byId: {}, allIds: [] }, {
  [actions.loadUser](state, action) {
    const { name, id } = action.payload;
    return {
      byId: { ...state.byId, [id]: { name } },
      allIds: [...state.allIds, id],
    };
  },
});

const messages = createReducer({ byId: {}, allIds: [] }, {

});

export default { channels, users, messages };
