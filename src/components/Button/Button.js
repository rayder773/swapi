import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const {
    name,
    type,
    className,
    style,
    onClick,
  } = props;

  return (
    <button
      type={type}
      className={`main-button ${className}`}
      style={style}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  className: '',
  style: {},
  onClick: null,
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default Button;
