import React from 'react';

const Checkbox = ({ label, name, onChange, required = false }) => (
    <div className="checkbox-container">
        <input
            type="checkbox"
            name={name}
            id={name}
            onChange={onChange}
            required={required}
            className="checkbox-input"
        />
        <label htmlFor={name} className="checkbox-label">
            {label} {required && <span className="required-star">*</span>}
        </label>
    </div>
);

export default Checkbox;