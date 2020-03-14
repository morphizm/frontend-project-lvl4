import React, { useRef, useEffect } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { useClickAway } from 'react-use';
import * as actions from '../../actions';

const actionCreators = {
  addNewChannel: actions.addNewChannel,
};

const Add = (props) => {
  const {
    onHide, addNewChannel,
  } = props;

  const onSubmit = (values) => {
    addNewChannel({ name: values.channel });
    onHide();
  };

  const modalRef = useRef(null);
  useClickAway(modalRef, () => onHide());
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, [null]);

  const vdom = (
    <div>
      <div className="modal fade show" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog" role="document">
          <div ref={modalRef} className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add new channel</h5>
              <button onClick={onHide} type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <Formik initialValues={{ channel: '' }} onSubmit={onSubmit}>
              {({
                handleChange,
                handleSubmit,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="form-group">
                      <input
                        ref={inputRef}
                        placeholder="Channel"
                        className="form-control"
                        type="text"
                        name="channel"
                        onChange={handleChange}
                        value={values.channel}
                      />
                    </div>
                    <div className="modal-footer">
                      <button onClick={onHide} type="button" className="btn btn-secondary">Close</button>
                      <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </div>
  );
  return vdom;
};

export default connect(null, actionCreators)(Add);
