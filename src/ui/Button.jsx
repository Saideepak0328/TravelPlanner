import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '', ariaLabel }) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-4 py-2 rounded-lg font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 ${className}`}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);

export default Button; 