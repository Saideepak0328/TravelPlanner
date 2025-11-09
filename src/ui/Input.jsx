import React from 'react';

const Input = ({ type = 'text', value, onChange, placeholder = '', ariaLabel, className = '', ...rest }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    aria-label={ariaLabel}
    className={`px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${className}`}
    {...rest}
  />
);

export default Input; 