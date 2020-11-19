import React from 'react';
import PropTypes from 'prop-types';

const FormInput = props => {
  return (
    <React.Fragment>
      <label htmlFor={props.labelId}>{props.labelId}</label>
      <input
        type="text"
        id={props.labelId}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </React.Fragment>
  );
};

export default FormInput;

FormInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  labelId: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
