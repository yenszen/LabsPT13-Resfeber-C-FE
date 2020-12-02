import React from 'react';
import PropTypes from 'prop-types';
import { Button as AntButton } from 'antd';

const Button = props => {
  // Here is a button for use when simply in need of a button that doesn't require to be wrapped in a form.
  // contains a click property for your use onClick
  return (
    <AntButton
      onClick={props.handleClick}
      disabled={props.isDisabled}
      type={props.type || 'primary'}
    >
      {props.buttonText}
    </AntButton>
  );
};

export default Button;

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  classType: PropTypes.string,
  disabled: PropTypes.string,
  handleClick: PropTypes.func,
};
