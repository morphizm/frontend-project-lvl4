import React, { useRef, useEffect } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { useClickAway } from 'react-use';
import i18next from 'i18next';
import cn from 'classnames';
import * as yup from 'yup';
import * as actions from '../../actions';

const actionCreators = {
  renameChannel: actions.renameChannel,
};

const channelSchema = yup.object().shape({
  channel: yup.string().trim().required(() => i18next.t('required')),
});

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
                {i18next.t('renameChannel', { name: item.name })}
              </h5>
              <button onClick={onHide} type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <Formik
              initialValues={{ channel: item.name }}
              onSubmit={onSubmit}
              validationSchema={channelSchema}
            >
              {({
                values,
                handleSubmit,
                handleChange,
                isSubmitting,
                errors,
              }) => {
                const channelClassNames = cn({
                  'form-control': true,
                  'is-invalid': errors.channel,
                });
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                      <div className="form-group">
                        <input
                          ref={inputRef}
                          className={channelClassNames}
                          type="text"
                          name="channel"
                          onChange={handleChange}
                          value={values.channel}
                        />
                        <div className="invalid-feedback">
                          {errors.channel}
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button onClick={onHide} type="button" className="btn btn-secondary">{i18next.t('close')}</button>
                      <button disabled={isSubmitting} type="submit" className="btn btn-primary">{i18next.t('rename')}</button>
                    </div>
                  </form>
                );
              }}
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
