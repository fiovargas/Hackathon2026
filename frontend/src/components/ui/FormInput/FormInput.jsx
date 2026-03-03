import React from 'react';
import './FormInput.css';

const FormInput = ({
  label,
  name,
  type = 'text',
  onChange,
  required = false,
  placeholder,
  error,
  multiline = false,
  rows = 4,
  className = 'input-group',
  labelClassName = 'input-label',
  containerClassName = 'label-error-container',
  inputClassName = 'form-control',
  inputErrorClassName = 'input-error',
  errorClassName = 'error-message',
}) => {
  const Component = multiline ? 'textarea' : 'input';

  return (
    <div className={className}>
      <div className={containerClassName}>
        <label className={labelClassName}>
          {label} {required && <span className='required-star'>*</span>}
        </label>
      </div>
      <Component
        name={name}
        type={!multiline ? type : undefined}
        onChange={onChange}
        placeholder={placeholder}
        rows={multiline ? rows : undefined}
        className={`${inputClassName}${error ? ` ${inputErrorClassName}` : ''}`}
      />
      <span
        className={`${errorClassName} form-error-slot${error ? ' is-visible' : ''}`}
      >
        {error || '\u00A0'}
      </span>
    </div>
  );
};

export default FormInput;
