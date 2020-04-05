import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import i18next from 'i18next';
import { actions } from '../slices';
import getModal from './modals';
import EditSvgIcon from '../../assets/edit-icon.svg';

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} onHide={hideModal} />;
};

const Channels = () => {
  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });
  const dispatch = useDispatch();
  const { changeCurrentChannel } = actions;
  const {
    channels: { allIds, byId }, currentChannel,
  } = useSelector((state) => state);
  const channels = allIds.map((id) => byId[id]);

  const changeChannel = (id) => () => {
    dispatch(changeCurrentChannel({ id }));
  };

  const renderChannel = (channel, currentChannelId) => {
    const {
      id, name, removable,
    } = channel;

    const classAttributes = cn({
      'list-group-item d-inline-flex flex-row p-1': true,
      active: id === currentChannelId,
    });

    const vdom = (
      <div
        key={id}
        className={classAttributes}
      >
        <div className="btn align-self-start flex-grow-1 text-left text-truncate" onClick={changeChannel(id)}>
          {name}
        </div>
        <div className="align-self-center close" onClick={() => showModal('renaming', channel)} dangerouslySetInnerHTML={{ __html: EditSvgIcon }} style={{ width: '17px' }} />
        {removable && (
          <button onClick={() => showModal('removing', channel)} type="button" className="close">
            <span aria-hidden="true">&times;</span>
          </button>
        )}
      </div>
    );
    return vdom;
  };

  const vdom = (
    <div className="card overflow-auto w-25" style={{ minWidth: '25%' }}>
      <div className="card-header d-flex justify-content-between p-2">
        {i18next.t('channels')}
        :
        <button type="button" className="close p-0" onClick={() => showModal('adding')}>
          <span aria-hidden="true">+</span>
        </button>
      </div>
      <div className="list-group list-group-flush">
        {channels.map((c) => renderChannel(c, currentChannel.id))}
      </div>
      {renderModal({ modalInfo, hideModal })}
    </div>
  );

  return vdom;
};

export default Channels;
