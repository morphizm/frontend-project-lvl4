import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import cn from 'classnames';
import i18next from 'i18next';
import * as yup from 'yup';
import { asyncActions } from '../slices';
import Context from '../context';
import SubmitButton from './SubmitButton';


const messageSchema = yup.object().shape({
  message: yup.string().trim().required(() => i18next.t('required')),
});

const NewFormMessage = () => {
  const { user } = useContext(Context);
  const { currentChannel } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { sendMessage } = asyncActions;

  const handleSendMessage = async (values, actions) => {
    const { resetForm } = actions;
    try {
      await dispatch(sendMessage({ ...values, userName: user.name, channelId: currentChannel.id }));
      resetForm();
    } catch {
      // console.log('???')
    }
  };

  useEffect(() => {

  }, [currentChannel]);

  const vdom = (
    <Formik initialValues={{ message: '' }} onSubmit={handleSendMessage} validationSchema={messageSchema}>
      {({
        isSubmitting, errors, touched, resetForm,
      }) => {
        useEffect(() => {
          resetForm();
        }, [currentChannel]);
        const fieldClassName = cn({
          'form-control': true,
          'is-invalid': errors.message && touched.message,
        });
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
              <SubmitButton isSubmitting={isSubmitting} spinnerValue={i18next.t('sending')} sendValue={i18next.t('send')} />
            </div>
          </Form>
        );
      }}
    </Formik>
  );

  return vdom;
};

export default NewFormMessage;
