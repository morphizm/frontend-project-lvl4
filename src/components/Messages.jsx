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

const renderMessage = (message) => {

};

const Messages = ({ messages }) => {


  const vdom = (
    <div className="card">
      0
    </div>
  );

  return vdom;
};

export default connect(mapStateToProps, actionCreators)(Messages);
