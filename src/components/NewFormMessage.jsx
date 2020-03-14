import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { sendMessage } from '../actions';

const mapStateToProps = (state) => {
  const { currentChannelId } = state;
  return { currentChannelId };
};

const actionCreators = {
  sendMessage,
};


const NewFormMessage = (props) => {
  const { currentChannelId, user } = props;
  const handleSendMessage = async (values, actions) => {
    console.log(actions, values);
    const { resetForm } = actions;
    await props.sendMessage({ ...values, userName: user.name, channelId: currentChannelId });
    resetForm();
  };

  const validateMessage = (message) => {
    if (!message) {
      return 'Required';
    }
    return null;
  };

  const vdom = (
    <Formik initialValues={{ message: '' }} onSubmit={handleSendMessage}>
      {() => (
        <Form className="form-row align-self-end flex-nowrap">
          <div className="form-group col-10">
            <Field
              className="form-control"
              type="text"
              validate={validateMessage}
              name="message"
              placeholder="Message"
            />
          </div>
          <div>
            <button className="btn btn-primary" type="submit">Send</button>
          </div>
        </Form>
      )}
    </Formik>
  );

  return vdom;
};

export default connect(mapStateToProps, actionCreators)(NewFormMessage);
