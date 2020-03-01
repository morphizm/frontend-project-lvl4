import React from 'react';

const renderChannel = (channel) => {
  const {
    id, name,
  } = channel;
  const vdom = (
    <li
      key={id}
      className="list-group-item"
    >
      {name}
    </li>
  );

  return vdom;
};

const Channels = () => {
  const { channels } = gon;
  console.log(channels);
  const vdom = (
    <div className="card" style={{ width: '18rem' }}>
      <div className="card-header">
        Channels:
      </div>
      <ul className="list-group list-group-flush">
        {channels.map(renderChannel)}
      </ul>
    </div>
  );

  return vdom;
};

export default Channels;
