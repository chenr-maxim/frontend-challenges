import React from 'react';

import './Button.scss';

const Button = ({ color, onClick, children, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={`button-container ${color}`}>
      {children}
    </button>
  );
};

export default Button;
