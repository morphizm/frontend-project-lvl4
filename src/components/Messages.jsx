import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

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

const Messages = () => {
  const {
    messages: { allIds, byId }, currentChannel,
  } = useSelector((state) => state);
  const messages = allIds
    .map((id) => byId[id])
    .filter((mes) => mes.channelId === currentChannel.id);
  const messagesContainerRef = useRef();

  useEffect(() => {
    messagesContainerRef.current.scrollTo(0, messagesContainerRef.current.scrollHeight);
  }, [allIds, currentChannel]);

  const vdom = (
    <div className="d-flex-column overflow-auto h-75 flex-fill" ref={messagesContainerRef}>
      {messages.map(renderMessage)}
    </div>
  );

  return vdom;
};

export default Messages;
