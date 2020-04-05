import React from 'react';
import { useSelector } from 'react-redux';
import i18next from 'i18next';

const alert = (text) => (
  <div className="alert alert-danger" role="alert">
    {text}
  </div>
);

const Errors = () => {
  const failed = 'failure';
  const { messageSendingState } = useSelector((state) => state.messages);
  const { channelAddingState } = useSelector((state) => state.channels);

  if (channelAddingState === failed) {
    return alert(i18next.t('channelFail'));
  }
  if (messageSendingState === failed) {
    return alert(i18next.t('messageFail'));
  }

  return null;
};

export default Errors;
