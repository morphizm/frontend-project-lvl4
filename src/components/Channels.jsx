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
    <div className="card overflow-auto w-25">
      <div className="card-header">
        Channels:
        <button type="button" className="close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <ul className="list-group list-group-flush">
        {channels.map((c) => renderChannel(c, currentChannelId))}
      </ul>
    </div>
  );

  return vdom;
};

export default connect(mapStateToProps, actionCreators)(Channels);
