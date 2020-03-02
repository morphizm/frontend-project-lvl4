import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { messages: { allIds, byId }, currentChannelId } = state;
  const messages = allIds
    .map((id) => byId[id])
    .filter((mes) => mes.channelId === currentChannelId);
  return { messages };
};

const actionCreators = {
};

const renderMessage = (item) => {
  const {
    userName, message, id,
  } = item;

  const vdom = (
    <div key={id} className="d-flex-column">
      <h6>{userName}</h6>
      <p className="px-2">{message}</p>
    </div>
  );
  return vdom;
};

const Messages = ({ messages }) => {
  const style = {
    minHeight: '75vh',
    maxHeight: '75vh',
  };

  const vdom = (
    <div className="d-flex-column overflow-auto" style={style}>
      {messages.map(renderMessage)}
    </div>
  );

  return vdom;
};

export default connect(mapStateToProps, actionCreators)(Messages);
