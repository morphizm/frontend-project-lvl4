import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';

const mapStateToProps = (state) => {
  const { messages: { allIds, byId } } = state;
  const messages = allIds.map((id) => byId[id]);
  return { messages };
};

const actionCreators = {
};

const renderMessage = (message) => {

};

const Messages = ({ messages }) => {
  const sendMessage = async (values, actions) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 1000);
  };

  const vdom = (
    <div className="'card'">
      {/* <ul className="list-group list-group-flush"> */}
      {/* </ul> */}
      <Formik initialValues={{ message: '' }} onSubmit={sendMessage}>
        {(props) => (
          <form onSubmit={props.handleSubmit} className="form">
          {console.log(props)}
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

            <button className="btn btn-primary" type="submit">Send</button>
          </form>
        )}
      </Formik>
    </div>
  );

  return vdom;
};

export default connect(mapStateToProps, actionCreators)(Messages);
