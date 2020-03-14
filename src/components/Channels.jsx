/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} onHide={hideModal} />;
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
      'list-group-item d-inline-flex flex-row align-items-cener p-1': true,
      active: id === currentChannelId,
    });

    const vdom = (
      <div
        key={id}
        className={classAttributes}
      >
        <div className="btn align-self-start flex-grow-1 text-left text-truncate" onClick={changeChannel(id)} type="button">
          {name}
        </div>
        <div className="align-self-center px-1 close" onClick={() => showModal('renaming', channel)} type="button">*</div>
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
    <div className="card overflow-auto w-25" style={{ minWidth: '25%' }}>
      <div className="card-header d-flex justify-content-between p-2">
        Channels:
        <button type="button" className="close p-0" onClick={() => showModal('adding')}>
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
