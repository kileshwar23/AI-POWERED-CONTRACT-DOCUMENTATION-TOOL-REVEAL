import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#09090b] px-4 py-2';
  
  const variants = {
    primary: 'bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-lg shadow-[#8b5cf6]/20 focus:ring-[#8b5cf6]',
    secondary: 'bg-[#27272a] hover:bg-[#3f3f46] text-white border border-[rgba(255,255,255,0.1)] focus:ring-[#a1a1aa]',
    ghost: 'hover:bg-white/10 text-[#a1a1aa] hover:text-white',
    danger: 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
