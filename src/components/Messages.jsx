import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { messages: { allIds, byId }, currentChannel } = state;
  const messages = allIds
    .map((id) => byId[id])
    .filter((mes) => mes.channelId === currentChannel.id);
  return { messages };
};

const renderMessage = (item) => {
  const {
    userName, message, id,
  } = item;

  const vdom = (
    <div key={id} className="d-flex-column flex-wrap">
      <h6>{userName}</h6>
      <p className="px-2">{message}</p>
    </div>
  );
  return vdom;
};

const Messages = ({ messages }) => {
  const vdom = (
    <div className="d-flex-column overflow-auto h-75 flex-fill">
      {messages.map(renderMessage)}
    </div>
  );

  return vdom;
};

export default connect(mapStateToProps)(Messages);
