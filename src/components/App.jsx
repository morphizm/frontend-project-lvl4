import React from 'react';
import Channels from './Channels';
import Messages from './Messages';
import NewFormMessage from './NewFormMessage';

const App = () => {
  const vdom = (
    <div className="flex">
      <Channels />
      <Messages />
      <NewFormMessage />
    </div>
  );

  return vdom;
};

export default App;
