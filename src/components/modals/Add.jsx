import React, { useRef, useEffect } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useClickAway } from 'react-use';
import i18next from 'i18next';
import cn from 'classnames';
import * as yup from 'yup';
import { asyncActions } from '../../slices';
import SubmitButton from '../SubmitButton';

const channelSchema = yup.object().shape({
  channel: yup.string().trim().required(() => i18next.t('required')),
});

const Add = (props) => {
  const { onHide } = props;
  const { addNewChannel } = asyncActions;
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    await dispatch(addNewChannel({ name: values.channel }));
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
              <h5 className="modal-title">{i18next.t('addNewChannel')}</h5>
              <button onClick={onHide} type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <Formik initialValues={{ channel: '' }} onSubmit={onSubmit} validationSchema={channelSchema}>
              {({
                handleChange,
                handleSubmit,
                values,
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
                          placeholder="Channel"
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
                      <div className="modal-footer">
                        <button onClick={onHide} type="button" className="btn btn-secondary">{i18next.t('close')}</button>
                        <SubmitButton isSubmitting={isSubmitting} spinnerValue={i18next.t('adding')} sendValue={i18next.t('add')} />
                      </div>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </div>
  );
  return vdom;
};

export default Add;
