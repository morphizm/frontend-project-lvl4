import React from 'react';
import Channels from './Channels';
import Messages from './Messages';
import NewFormMessage from './NewFormMessage';
import Errors from './Errors';

const App = () => {
  const vdom = (
    <>
      <Errors />
      <div className="d-flex min-vh-100 mh-100 flex-nowrap">
        <Channels />
        <div className="d-flex-column min-vh-100 mh-100 flex-fill m-2">
          <Messages />
          <NewFormMessage />
        </div>
      </div>
    </>
  );

  return vdom;
};

export default App;
