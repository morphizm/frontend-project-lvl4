import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';

const mapStateToProps = (state) => {
  const { messages: { allIds, byId }, currentChannelId } = state;
  const messages = allIds
    .map((id) => byId[id])
    .filter((mes) => mes.channelId === currentChannelId);
  return { messages };
};

const actionCreators = {

};


const NewFormMessage = () => {
  const sendMessage = async (values, actions) => {
    // actions.setSubmitting(true);
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 1000);
  };

  const vdom = (
    <div className="">
      {/* <ul className="list-group list-group-flush"> */}
      {/* </ul> */}
      <Formik initialValues={{ message: '' }} onSubmit={sendMessage}>
        {(props) => (
          <form onSubmit={props.handleSubmit} className="form">
            <div className="form-group col-11">
              <input
                className="form-control"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.message}
                name="message"
                placeholder="Message"
              />
            </div>

            <button disabled={props.isSubmitting} className="btn btn-primary" type="submit">Send</button>
          </form>
        )}
      </Formik>
    </div>
  );

  return vdom;
};

export default connect(mapStateToProps, actionCreators)(NewFormMessage);
