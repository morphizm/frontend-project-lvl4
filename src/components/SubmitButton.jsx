import React from 'react';

const SubmitButton = (props) => {
  const defaultClassName = 'btn btn-primary';
  const {
    isSubmitting, spinnerValue, sendValue,
    className = defaultClassName,
  } = props;

  if (isSubmitting) {
    return (
      <button className={className} type="submit" disabled>
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
        <span className="sr-only">
          {spinnerValue}
          ...
        </span>
      </button>
    );
  }
  return <button disabled={isSubmitting} type="submit" className={className}>{sendValue}</button>;
};

export default SubmitButton;
