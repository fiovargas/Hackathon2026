import React from 'react';

const FormInput = ({ label, name, type = "text", onChange, required = false, placeholder }) => (
    <div className="input-group">
        <label className="input-label">
            {label} {required && <span className="required-star">*</span>}
        </label>
        <input
            name={name}
            type={type}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            className="form-control"
        />
    </div>
);

export default FormInput;