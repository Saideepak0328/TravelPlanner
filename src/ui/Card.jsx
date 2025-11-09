import React from 'react';

const Card = ({ children, className = '', onSubmit, ...rest }) => {
  const Element = onSubmit ? 'form' : 'section';
  return (
    <Element className={`bg-white rounded-2xl shadow-md p-6 ${className}`} onSubmit={onSubmit} {...rest}>
      {children}
    </Element>
  );
};

export default Card; 