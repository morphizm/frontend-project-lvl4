import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
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

  const vdom = (
    <Formik initialValues={{ message: '' }} onSubmit={handleSendMessage}>
      {(p) => (
        <form onSubmit={p.handleSubmit} className="form-row">
          <div className="form-group col-11">
            <input
              className="form-control"
              type="text"
              onChange={p.handleChange}
              onBlur={p.handleBlur}
              value={p.values.message}
              name="message"
              placeholder="Message"
            />
          </div>
          <div>
            <button disabled={p.isSubmitting} className="btn btn-primary" type="submit">Send</button>
          </div>
        </form>
      )}
    </Formik>
  );

  return vdom;
};

export default connect(mapStateToProps, actionCreators)(NewFormMessage);
