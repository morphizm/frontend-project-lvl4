import React from 'react';
import Channels from './Channels';
import Messages from './Messages';
import NewFormMessage from './NewFormMessage';

const App = ({ user }) => {
  const vdom = (
    <div className="d-flex min-vh-100 mh-100">
      <Channels />
      <div className="d-flex-column flex-fill m-2">
        <Messages />
        <NewFormMessage user={user} />
      </div>
    </div>
  );

  return vdom;
};

export default App;
