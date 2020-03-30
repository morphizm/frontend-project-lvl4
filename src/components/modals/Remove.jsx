import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { useClickAway } from 'react-use';
import i18next from 'i18next';
import { actions } from '../../slices';

const actionCreators = {
  removeChannel: actions.removeChannel,
};

const Remove = (props) => {
  const {
    onHide, modalInfo, removeChannel,
  } = props;
  const { item } = modalInfo;

  const onSubmit = () => {
    removeChannel({ id: item.id });
    onHide();
  };

  const ref = useRef(null);
  useClickAway(ref, () => onHide());

  const vdom = (
    <>
      <div className="modal fade show" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog" role="document">
          <div ref={ref} className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {i18next.t('removeChannel', { name: item.name })}
              </h5>
              <button onClick={onHide} type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {i18next.t('sure')}
            </div>
            <div className="modal-footer">
              <button onClick={onHide} type="button" className="btn btn-secondary">{i18next.t('close')}</button>
              <button onClick={onSubmit} type="button" className="btn btn-danger">{i18next.t('remove')}</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
  return vdom;
};

export default connect(null, actionCreators)(Remove);
