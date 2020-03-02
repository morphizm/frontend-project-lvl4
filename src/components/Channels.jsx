import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';


const mapStateToProps = (state) => {
  const { channels: { allIds, byId }, currentChannelId } = state;
  const channels = allIds.map((id) => byId[id]);
  return { channels, currentChannelId };
};

const actionCreators = {
};

const renderChannel = (channel, currentChannelId) => {
  const {
    id, name,
  } = channel;
  const classAttributes = cn({
    'list-group-item': true,
    active: id === currentChannelId,
  });

  const vdom = (
    <li
      key={id}
      className={classAttributes}
    >
      {name}
    </li>
  );

  return vdom;
};

const Channels = ({ channels, currentChannelId }) => {
  const vdom = (
    <div className="card align-items-stretch" style={{ width: '18rem' }}>
      <div className="card-header">
        Channels:
      </div>
      <ul className="list-group list-group-flush">
        {channels.map((c) => renderChannel(c, currentChannelId))}
      </ul>
    </div>
  );

  return vdom;
};

export default connect(mapStateToProps, actionCreators)(Channels);
