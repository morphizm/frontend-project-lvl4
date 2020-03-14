import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

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

  const vdom = (
    <>
      <div className="modal fade show" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Remove
                the&nbsp;
                {item.name}
                &nbsp;channel
              </h5>
              <button onClick={onHide} type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure?
            </div>
            <div className="modal-footer">
              <button onClick={onHide} type="button" className="btn btn-secondary">Close</button>
              <button onClick={onSubmit} type="button" className="btn btn-danger">Remove</button>
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
