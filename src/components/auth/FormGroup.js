import React from 'react';
import './AuthForm.css';

function FormGroup({ label, id, type = 'text', value, onChange, placeholder, required = false, autoFocus = false }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoFocus={autoFocus}
      />
    </div>
  );
}

export default FormGroup;

