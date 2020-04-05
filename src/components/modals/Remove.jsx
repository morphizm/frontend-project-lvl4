import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useClickAway } from 'react-use';
import i18next from 'i18next';
import { Formik } from 'formik';
import { asyncActions } from '../../slices';
import SubmitButton from '../SubmitButton';

const Remove = (props) => {
  const { onHide, modalInfo } = props;
  const { removeChannel } = asyncActions;
  const { item } = modalInfo;
  const dispatch = useDispatch();

  const onSubmit = async () => {
    await dispatch(removeChannel({ id: item.id }));
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
              <Formik
                initialValues={{}}
                onSubmit={onSubmit}
              >
                {({ isSubmitting, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <SubmitButton
                      isSubmitting={isSubmitting}
                      spinnerValue={i18next.t('removing')}
                      sendValue={i18next.t('remove')}
                      className="btn btn-danger"
                    />
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
  return vdom;
};

export default Remove;
