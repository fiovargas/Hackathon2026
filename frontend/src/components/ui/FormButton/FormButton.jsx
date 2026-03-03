import React from 'react';
import './FormButton.css';

const FormButton = ({
  type = 'submit',
  disabled = false,
  loading = false,
  text,
  loadingText,
  className = '',
}) => (
  <button
    type={type}
    className={`form-button ${className}`.trim()}
    disabled={disabled || loading}
  >
    {loading ? loadingText : text}
  </button>
);

export default FormButton;
