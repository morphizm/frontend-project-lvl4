import React, { useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions';
import getModal from './modals';


const mapStateToProps = (state) => {
  const { channels: { allIds, byId }, currentChannelId } = state;
  const channels = allIds.map((id) => byId[id]);
  return { channels, currentChannelId };
};

const actionCreators = {
  changeCurrentChannel: actions.changeCurrentChannel,
};

const renderModal = ({ modalInfo, hideModal, onSubmit }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} onSubmit={onSubmit} onHide={hideModal} />;
};

const Channels = (props) => {
  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });

  const changeChannel = (id) => () => {
    const { changeCurrentChannel } = props;
    changeCurrentChannel({ id });
  };

  const renderChannel = (channel, currentChannelId) => {
    const {
      id, name, removable,
    } = channel;

    const classAttributes = cn({
      'list-group-item': true,
      active: id === currentChannelId,
    });

    const vdom = (
      <div
        key={id}
        className={classAttributes}
      >
        <button className="btn" type="button" onClick={changeChannel(id)}>
          {name}
        </button>
        <button onClick={() => showModal('renaming', channel)} type="button"> </button>
        {removable && (
          <button onClick={() => showModal('removing', channel)} type="button" className="close">
            <span aria-hidden="true">&times;</span>
          </button>
        )}
      </div>
    );
    return vdom;
  };

  const { channels, currentChannelId } = props;
  const vdom = (
    <div className="card overflow-auto w-25">
      <div className="card-header">
        Channels:
        <button type="button" className="close" onClick={() => showModal('adding')}>
          <span aria-hidden="true">+</span>
        </button>
      </div>
      <div className="list-group list-group-flush">
        {channels.map((c) => renderChannel(c, currentChannelId))}
      </div>
      {renderModal({ modalInfo, hideModal })}
    </div>
  );

  return vdom;
};

export default connect(mapStateToProps, actionCreators)(Channels);
