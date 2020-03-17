import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import cn from 'classnames';
import { sendMessage } from '../actions';
import Context from '../context';

const mapStateToProps = (state) => {
  const { currentChannelId, messageSendingState } = state;
  return { currentChannelId, messageSendingState };
};

const actionCreators = {
  sendMessage,
};


const NewFormMessage = (props) => {
  const { user } = useContext(Context);
  const { currentChannelId, messageSendingState } = props;
  const handleSendMessage = async (values, actions) => {
    const { resetForm } = actions;
    await props.sendMessage({ ...values, userName: user.name, channelId: currentChannelId });
    resetForm();
  };

  const isRequested = messageSendingState === 'request';

  const validateMessage = (message) => {
    if (!message.trim()) {
      return 'Required';
    }
    return null;
  };

  const vdom = (
    <Formik initialValues={{ message: '' }} onSubmit={handleSendMessage}>
      {({ isSubmitting, errors, touched }) => {
        const fieldClassName = cn({
          'form-control': true,
          'is-invalid': errors.message && touched.message,
        });
        const submitButton = isSubmitting || isRequested ? (
          <button className="btn btn-primary" type="submit" disabled>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            <span className="sr-only">Sending...</span>
          </button>
        ) : (<button className="btn btn-primary" type="submit">Send</button>);
        return (
          <Form className="form-row align-self-end flex-nowrap">
            <div className="form-group col-10">
              <Field
                className={fieldClassName}
                type="text"
                validate={validateMessage}
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
