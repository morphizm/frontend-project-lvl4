import React, { useRef, useEffect } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { useClickAway } from 'react-use';
import * as actions from '../../actions';

const actionCreators = {
  renameChannel: actions.renameChannel,
};

const Rename = (props) => {
  const {
    onHide, modalInfo, renameChannel,
  } = props;
  const { item } = modalInfo;

  const onSubmit = (values) => {
    renameChannel({ name: values.channel, id: item.id });
    onHide();
  };

  const modalRef = useRef(null);
  useClickAway(modalRef, () => onHide());
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, [null]);

  const vdom = (
    <>
      <div className="modal fade show" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog" role="document">
          <div ref={modalRef} className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Rename&nbsp;
                {item.name}
                &nbsp;channel
              </h5>
              <button onClick={onHide} type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <Formik initialValues={{ channel: item.name }} onSubmit={onSubmit}>
              {({
                values,
                handleSubmit,
                handleChange,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="form-group">
                      <input
                        ref={inputRef}
                        className="form-control"
                        type="text"
                        name="channel"
                        onChange={handleChange}
                        value={values.channel}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button onClick={onHide} type="button" className="btn btn-secondary">Close</button>
                    <button type="submit" className="btn btn-primary">Rename</button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
  return vdom;
};

export default connect(null, actionCreators)(Rename);
