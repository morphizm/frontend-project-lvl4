import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { channelAddingState, messageSendingState } = state;
  return { channelAddingState, messageSendingState };
};

const alert = (text) => (
  <div className="alert alert-danger" role="alert">
    {text}
  </div>
);

const Errors = (props) => {
  const failed = 'failure';
  const { channelAddingState, messageSendingState } = props;

  if (channelAddingState === failed) {
    return alert('Channel not added.Please, try again');
  }
  if (messageSendingState === failed) {
    return alert('Message not sent.Please, try again');
  }

  return null;
};

export default connect(mapStateToProps)(Errors);
