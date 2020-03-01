import React from 'react';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
  const { channels: { allIds, byId } } = state;
  const channels = allIds.map((id) => byId[id]);
  return { channels };
};

const actionCreators = {
};

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

const Channels = ({ channels }) => {
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

export default connect(mapStateToProps, actionCreators)(Channels);
