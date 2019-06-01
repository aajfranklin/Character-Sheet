import React from 'react';
import PropTypes from 'prop-types';

function Button({
  clickHandler, label, icon, buttonStyle, disabled,
}) {
  return (
    <button
      type="button"
      className={buttonStyle}
      onClick={clickHandler}
      onMouseDown={(e) => { e.preventDefault(); }}
      disabled={disabled}
    >
      <i key="icon" className={icon} />
      {' '}
      {label}
    </button>
  );
}

Button.propTypes = {
  buttonStyle: PropTypes.string,
  disabled: PropTypes.bool,
  clickHandler: PropTypes.func.isRequired,
  icon: PropTypes.string,
  label: PropTypes.string,
};

Button.defaultProps = {
  buttonStyle: '',
  disabled: false,
  icon: null,
  label: '',
};

export default Button;
