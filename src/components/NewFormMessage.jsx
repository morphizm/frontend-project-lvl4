import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import cn from 'classnames';
import i18next from 'i18next';
import * as yup from 'yup';
import { asyncActions } from '../slices';
import Context from '../context';

const mapStateToProps = (state) => {
  const { currentChannel, messageSendingState } = state;
  return { currentChannelId: currentChannel.id, messageSendingState };
};

const actionCreators = {
  sendMessage: asyncActions.sendMessage,
};

const messageSchema = yup.object().shape({
  message: yup.string().trim().required(() => i18next.t('required')),
});

const NewFormMessage = (props) => {
  const { user } = useContext(Context);
  const { currentChannelId, messageSendingState } = props;
  const handleSendMessage = async (values, actions) => {
    const { resetForm } = actions;
    await props.sendMessage({ ...values, userName: user.name, channelId: currentChannelId });
    resetForm();
  };

  const isRequested = messageSendingState === 'request';

  const vdom = (
    <Formik initialValues={{ message: '' }} onSubmit={handleSendMessage} validationSchema={messageSchema}>
      {({ isSubmitting, errors, touched }) => {
        const fieldClassName = cn({
          'form-control': true,
          'is-invalid': errors.message && touched.message,
        });
        const submitButton = isSubmitting || isRequested ? (
          <button className="btn btn-primary" type="submit" disabled>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            <span className="sr-only">
              {i18next.t('sending')}
              ...
            </span>
          </button>
        ) : (<button className="btn btn-primary" type="submit">{i18next.t('send')}</button>);
        return (
          <Form className="form-row align-self-end flex-nowrap">
            <div className="form-group col-10">
              <Field
                className={fieldClassName}
                type="text"
                name="message"
                placeholder="Message..."
              />
              <div className="invalid-feedback">
                {errors.message}
              </div>
            </div>
            <div>
              {submitButton}
            </div>
          </Form>
        );
      }}
    </Formik>
  );

  return vdom;
};

export default connect(mapStateToProps, actionCreators)(NewFormMessage);
