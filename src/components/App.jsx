import React from 'react';
import Channels from './Channels';
import Messages from './Messages';

const App = () => {
  const vdom = (
    <div className="flex">
      <Channels />
      <Messages />
    </div>
  );

  return vdom;
};

export default App;
