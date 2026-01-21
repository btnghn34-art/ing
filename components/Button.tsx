import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  disabled = false
}) => {
  const baseStyles = "px-6 py-3 rounded-2xl font-bold transition-all duration-200 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md";
  
  const variants = {
    primary: "bg-white text-gray-800 hover:bg-gray-50 border-b-4 border-gray-200 hover:border-gray-300",
    secondary: "bg-yellow-400 text-yellow-900 hover:bg-yellow-300 border-b-4 border-yellow-600 hover:border-yellow-500",
    outline: "border-2 border-white text-white hover:bg-white/10"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};