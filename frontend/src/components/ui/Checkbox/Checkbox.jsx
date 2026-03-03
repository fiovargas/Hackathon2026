import React from 'react';
import './Checkbox.css';

const Checkbox = ({
  label,
  name,
  onChange,
  required = false,
  error,
  checked = false,
}) => (
  <div className='checkbox-container'>
    <div className='checkbox-main'>
      <input
        type='checkbox'
        name={name}
        id={name}
        onChange={onChange}
        checked={checked}
        className='checkbox-input'
      />
      <label htmlFor={name} className='checkbox-label'>
        {label} {required && <span className='required-star'>*</span>}
      </label>
    </div>
    <span
      className={`error-message checkbox-error-slot${error ? ' is-visible' : ''}`}
    >
      {error || '\u00A0'}
    </span>
  </div>
);

export default Checkbox;
