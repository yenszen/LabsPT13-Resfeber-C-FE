import PropTypes from 'prop-types';
import React from 'react';
import { Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

function LoadingComponent(props) {
  const { message } = props;

  return <Result title={message} icon={<SmileOutlined />} />;
}

export default LoadingComponent;

LoadingComponent.propTypes = {
  message: PropTypes.string.isRequired,
};
