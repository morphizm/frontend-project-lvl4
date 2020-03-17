import React from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next';

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
    return alert(i18next.t('channelFail'));
  }
  if (messageSendingState === failed) {
    return alert(i18next.t('messageFail'));
  }

  return null;
};

export default connect(mapStateToProps)(Errors);
